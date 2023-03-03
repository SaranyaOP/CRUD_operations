import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import login_img from '../images/login_img.png';
const Login = () =>{
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[lemail,setLEmail] = useState("");
    const[lpassword,setLPassword] = useState("");
    const[userData,setUdata] = useState([]);
    const[msg,setMsg] = useState("");
    const getUserdata = () =>{
        fetch("http://localhost:1234/user")
        .then(response => response.json())
        .then(data =>{
            setUdata(data);
        })
       
    }
    const userLogin = () =>{
       let passArray = [];
        let emailArray = [];
         let userArray = [...userData];
         for(var i = 0; i < userArray.length; i++) {
            var uArray = userArray[i]
            for (const item in uArray) {
                if(item == "email"){
                    emailArray.push(uArray[item]);
                }else if(item == "password"){
                    passArray.push(uArray[item]);
                }
              }
        }
        setLEmail (emailArray);
        setLPassword (passArray);
        // console.log(lemail);
        let emailStatus;
        let passwordStatus;
        emailArray.forEach(myFunction)
        function myFunction(value){
            if(email == value){
                emailStatus = true;
            }else if(email != value){
                return;
            }
        }
        passArray.forEach(myPassFunction)
        function myPassFunction(value){
            if(password == value){
                passwordStatus = true;
                console.log(password);
                console.log("pass" + value);
            }else if(password != value){
                return;
                // passwordStatus = false
                // console.log("passfalse" + value);
            }
        }
        console.log(passwordStatus);
        console.log(emailStatus);
        if(passwordStatus && emailStatus == true){
            window.location.href="#/dashboard";
            localStorage.setItem("email",email) ;
            setEmail("");
            setPassword("");
        }else{
            setMsg("Your Password or email are incorrect");
        }
    }
console.log(localStorage);
   useEffect(()=>{
        getUserdata();
   },[1])
    return(
        <>
        {/* <a href="https://lovepik.com/images/png-account.html">Account Png vectors by Lovepik.com</a> */}
        <div className="container-fluid mybody">
            <div className="log-container shadow">
                <div className="row">
                   <div className="col-lg-6">
                        <div className="image_section">
                            <a href="https://lovepik.com/images/png-account.html">
                            <img src={login_img} alt="Account Png vectors by Lovepik.com" className='Limage'/>
                            </a>
                        </div>
                   </div>
                   <div className="col-lg-6">
                        <div className="login-forms">
                            <div className='login-content'>
                                <h3 className='pb-1'>Login
                                <i className="fa fa-lock m-1 login-icon" aria-hidden="true"></i>
                                </h3>
                                <p className='text-center text-danger'>{msg}</p>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" className="form-control" placeholder='Enter email'
                                    onChange={obj=>setEmail(obj.target.value)}
                                    value={email}/>
                                   
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" className="form-control" placeholder='Enter Password'
                                    onChange={obj=>setPassword(obj.target.value)}
                                    value={password}/>
                                   
                                </div>
                                <div className='form-group'>
                                    <button className='btn btn-block login-btn' onClick={userLogin}>Login</button>
                                </div>
                                <div className='form-group'>
                                    <span className='ms-3'>
                                    <input type="checkbox" className='form-check-input'/>Remember me
                                    </span>
                                    <span className='float-end'>
                                        Forgott password?
                                    </span>
                                </div>
                                <div className='form-group'>
                                    <p className='text-center'>Do you have Account? 
                                    <Link to ="/register" className='reg-link ms-1'>Register </Link> here</p>
                                </div>
                            </div>
                        </div>
                   </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default Login;