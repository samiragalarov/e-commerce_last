import axios from 'axios';
import './Basketcard.css'

export function BasketCard(p) {
    const PF = "https://e-commercesamir.herokuapp.com/images/";
    const handleRemove = async (id) => {
        try {

            const res = await axios.delete(`https://e-commercesamir.herokuapp.com/basketProductsdelete/${id}`, {
                headers: {
                    'Authorization': `Basic ${JSON.parse(localStorage.getItem("user")).accsesToken}`
                }
            })
            window.location.reload('/basket')
            console.log(res)

        } catch (err) {
            console.log(err)

        }
    }

    return (
        <>

            <div className='basketcardinner'>

                <div className='basketcardspro'>
                    <div className='basketinside'>
                        <div className='basketinsideimg'>

                            {p.post.photo && <img className="postImg" src={PF + p.post.photo} alt="" />}

                        </div>
                        <div className='basketinsidetext'>
                            <p>{p.post.title}</p>
                            <span>{p.post.price}</span>
                            <div  style={{ color: "red" ,"cursor":"pointer"}} onClick={() => { handleRemove(p.post._id) }}>remove</div>

                        </div>

                    </div>

                </div>
                <div className='basketcardsquantity'>
                    <input type="number" min="1" />

                </div>
                <div className='basketcardsprice'>
                    <p>${p.post.price}      </p>

                </div>

            </div>



        </>
    )

}