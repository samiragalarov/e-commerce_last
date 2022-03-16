import './Navbar.css'
import { BsFillBasket2Fill } from 'react-icons/bs'
import { GiHamburgerMenu } from 'react-icons/gi'
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import { useContext, useState, useEffect,useRef } from "react";
import {BiLogOut} from 'react-icons/bi'
import {SiShopify} from 'react-icons/si'

export function Navbar() {
   const [navbar ,setNavbar] = useState(false)

    const { user } = useContext(Context);
    const navSide = useRef(null);

    const changeBackground =() =>{
        if(window.scrollY >= 30){
            setNavbar(true)

        }else{
            setNavbar(false)

        }
    }
    useEffect(()=>{
        window.addEventListener('scroll' ,changeBackground)
        return () => {
            window.removeEventListener("scroll", changeBackground);
          }

    },[])
 
  


 

     
    function handlelogout(){
        localStorage.removeItem("accsesToken")
        localStorage.removeItem("username")
        localStorage.removeItem("userid")
        localStorage.removeItem("admin")
        localStorage.removeItem("user")
        window.location.replace("http://localhost:3000/login")
    }

    function openNav() {
        navSide.current.style.width = "100%";
    }
    function closeNav() {
        navSide.current.style.width = "0";

    }
    return (

        <>
            <nav id="navbar" className={`navbar ${navbar ? 'active' : null}`}>
                <div className="logo">
                    <h2 id="logo" ><Link  to='/' id="logo" className='link logolink'> <SiShopify color='yellow' size={40}/></Link></h2>

                </div>
                <ul >
                    {user ? (
                        <>
                            <li className="links" >
                                <Link to='/' className={`link ${navbar ? 'active' : null}`}> Home</Link>


                            </li>
                            <li className="links">
                                <Link to='/products' className='link' > Products</Link>
                               

                            </li>

                            <li className="links">
                                
                                <Link to='/basket'><BsFillBasket2Fill size={30} /></Link>

                            </li>
                            <li className="links" style={{cursor:"pointer"}} onClick={handlelogout}>
                                
                                <BiLogOut color='tomato' size={30}/>
    
                            </li>
                        </>

                    ) : (
                        <>
       
                            <li className="links">
                                <Link to="/login" className='link'>SignIN</Link>
                                

                            </li>
                            <li className="links">
                                <Link to='/register'  className='link'>SignUp</Link>

                            </li>

                        </>

                    )}


                    <div className="hamurgertag" id="hamurgertag" onClick={openNav}><GiHamburgerMenu size={30} /></div>


                </ul>



                <div id="mySidenav" ref={navSide} className="sidenav">
                    <a href="#" className="closebtn" onClick={closeNav}>&times;</a>
                    <a href="/">Home</a>
                    <a href="/products">products</a>
                    <a href="/basket">basket</a>
                    <a href="#" onClick={handlelogout}>Logout</a> 
                </div>


            </nav>

        </>
    )
}