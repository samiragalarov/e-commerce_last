import './Create.css'
import { useState ,useRef } from "react";
import test from '../../../images/test.jpg'
import { BiImageAdd } from "react-icons/bi"
import { AdminNav } from '../component/AdminNav/AdminNav';
import axios from "axios";

export function AdminPanel() {
    const [file, setFile] = useState(null);
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const [file3, setFile3] = useState(null);
    const [file4, setFile4] = useState(null);
    const [postname, setpostname] = useState("")
    const [posthead, setposthead] = useState("")
    const [postprice, setpostprice] = useState("")
    const [postcount, setpostcount] = useState("")
    const [postdetail, setpostdetail] = useState("")
    const [producttype, setproducttype] = useState('')
    const [yeni, setyeni] = useState(null)
    const submitButton = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault(e);  
        const newPost = {
            title: postname,
            desc: postdetail,
            categories: producttype,
            price: postprice

        }
        if (file) {

            newPost.photo = file;
            newPost.photo1 = file1;
            newPost.photo2 = file2;
            newPost.photo3 = file3;
            newPost.photo4 = file4;
            submitButton.current.submit();


        }
        try {
           
            const res = await axios.post("https://e-commercesamir.herokuapp.com/createProduct", newPost,
                {
                    headers: {
                        'Authorization': `Basic ${JSON.parse(localStorage.getItem("user")).accsesToken}`
                    }
                })



        } catch (err) {
            console.log(err)
        }

    }

    return (
        <>
            <AdminNav />

            <main className='adminmain'>
                <form id="myForm" ref={submitButton} action="https://e-commercesamir.herokuapp.com/upload" method="post" enctype="multipart/form-data" >
                    <div className='formpart1'>
                        <div className='formpart1one'>

                            <input type="file" className='frominouttitle' onChange={(e) => setFile(e.target.files[0].name)} name="avatar" multiple />
                            <input type="file" onChange={(e) => setFile1(e.target.files[0].name)} name="avatar" multiple />
                            <input type="file" onChange={(e) => setFile2(e.target.files[0].name)} name="avatar" multiple />
                            <input type="file" onChange={(e) => setFile3(e.target.files[0].name)} name="avatar" multiple />


                        </div>
                        <div className='formpart1two'>
                            <label>title</label>
                            <input className='inputtext' onChange={(e) => { setpostname(e.target.value) }} />
                            <label>head</label>
                            <input className='inputtext' onChange={(e) => { setposthead(e.target.value) }} />
                            <label>price</label>
                            <input className='inputtext' onChange={(e) => { setpostprice(e.target.value) }} placeholder='price' />

                        </div>


                    </div>
                    <div className='formpart2'>
                        <select onChange={(e) => { setproducttype(e.target.value) }}>
                            <option value="t-shirt" >t-shirt</option>
                            <option value="pant">pant</option>
                            <option value="mont"> mont</option>
                        </select>
                        <textarea onChange={(e) => { setpostdetail(e.target.value) }} />

                        <button onClick={handleSubmit} >Create Post</button>

                    </div>



                </form>


            </main>

        </>


    )
}
