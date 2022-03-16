import axios from 'axios'
import { useEffect, useState } from 'react'
import { BasketCard } from '../../component/basketcard/Basketcard'
import { Footer } from '../../component/footer/Footer'
import { Navbar } from '../../component/navbar/Navbar'
import './Basket.css'

export function Basket() {
    const [basket, setbasket] = useState([])
    const [total , settotal] = useState(0)

    useEffect(() => {
        const handleBasket = async() =>{

            try{
                const res = await  axios.get(`https://e-commercesamir.herokuapp.com/basketProducts/${JSON.parse(localStorage.getItem("user")).id}`,{
                    headers: {
                        'Authorization': `Basic ${localStorage.getItem("accsesToken")}`
                    }
                })
   
                setbasket(res.data)
                for (let i = 0; i < res.data.length; i++) {
                    settotal(total + res.data[i].price)
                    
                }
                return
         

            }catch(err){
                console.log(err)

            }
        }
       
       handleBasket()


    }, [])
 

    return (
        <>
            <Navbar />
            <main className='mains'>
                <div className='basketbox'>
             
                    <div className='baskethead'>
                        <div className='Product basketheadname'>
                            Product


                        </div>
                        <div className='Quantity basketheadname'>
                            Quantity

                        </div>
                        <div className='Subtotal basketheadname'>
                            Subtotal

                        </div>

                    </div>
                    <div className='basketcards'>
                  
                  {basket.map((p, index) => (
                        <BasketCard key={index} post={p} />
                    ))} 
                  
                 

                    </div>
                    <div className='paymentpart'>
                        <div className='paymentbox'>
                            <div className='paymentboxpart1'>
                                <p>Subtotal</p>
                                <p>Tax</p>
                                <p>Total</p>

                            </div>
                            <div className='paymentboxpart2'>
                                <p>$200</p>
                                <p>$50</p>
                                <p>${total}</p>

                            </div>


                        </div>
                        <div className='paymentbutton'>
                            <div className='paymentbuttoninner'>
                                Proceed To Checkout

                            </div>


                        </div>

                    </div>

                </div>

            </main>
            <Footer />



        </>
    )
}