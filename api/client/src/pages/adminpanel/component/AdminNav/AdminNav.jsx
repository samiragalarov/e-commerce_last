import { Link } from 'react-router-dom'
import './AdminNav.css'
import '../../../../App.css'

export function AdminNav() {
    function handlelogout(){
        localStorage.removeItem("accsesToken")
        localStorage.removeItem("username")
        localStorage.removeItem("userid")
        localStorage.removeItem('user')
        window.location.replace("/")
    }
    return (
        <>
            <nav className='adminnav'>
                <h3><Link className='links' to="/adminpanel/Create"> CreatePost</Link></h3>
                <h3> <Link className='links' to="/adminpanel/Deletepost">DeltePost</Link></h3>
                <h3><Link className='links' to="/adminpanel/DeleteUser"> DelteUser</Link> </h3>
                <h3 style={{"cursor":"pointer"}} onClick={handlelogout}>logout</h3>

            </nav>
        </>
    )
}