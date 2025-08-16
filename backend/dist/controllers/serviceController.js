"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicStore = exports.retriveStore = exports.insertStore = void 0;
const db_1 = require("../config/db");
// export const insertStore = async (req: Request, res: Response) => {
//     try {
//         if (!req.userId) return res.status(401).json({ error: 'Not authorized' });
//         const { userId } = req;
//         const { storeName, products } = req.body;
//         if (!Array.isArray(products) || products.some(p => !p.title || !p.price)) {
//             return res.status(400).json({ error: 'Invalid products data' });
//         }
//         const store = await prisma.store.create({
//             data: {
//                 userId: userId,
//                 storeName,
//                 products: {
//                     create: products // assumes products is an array of product objects
//                 }
//             },
//             include: { products: true }
//         });
//         res.json({ 
//             messsage: "store sucessfully created", 
//             store
//         })
//     }catch(error: any) {
//         console.log("error creating store : ", error);
//         if (error.code === 'P2002') {
//             return res.status(409).json({ error: 'Store name already exists' });
//         }
//         res.status(500).json({ error: 'Internal server error' });
//     }
// }
// ...existing code...
// ...existing code...
// ...existing code...
const insertStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId)
            return res.status(401).json({ error: 'Not authorized' });
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
        const store = yield db_1.prisma.store.create({
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
        });
    }
    catch (error) {
        console.error("error creating store : ", error);
        if (error.code === 'P2002') {
            return res.status(409).json({ error: 'Store name already exists' });
        }
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
});
exports.insertStore = insertStore;
// ...existing code...
const retriveStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId)
            return res.status(401).json({ error: "not authorized" });
        const getStores = yield db_1.prisma.store.findMany({
            where: {
                userId: req.userId
            }
        });
        res.json(getStores);
    }
    catch (error) {
        console.log("an error occured while retriving stores : ", error);
        res.status(401).json({ error: "can get stores" });
    }
});
exports.retriveStore = retriveStore;
const publicStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { storeId } = req.params;
    try {
        // Find the store by name or ID (adjust as needed)
        const store = yield db_1.prisma.store.findFirst({
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
        const products = store.products.map((p, idx) => {
            var _a;
            return ({
                product_no: idx + 1,
                img: ((_a = p.images[0]) === null || _a === void 0 ? void 0 : _a.imageUrl) || "", // Use first image or empty string
                title: p.title,
                price: p.price.toString()
            });
        });
        res.json({ products });
    }
    catch (error) {
        console.error("Error fetching public store:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.publicStore = publicStore;
