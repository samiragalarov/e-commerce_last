import './Product.css'
import imagelogo from '../../images/pic1.jpg'
import { AiOutlineHeart } from 'react-icons/ai'
import { RiShoppingBasketLine } from 'react-icons/ri'
import axios from 'axios';
import { Routes, Route, Link } from "react-router-dom";

export function ProductCard(post) {
    const PF = "https://e-commercesamir.herokuapp.com/images/";

    function changepath(){
        window.location.replace(`/singlePage/${post.post._id}`)
    }



    return (
        <>
            <div className="productcard">
                <div className="productcardimg">
                {post.post.photo && <img className="postImg" src={PF + post.post.photo} alt="" />}

                    <div className="cardhovereffect">
                        <div className="cardicons1"><AiOutlineHeart size={45} /></div>
                        <div className="cardicons2"  ><Link onClick={changepath} to={`/singlePage/${post.post._id}`}><RiShoppingBasketLine size={45} /></Link></div>

                    </div>

                </div>
                <div className="productcardabout">
                    <h3>{post.post.title}</h3>
                    <div className="rating"><span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                    </div>
                    <div className="productprice">{post.post.price}</div>

                </div>

            </div>

        </>
    )

}