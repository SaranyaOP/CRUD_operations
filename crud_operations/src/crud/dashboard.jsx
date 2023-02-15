import { Link } from 'react-router-dom';
import dashbord_img from '../images/dashbord_img.png';
const Dashboard = () =>{
    const logout = () =>{
        // localStorage.clear();//it clear history of browser
        window.location.href="#/login";//redirect to login page
        window.location.reload();//after goining to login page it will realod again
    }
    return(
        <>
        <div className="container-fluid">
            <div className="dash-header">
                <h1>Welcome Back...!
                <span className='logout'>
                <Link to="/userlist">
                <button className='dash_button'>View All Users</button>
                </Link>
                    <i className="fa fa-power-off text-danger m-3" aria-hidden="true" onClick={logout}> Logout</i></span>
                </h1>
                
            </div>
            <div className='col-lg-6 offset-3  text-center' >
           
                <div className='col-lg-12 p-5'>
                    <img src = {dashbord_img} className="dash_img"/>
                </div>
            </div>
        </div>
        </>
    )
}
export default Dashboard;