import axios from 'axios'
import { useEffect, useState } from 'react'
import { Navbar } from '../../../component/navbar/Navbar'
import { AdminNav } from '../component/AdminNav/AdminNav'
import './DelteUser.css'

export function DelteUser(){
    const [user ,setuser] = useState([])
    useEffect(()=>{
        const handleUser = async() =>{
            try{
                const res = await axios.get(`https://e-commercesamir.herokuapp.com/getalluser`, {
                    headers: {
                        'Authorization': `Basic ${localStorage.getItem("accsesToken")}`
                    }
                })

                setuser(res.data)
    

            }catch(err){
                console.log(err)

            }

        }
        handleUser()

    },[])

    const deleteUser = async(id) =>{
        try{
           const res = await axios.delete(`https://e-commercesamir.herokuapp.com/delteUser/${id}`, {
            headers: {
                'Authorization': `Basic ${localStorage.getItem("accsesToken")}`
            }
        })
        window.location.reload("https://e-commercesamir.herokuapp.com/adminpanel/DeleteUser")

        }catch(err){
            console.log(err)

        }
    }

    return(
        <>
          <AdminNav/>
          <main className='deleteusermain'>
              
              <div className='deleteuserinner'>
      
                   {user.map((p, index) => (
                        <div className='useraccount' key={index.toLocaleString()} post={p}><h3>{p.username}</h3><h3>{p._id}</h3><div className='deletebutton' onClick={() =>{deleteUser(p._id)}}>delteUser</div> </div>
                    ))}


              </div>

          </main>

        </>
    )
}