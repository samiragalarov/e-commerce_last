import './Single.css'
import { Navbar } from '../../component/navbar/Navbar'
import { Footer } from '../../component/footer/Footer'
import logo from '../../images/advert2.png'
import image1 from '../../images/advert1.png'
import image2 from '../../images/advert3.png'
import test from '../../images/test.jpg'
import barnd1 from '../../images/brand1.png'
import barnd2 from '../../images/brand2.png'
import { ProductCard } from '../../component/product/Product'
import { useEffect, useState } from 'react'
import { useLocation } from "react-router";
import axios from 'axios';

// localStorage
export function SinglePage() {
    const [curtpost, setcurPost] = useState({})
    const [RelatedPost, setRealted] = useState([])
    const [productsize, setproductsize] = useState('32')
    const [quantity, setQuantity] = useState("1")
    const PF = "http://localhost:4000/images/";
    const [curphoto, setcurPhoto] = useState( );
    const [curborder, setborder] = useState(0);


    useEffect(() => {
        const handleRealted = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/relatedproduct/?categories=${curtpost.categories}`)
                setRealted(res.data)
               
                



            } catch (err) {
                console.log(err)

            }

        }
        handleRealted()

    }, [curtpost])

    useEffect(() => {
        const handelegetSingale = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/getProducts/${window.location.pathname.split("/")[2]}`,
                    {
                        headers: {
                            'Authorization': `Basic ${localStorage.getItem("accsesToken")}`
                        }
                    })
                setcurPost(res.data)

            } catch (err) {
                console.log(err)

            }
        }

        handelegetSingale()

    }, [])

    const handeleBasket = async () => {
       
        const newBasket = {
            userId:JSON.parse(localStorage.getItem("user")).id,
            products: window.location.pathname.split("/")[2],
            size: productsize,
            Quantity: quantity,
            title: curtpost.title,
            photo: curtpost.photo,
            price: curtpost.price,

        }
        try {


            const res = await axios.post(`https://e-commercesamir.herokuapp.com/addBasket/${JSON.parse(localStorage.getItem("user")).id}`, newBasket, {
                headers: {
                    'Authorization': `Basic ${localStorage.getItem("accsesToken")}`
                }
            })
            console.log(res)
             window.location.replace("/")


        } catch (err) {
            console.log(err)

        }
    }

    useEffect(() => {

        function photo() {
            const miniimg = document.querySelectorAll(".ProMiniImg")
            for (let i = 0; i < miniimg.length; i++) {
                miniimg[0].classList.add('border')
                miniimg[i].addEventListener('click', () => {

                    miniimg[i].classList.add('border')
                    for (let a = 0; a < miniimg.length; a++) {
                        if (miniimg[a].classList.contains('border') && a !== i) {

                            miniimg[a].classList.remove('border')

                        }


                    }

                })

            }

        }

        photo()

    }, [])
    
    useEffect(()=>{
        function mll(){

            if(curtpost.photo){
                setcurPhoto('https://e-commercesamir.herokuapp.com/images/'+curtpost.photo)

            }
            

        }
        mll()


    },[curtpost])


    return (
        <>

            <Navbar />
            <section className="singlemain">
                <div className="sinnngleinnerproduct">
                    <div className="productinnerimage">
                        <div className="productinnerimagemMain">
                            <img className="postImg" src={curphoto} alt="dsvds" />
                        </div>
                        <div className='productinnerimageMini'>
                            <div className="ProMiniImg">
                                {curtpost.photo && <img className="postImg" onClick={(e) => { setcurPhoto(e.target.src) }} src={PF + curtpost.photo} alt="dvs" />}
                            </div>
                            <div className="ProMiniImg">
                                {curtpost.photo1 && <img className="postImg" onClick={(e) => { setcurPhoto(e.target.src) }} src={PF + curtpost.photo1} alt="" />}

                            </div>
                            <div className="ProMiniImg">
                                {curtpost.photo2 && <img className="postImg" onClick={(e) => { setcurPhoto(e.target.src) }} src={PF + curtpost.photo2} alt="" />}

                            </div>
                            
                            <div className="ProMiniImg">
                                {curtpost.photo3 && <img className="postImg" onClick={(e) => { setcurPhoto(e.target.src) }} src={PF + curtpost.photo3} alt="k" />}
                            </div>
                        </div>

                    </div>
                    <div className="productinnertext">

                        <span>Home/{curtpost.categories}</span>
                        <h1>{curtpost.title}</h1>
                        <div className="price">${curtpost.price}</div>
                        <form>
                            <div>
                                <select onChange={(e) => { setproductsize(e.target.value) }}>
                                    <option value="Select Size" >Select Size</option>
                                    <option >32</option>
                                    <option >42</option>
                                    <option >52</option>
                                    <option >62</option>
                                </select>
                                <span><i className="bx bx-chevron-down"></i></span>
                            </div>
                        </form>

                        <form className="form">
                            <input type="number" placeholder="1" onChange={(e) => { setQuantity(e.target.value) }} />
                            <a href='#' className="addCart" onClick={handeleBasket}>Add To Cart</a>
                        </form>
                        <h3>Product Detail</h3>
                        <p>{curtpost.desc}</p>
                    </div>
                </div>

            </section>
            <section className="relatedProducts">
                <div className='relatedHead'>
                    <p>
                        Related Products
                    </p>
                    <p>
                        View more
                    </p>

                </div>
                <div className='reltedinnerproduct'>
                    {RelatedPost.map((p, index) => (
                        <ProductCard key={index} post={p} />
                    ))}

                </div>

            </section>
            <Footer />

        </>
    )

}