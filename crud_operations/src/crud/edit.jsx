import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const Edituser = () =>{
    const[name,setName] = useState("");
    const[email,setEmail] = useState("");
    const[mobile,setMobile] = useState("");
    const[password,setPassword] = useState("");
    const[rpassword,setRpassword] = useState("");
    const[userData,setData] = useState({});
    const[msg,setMsg] = useState("");
    const {id} = useParams();

    const getDetails = () =>{
        fetch("http://localhost:1234/user/" + id)
        .then(response => response.json())
        .then(data =>{
            setName(data.name);
            setEmail(data.email);
            setMobile(data.mobile);
            setPassword(data.password);
        })
        
    }
    const updateUser = () =>{
        if(password == rpassword){
             let input = {
            name:name,
            email:email,
            mobile:mobile,
            password:password
        }
        const requestOptions = {
            method:"PUT",
            headers:{"Content-Type" : "application/json"},
            body:JSON.stringify(input)
        }
        fetch("http://localhost:1234/user/" +id ,requestOptions)
        .then(response => response.json())
        .then(data =>{
            setMsg("Updated successfully");
        })
        }
        else{
            setMsg(<p className="text-danger">Password do not match</p>)
        }
       
    }
    useEffect(()=>{
        getDetails();
    },[1])
    return(
        <>
        <div className="mybody">
            <div className="edit_div p-5 shadow">
            <h1 className="text-center pt-2">Edit User - 
            <span className="text-warning">{name}</span></h1>
            <p className="text-center text-success">{msg}</p>
            <div className="row">
            <Link to="/userlist"> <p className="text-end">Back</p></Link>
            <div className="col-lg-6 ps-4 pe-4 pt-2">
                     <div className="form-group">
                        <label for="name">FullName</label>
                        <input type="text" className="form-control"
                        onChange={obj=>setName(obj.target.value)}
                        value={name}/>
                      
                    </div>
                    <div className="form-group">
                        <label for="email">Email</label>
                        <input type="email" className="form-control"
                         onChange={obj=>setEmail(obj.target.value)}
                         value={email}/>
                          
                    </div>
                    <div className="form-group">
                        <label for="mobile">Mobile</label>
                        <input type="number" className="form-control"
                         onChange={obj=>setMobile(obj.target.value)}
                         value={mobile}/>
                         
                    </div>
            </div>
            <div className="col-lg-6 ps-4 pe-4 pt-2">
                <h3 className="text-center text-primary">Change Password</h3>
            <div className="form-group">
                        <label for="password">Password</label>
                        <input type="password" className="form-control"
                         onChange={obj=>setPassword(obj.target.value)}
                         value={password}/>
                         
                    </div>
                    <div className="form-group">
                        <label for="re-password">Re-enter Password</label>
                        <input type="password" className="form-control"
                         onChange={obj=>setRpassword(obj.target.value)}
                         value={rpassword}/>
                         
                    </div>
            </div>
        </div>
        <div className="text-center">
            <button className="update_btn" onClick={updateUser}>Update</button>
        </div>
            </div>
        </div>
        </>
    )
}
export default Edituser;