import { HashRouter, Routes,Route ,Link} from "react-router-dom";
import Dashboard from "./dashboard";
import Edituser from "./edit";
import Login from "./login";
import Register from "./register";
import Userlist from "./userlist";

const Crud_App = () =>{
    return(
        <>
            <HashRouter>
                <Routes>
                    <Route exact path ="/" element={<Login/>}/>
                    <Route exact path ="/login" element={<Login/>}/>
                    <Route exact path ="/register" element={<Register/>}/>
                    <Route exact path ="/dashboard" element={<Dashboard/>}/>
                    <Route exact path ="/userlist" element={<Userlist/>}/>
                    <Route exact path ="/edit/:id" element={<Edituser/>}/>
                </Routes>
  
            </HashRouter>
        </>
    )
}
export default Crud_App;