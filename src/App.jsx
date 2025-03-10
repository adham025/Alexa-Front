import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Landing from './Components/Landing/Landing';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Cart from './Components/Cart/Cart';
import Categories from './Components/Categories/Categories';
import Brands from './Components/Brands/Brands';
import NotFound from './Components/Notfound/Notfound';
import ProtectedRoutes from './Components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Contact from './Components/Contact/Contact';
import About from './Components/About/About';


function App() {
  
  const routers = createBrowserRouter([
    {path: '', element:<Layout/>,children:[
      {index:true,element:<Landing/>},
      {path: "home",element:<Home/>},
      {path: "contact",element:<Contact/>},
      {path: "about",element:<About/>},
      {path: "register",element:<Register/>},
      {path: "login",element:<Login/>},
      { path:"product-details/:id", element:<ProductDetails/>},
      {path: "cart",element:<ProtectedRoutes><Cart/></ProtectedRoutes>},
      {path: "categories",element:<Categories/>},
      {path: "brands",element:<Brands/>},
      { path:"*", element: <NotFound/>}
    ]}
  ])
  return (
    <>
      <RouterProvider router = {routers}></RouterProvider>
    </>
  )
}

export default App
