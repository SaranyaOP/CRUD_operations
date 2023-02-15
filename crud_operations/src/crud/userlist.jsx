import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';

const PER_PAGE = 10;

const Userlist = () =>{
    const[userdata,setData] = useState([]);
    const[msg,setMsg] = useState("");
    const allUser = () =>{
        fetch("http://localhost:1234/user")
        .then(response => response.json())
        .then(data=>{
            setData(data);
            console.log(data);
        })
       
    }
    const [currentPage, setCurrentPage] = useState(0);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(userdata.length / PER_PAGE);
    const deleteUser = (id) =>{
        const requestOptions = {
            method:"DELETE",
            headers:{"Content-Type" :"application/json"}
        }
        fetch("http://localhost:1234/user/" + id, requestOptions)
        .then(response => response.text())
        .then(data=>{
            setMsg("Account Deleted Successfully");
            allUser();
        })
    }
    console.log(localStorage);
    useEffect(()=>{
        allUser();
    },[1])
    return(
        <>
        <div className="container">
        <div className="col-lg-4 float-right pt-3">
                <Link to="/dashboard"><button className="btn btn-primary btn-sm m-1">
                <i className="fa fa-arrow-left m-1" aria-hidden="true"></i>
                    Back</button></Link>
               <Link to="/register">
                    <button className="btn btn-success btn-sm m-1">
                    <i className="fa fa-user-plus m-1" aria-hidden="true">  </i>
                    Add new user</button>
               </Link>
            </div>
            <div className="mytable">
            <h1 className="pt-3 text-center">UserList ({userdata.length})</h1>
                <p className="text-center text-danger">{msg}</p>
           <table className="table table-hover">
               <thead className="bg-dark text-white">
                   <th>ID</th>
                   <th>Username</th>
                   <th>E-mail</th>
                   <th>Mobile</th>
                   <th>Action</th>
               </thead>
               <tbody>
                   {
                       userdata.slice(offset, offset + PER_PAGE).map((udata,index)=>{
                           return(
                               <tr key={index}>
                                   <td>{udata.id}</td>
                                   <td>{udata.name}</td>
                                   <td>{udata.email}</td>
                                   <td>{udata.mobile}</td>
                                   <td>
                                   <i className="fa fa-trash m-1 text-danger" aria-hidden="true"
                                    onClick={deleteUser.bind(this,udata.id)}></i>
                                    <Link to={`/edit/${udata.id}`}> 
                                    <i className="fa fa-pencil-square-o m-1 text-success" aria-hidden="true"></i>
                                    </Link>
                                   </td>
                               </tr>
                           )
                       })
                   }
               </tbody>
           </table> 
           <div className="mb-4 mt-4">
                        <ReactPaginate
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            breakLabel={"..."}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={3}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination  justify-content-center"}
                            pageClassName={"page-item "}
                            pageLinkClassName={"page-link"}
                            previousClassName={"page-item"}
                            previousLinkClassName={"page-link"}
                            nextClassName={"page-item"}
                            nextLinkClassName={"page-link"}
                            breakClassName={"page-item"}
                            breakLinkClassName={"page-link"}
                            activeClassName={"active primary"}
                        />
                    </div>
            </div>
        </div>
        </>
    )
}
export default Userlist;