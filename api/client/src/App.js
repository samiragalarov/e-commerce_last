import { Home } from "./pages/home/Home";
import { Login } from "./pages/login/Login";
import { Basket } from "./pages/mybasket/Bakset";
import { AllProducts } from "./pages/products/Product";
import { Register } from "./pages/register/Register";
import { SinglePage } from "./pages/singlepage/Single";
import { BrowserRouter, Navigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { AdminPanel } from "./pages/adminpanel/Create/Create";
import { DeletePost } from "./pages/adminpanel/DeletePost/DeltePost";
import { DelteUser } from "./pages/adminpanel/DelteUser/DeleteUser";
import { Context } from './context/Context';
import { useContext} from "react";



function App() {

  const { user } = useContext(Context);

  return (
    <div className="App">
   
      <BrowserRouter>
        <Routes>

          <>
            {
              !user && (
                <>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </>


              )
            }
            {
              user && (
                <>
                  <Route path="/" element={<Home />}  />
                  <Route path="/products" element={<AllProducts />} />
                  <Route path="/singlePage/:id" element={<SinglePage />} />
                  <Route path="/basket" element={<Basket />} />
                </>


              )
                
              
            }
           {
              user && (
                <>
                  <Route path="/adminpanel/Create" element={<AdminPanel />} />
                  <Route path="/adminpanel/Deletepost" element={<DeletePost />} />
                  <Route path="/adminpanel/DeleteUser" element={<DelteUser />} />
                </>


              )
            }


            <Route path="*" element={<Navigate to={user ? "/" : "/login"}/>}/>




















          </>
        </Routes>

      </BrowserRouter>


    </div>
  );
}

export default App;


