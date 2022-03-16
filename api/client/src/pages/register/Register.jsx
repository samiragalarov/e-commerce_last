import './Register.css'
import { MdPeopleAlt } from 'react-icons/md'
import { RiLockPasswordLine } from 'react-icons/ri'
import { Footer } from '../../component/footer/Footer'
import { Navbar } from '../../component/navbar/Navbar'
import { useState } from "react";
import axios from "axios";

export function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        try {
          const res = await axios.post("https://e-commercesamir.herokuapp.com/register", {
            username,
            password,
          });
          res.data && window.location.replace("https://e-commercesamir.herokuapp.com/login");
        } catch (err) {
          setError(true);
          
        }
      };
    return (
        <>
            <Navbar />
            <main className='registermain'> 
                <div className='loginbox'>
                    <div className='loginhead'>
                        <h2>Register</h2>

                    </div>
                    <div className='loginusername'>

                        <div className='usernameicon'> <i> <MdPeopleAlt size={28} /></i> <input id="username"  onChange={(e) => setUsername(e.target.value)} /></div>



                    </div>
                    <div className='loginpassword'>
                        <div className='loginpasswordicon'><i><RiLockPasswordLine size={28} /></i> <input id="idpassword" type="password"  onChange={(e) => setPassword(e.target.value)}/></div>



                    </div>
                    <div className='loginbutton'>
                        <div className='loginbuttoninner' onClick={handleSubmit}>Register</div>
                        <p></p>

                    </div>

                </div>

            </main>
            <Footer />

        </>
    )
}