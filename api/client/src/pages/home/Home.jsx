import { Navbar } from '../../component/navbar/Navbar'
import React from 'react';
import logo from '../../images/advert2.png'
import image1 from '../../images/advert1.png'
import image2 from '../../images/advert3.png'
import test from '../../images/test.jpg'
import barnd1 from '../../images/brand1.png'
import barnd2 from '../../images/brand2.png'
import './Home.css'
import { ProductCard } from '../../component/product/Product';
import { Footer } from '../../component/footer/Footer';
import { useEffect, useState ,useContext ,useRef} from "react";
import axios from "axios";
import { Link } from 'react-router-dom';


export function Home() {
    
    const [latsposts, setlastposts] = useState([])
    const [posts, setposts] = useState([])
    useEffect(() => {
        const getposts = async (e) => {
            const res = await axios.get('https://e-commercesamir.herokuapp.com/featuredProducts', {
                headers: {
                    'Authorization': `token ${JSON.parse(localStorage.getItem("user")).accsesToken}`
                }
            })
            setposts(res.data)
            console.log(res.data)


        }
        getposts()

    }, [])


    useEffect(() => {
        const getposts = async (e) => {
            const res = await axios.get('https://e-commercesamir.herokuapp.com/getlastest', {
                headers: {
                    'Authorization': `token ${JSON.parse(localStorage.getItem("user")).accsesToken}`
                }
            })
            setlastposts(res.data)
            console.log(res.data)


        }
        getposts()

    }, [])

 



    return (
        <>

            <header>    
                <Navbar />

                <section className="firstPart">
      
                    <div  className="mainText">
                        <div className="innerText">
                            <p className='innerText1'><span className="innerTextsapan1" > 70%</span> <span className="innerTextsapan2"   >SALE OFF</span> </p>
                            <p  className="innerTextsapan3"  >Summer Vibesmode on</p>

                            <div className='innerbutton' > <Link className='linksstyle' to="/products">shop now</Link></div>

                        </div>


                    </div>
                    <div className="firstPimage">
                        <img src={logo} alt="saca" />

                    </div>

                </section>


            </header>
            <main>
                <section className="catgeroycards">
                    <div className="catcard  catcard1">
                        <div className="cardborder">
                            <div className='cardtext'>

                            </div>

                        </div>

                        <img src={image1} alt="" />

                    </div>
                    <div className="catcard catcard2">
                        <div className="cardborder">
                            <div className='cardtext'>

                            </div>

                        </div>
                        <img src={logo} alt="" />

                    </div>
                    <div className="catcard catcard3">
                        <div className="cardborder">
                            <div className='cardtext'>

                            </div>

                        </div>
                        <img src={image2} alt="" />

                    </div>

                </section>
                <section className="FeaturedProducts">
                    <div className="FeaturedProductshead"><p>Featured Products</p> </div>
                    <div className="FeaturedProductsinner">
                    {posts.map((p, index) => (
                        <ProductCard key={index} post={p} />
                    ))}
                   
                    </div>

                </section>
                <section className="LatestProducts">
                    <div className="LatestProductshead"><p>Latest Products</p></div>
                    <div className="LatestProductsinner">
                    {latsposts.map((p, index) => (
                        <ProductCard key={index} post={p} />
                    ))}


                    </div>

                </section>
                <section className="discunttable">
                    <div className="discunttableimg"><img src={test} />  </div>
                    <div className="discunttabletext">
                        <p className="discunttable1">70% SALE OFF</p>
                        <p className="discunttable2">Collect Your</p>
                        <p className="discunttable2">Kids Collection</p>
                        <div className="discunttablebutton"><Link to="/products" className='links'>shop now</Link> </div>

                    </div>




                </section>
                <section className="logos">
                    <div className="logobox">
                        <img src={barnd1} />

                    </div>
                    <div className="logobox">
                        <img src={barnd2} />

                    </div>
                    <div className="logobox">
                        <img src={barnd1} />

                    </div>
                    <div className="logobox">
                        <img src={barnd2} />

                    </div>
                    <div className="logobox">
                        <img src={barnd1} />

                    </div>
                    <div className="logobox">
                        <img src={barnd2} />

                    </div>


                </section>

            </main>
           <Footer/>
        </>
    )
}