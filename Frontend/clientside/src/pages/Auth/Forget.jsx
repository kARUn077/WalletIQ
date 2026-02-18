import { useContext, useRef } from "react";
import Layout from "../../components/Layout/Layout";
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from 'react-toastify';
import axios from 'axios'
import './register.css'
import {useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";


const Forget=()=>{

    const navigate=useNavigate();
    const {auth,setAuth}=useContext(AuthContext);

    const email=useRef();
    const answer=useRef();
    const password=useRef();
   
    const handleOnSubmit=async (event)=>{
        event.preventDefault();
        try{
            const {data}=await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/v1/forget-user`,{
                                            email:email.current.value,
                                            answer:answer.current.value,
                                            newPassword:password.current.value
                                            });
                if(data?.success){
                    toast.success("Password Reset Successfully");
                    setAuth({...auth,user:data.user,token:data.token});
                    localStorage.setItem('auth',JSON.stringify(data));
                    navigate('/login');
                }
                else{
                    toast.error(data?.message);
                }
        }
        catch (error){
            console.log(error);
             if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message);
            }else{
            toast.error("Something went wrong");
            }
        }
    }

    return(
<Layout>
<form className="form-box" autoComplete="off" onSubmit={handleOnSubmit}>
  <div className="d-flex flex-column form-container">
    <h1 className="form-heading">Reset Password Now!</h1>
    <div className="mb-3">
      <input type="email" autoComplete="off"  ref={email} className="form-control input-field" id="exampleInputEmail1" placeholder="Enter your Email" aria-describedby="emailHelp" required/>
    </div>
    <div className="mb-3">
      <input type="text" autoComplete="off"  ref={answer} className="form-control input-field" id="exampleInputAnswer1" placeholder="What is your favourite Sport?" required/>
    </div>
    <div className="mb-3">
      <input type="password" autoComplete="off"  ref={password} className="form-control input-field" id="exampleInputPassword1" placeholder="Enter Password" required/>
    </div>
    <div className="mb-3 form-check">
       <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
      <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
    </div>
    <button type="submit" className="btn submit-button">Reset Password</button>
  </div>
</form>
{/* <ToastContainer/> */}
</Layout>
    );
}

export default Forget;

