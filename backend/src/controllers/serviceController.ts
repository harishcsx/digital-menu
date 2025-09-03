import { Request, Response } from 'express';
import { prisma } from '../config/db';


export const insertStore = async (req: Request, res: Response) => {
    try {
        if (!req.userId) return res.status(401).json({ error: 'Not authorized' });

        const userId = req.userId;
        if (isNaN(userId)) {
            return res.status(400).json({ error: 'Invalid userId' });
        }
        const { storeName, products } = req.body;

        if (!Array.isArray(products) || products.some(p => !p.title || !p.price)) {
            return res.status(400).json({ error: 'Invalid products data' });
        }

        // Prepare products with images for nested create
        const productsClean = products.map(p => ({
            title: p.title,
            price: p.price,
            images: p.imageUrl
                ? { create: [{ imageUrl: p.imageUrl }] }
                : undefined
        }));

        const store = await prisma.store.create({
            data: {
                userId: userId,
                storeName,
                products: {
                    create: productsClean
                }
            },
            include: { products: { include: { images: true } } }
        });
        res.json({
            messsage: "store sucessfully created",
            store
        })
    } catch(error: any) {
        console.error("error creating store : ", error);
        if (error.code === 'P2002') {
            return res.status(409).json({ error: 'Store name already exists' });
        }
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
}
// ...existing code...


export const retriveStore =  async (req: Request, res: Response) => {
    try {
        if (!req.userId) return res.status(401).json({ error: "not authorized" });

        const getStores = await prisma.store.findMany({
            where: {
            userId: req.userId
            }
        })

        res.json(getStores);
    } catch(error: any) {
        console.log("an error occured while retriving stores : ", error);

        res.status(401).json({error: "can get stores"});
    }
}


export const publicStore = async (req: Request, res: Response) => {
    const { storeId } = req.params;

    try {
        // Find the store by name or ID (adjust as needed)
        const store = await prisma.store.findFirst({
            where: { storeName: storeId }, // If you use storeName in URL
            include: {
                products: {
                    include: {
                        images: true
                    }
                }
            }
        });

        if (!store) {
            return res.status(404).json({ error: "Store not found" });
        }

        // Format products for frontend
        const products = store.products.map((p, idx) => ({
            product_no: idx + 1,
            img: p.images[0]?.imageUrl || "", // Use first image or empty string
            title: p.title,
            price: p.price.toString()
        }));

        res.json({ products });
    } catch (error) {
        console.error("Error fetching public store:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};