import { Footer } from '../../component/footer/Footer'
import { Navbar } from '../../component/navbar/Navbar'
import { ProductCard } from '../../component/product/Product'
import { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import './Product.css'

export function AllProducts() {
    const [posts, setposts] = useState([])
    const [ cat ,setcat] = useState("All products")

    const handleCategory = async (e) => {

        try {
            setcat(e)
            if(e == 'All'){
                window.location.reload("https://e-commercesamir.herokuapp.com/products")
            }

            const res = await axios.get(`https://e-commercesamir.herokuapp.com/getbyCategory/?cat=${e}`)
     

            setposts(res.data)

        } catch (err) {
            console.log(err)

        }



    }

    useEffect(() => {
        pagination(0)


    }, [])


    let itemList = [];
    let k = 6
    function heyu() {
        for (let l = 0; l < posts.length; l++) {
            itemList.push(<ProductCard post={posts[l]} key={l} />)
    
    
        }    
        
    }

    heyu()


     async function pagination(e) {
   
            try{
                const res = await axios.get(`https://e-commercesamir.herokuapp.com/pagination?limit=8&startIndex=${e * 8}`)
                setposts(res.data)
    

            }catch(err){
                console.log(err)

            }
            
    }

    


    return (
        <>
            <Navbar />
            <main className='main'>
               
                <div className='productshead'>
                    <h1>{cat}</h1>
                    <div className='selectdiv' >
                        <select id='category' onChange={(e) => { handleCategory(e.target.value) }} >
                            <option  >
                                All
                            </option>
                            <option>
                                pant
                            </option>
                            <option>
                                mont
                            </option>
                            <option>
                                jeans
                            </option>
                           
                        </select>

                    </div>

                </div>

                <div className='innerproducts'>
                    {itemList}

                </div>
                <div className='paginationa'>
                  

                    <div className="pagination">
                        <a href="#">&laquo;</a>
                        <a  className="paginationnumber" onClick={()=>{pagination(0)}} id='0' >1</a>
                        <a value="2" id="1" onClick={()=>{pagination(1)}} className="paginationnumber" >2</a>
                        <a value="3" id="2" onClick={()=>{pagination(2)}} className="paginationnumber">3</a>
                        <a value="4" id="3" onClick={()=>{pagination(3)}} className="paginationnumber">4</a>
                        <a value="5" id="4" onClick={()=>{pagination(4)}} className="paginationnumber">5</a>
                        <a value="6" id="5" onClick={()=>{pagination(5)}} className="paginationnumber">6</a>
                        <a href="#">&raquo;</a>
                    </div>

                </div>

            </main>
            <Footer />
        </>
    )
}