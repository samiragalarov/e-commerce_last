import { ProductCard } from '../../../component/product/Product'
import { AdminNav } from '../component/AdminNav/AdminNav'
import { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import './DeletePost.css'

export function DeletePost() {
    const [posts, setposts] = useState([])
    useEffect(() => {
        const getposts = async (e) => {
            const res = await axios.get('https://e-commercesamir.herokuapp.com/getProducts', {
                headers: {
                    'Authorization': `token ${JSON.parse(localStorage.getItem("user")).accsesToken}`
                }
            })
            setposts(res.data)
            


        }
        getposts()

    }, [])

    const deltePost = async(id) =>{
        try{
            const res = await axios.delete(`https://e-commercesamir.herokuapp.com/deleteProduct/${id}`,{

                headers: {
                    'Authorization': `token ${JSON.parse(localStorage.getItem("user")).accsesToken}`
                }
            })
            window.location.reload('https://e-commercesamir.herokuapp.com/adminpanel/Deletepost')
    

        }catch(err){
            console.log(err)

        }
    }
    return (
        <>
            <AdminNav />
            <main className='deletemain'>

                {posts.map((p, index) => (

                    <div className='deletePost'  key={index}>
                        <ProductCard post={p} />

                        <div className='Removebutton' onClick={()=>{deltePost(p._id)}}>Remove</div>

                    </div>
                ))}





            </main>

        </>
    )
}