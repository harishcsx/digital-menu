import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import { Login } from "../components/Login.jsx";
import { CreateStore } from '../components/CreateStore.jsx';
import { YourStores } from '../components/YourStores.jsx';
import { SignUp } from '../components/Signup.jsx';
import './index.css';
import App from './App.jsx';
import { MenuPage } from '../components/MenuPage.jsx';
import { Getqr } from '../components/GetQR.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/signup",
    element: <SignUp/>
  },
  {
    path: "/stores",        
    element: <YourStores/>
  },
  {
    path: "/create",
    element: <CreateStore/>
  },
  {
    path: "/store/:storeId",
    element: <MenuPage/>
  },
  {
    path: "/getqr/:storeName",
    element: <Getqr/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
