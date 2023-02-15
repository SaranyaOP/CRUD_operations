import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () =>{
    const[name,setName] = useState("");
    const[email,setEmail] = useState("");
    const[mobile,setMobile] = useState("");
    const[password,setPassword] = useState("");
    const[rpassword,setRpassword] = useState("");
    const[msg,setMsg] = useState("");
    const[errorList,setError] = useState({});
    
    
    const saveData = () =>{
        let allerror = {}
        let formstatus = true;
        if(name == ""){
            allerror["nameError"] = "Invalid name";
            formstatus= false;
        }else{
            allerror["nameError"] = "";
            
        }
        var mpattern = /^[6-9]\d{9}$/;
        if(! mpattern.test(mobile)){
            allerror["mobileError"] = "Mobile number should be 10 digit";
            formstatus= false;
        }else{
            allerror["mobileError"] = "";
           
        }
        var epattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(! epattern.test(email)){
            allerror["emailError"] = "Invalid email";
            formstatus= false;
        }else{
            allerror["emailError"] = "";
           
        } if(password == ""){
            allerror["passError"] = "Password minimum 8 characters";
            formstatus= false;
        }else{
            allerror["passError"] = "";
           
        }
        if(password != rpassword){
            allerror["rpassError"] = "Password dose not match";
            formstatus= false;
        }else{
            allerror["rpassError"] = "";
            
        }
        setError(allerror);
        if(formstatus == true){
            let input = {
            name:name,
            email:email,
            mobile:mobile,
            password:password
        }
        const requestOptions = {
            method:"POST",
            headers:{"Content-Type" : "application/json"},
            body:JSON.stringify(input)
        }
        fetch("http://localhost:1234/user",requestOptions)
        .then(response => response.text())
        .then(data =>{
            setMsg("Craeted successfully");
            savePass_Email();
            window.location.href="#/login";
            window.location.reload();

        })
           
        }else{
            setMsg(<p className="text-danger">Please fill the form correctly</p>);
        }
    }
    const savePass_Email = () =>{
        let logInput = {
            email:email,
            password:password
        }
        const requestOptions = {
            method:"POST",
            headers:{"Content-Type" : "application/json"},
            body:JSON.stringify(logInput)
        }
        fetch("http://localhost:1234/logindetails",requestOptions)
        .then(response => response.text())
        .then(data =>{
            console.log("success");
        })
    }
    const Clear = () =>{
        // setName("");
        // setEmail("");
        // setMobile("");
        // setPassword("");
        // setRpassword("");
        window.location.reload();
    }
    console.log("errorlist" + errorList +errorList.nameError);
    return(
        <>
             <div className="container-fluid mybody">
                <div className="reg-form shadow">
                    <h2 className="text-center">Register Form</h2>
                    <p className="text-center">{msg}</p>
                    <div className="form-group">
                        <label for="name">FullName</label>
                        <input type="text" className="form-control"
                        onChange={obj=>setName(obj.target.value)}
                        value={name}/>
                        <i className="text-danger">{errorList.nameError}</i>
                    </div>
                    <div className="form-group">
                        <label for="email">Email</label>
                        <input type="email" className="form-control"
                         onChange={obj=>setEmail(obj.target.value)}
                         value={email}/>
                          <i className="text-danger">{errorList.emailError}</i>
                    </div>
                    <div className="form-group">
                        <label for="mobile">Mobile</label>
                        <input type="number" className="form-control"
                         onChange={obj=>setMobile(obj.target.value)}
                         value={mobile}/>
                          <i className="text-danger">{errorList.mobileError}</i>
                    </div>
                    <div className="form-group">
                        <label for="password">Password</label>
                        <input type="password" className="form-control"
                         onChange={obj=>setPassword(obj.target.value)}
                         value={password}/>
                          <i className="text-danger">{errorList.passError}</i>
                    </div>
                    <div className="form-group">
                        <label for="re-password">Re-enter Password</label>
                        <input type="password" className="form-control"
                         onChange={obj=>setRpassword(obj.target.value)}
                         value={rpassword}/>
                          <i className="text-danger">{errorList.rpassError}</i>
                    </div>
                    <div className="form-group text-center">
                        <button className="btn btn-primary m-1" onClick={saveData}>Register</button>
                        <button className="btn btn-warning m-1" onClick={Clear}>Clear</button>
                        <p>Have already an account ? <Link to="/login" className="log-link">Login</Link></p>
                    </div>
                </div>    
             </div>
        </>
    )
}
export default Register;