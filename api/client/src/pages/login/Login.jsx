import { Footer } from '../../component/footer/Footer'
import { Navbar } from '../../component/navbar/Navbar'
import './Login.css'
import {MdPeopleAlt} from 'react-icons/md'
import {RiLockPasswordLine} from 'react-icons/ri'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { Context } from '../../context/Context';


export function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { user,dispatch, isFetching } = useContext(Context);


    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });

        try{
            const res = await axios.post('https://e-commercesamir.herokuapp.com/login',{
                username,
                password
            });

            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            localStorage.setItem('accsesToken', res.data.accsesToken)
          
            if(res.data.isadmin == true){
                localStorage.setItem('admin', true)
            
                window.location.replace("/adminpanel/Create");



            }else{

                window.location.replace('/')
                
            }
            
      

        }catch(err){
            dispatch({ type: "LOGIN_FAILURE" });
             console.log(err)

        }
    }
    return(
        <>
        <Navbar/>
        <h3>admin panel username ("admin")</h3>
            <h3>admin panel password ("admin")</h3>
        <main className='loginmain'>


            <div className='loginbox'>
                <div className='loginhead'>
                    <h2>Login</h2>

                </div>
                <div className='loginusername'>
     
                    <div className='usernameicon'> <i> <MdPeopleAlt size={28}/></i> <input id="username" onChange={(e)=>{setUsername(e.target.value)}}/></div>
                    
                   

                </div>
                <div className='loginpassword'>
                    <div className='loginpasswordicon'><i><RiLockPasswordLine size={28}/></i> <input id="idpassword" onChange={(e)=>{setPassword(e.target.value)}} type="password"/></div>
    
                   

                </div>
                <div className='loginbutton'>
                    <div className='loginbuttoninner'  onClick={handleSubmit}>Login</div>
                    <p>Frogot Password</p>

                </div>

            </div>

        </main>
        <Footer/>
        </>
    )
}


