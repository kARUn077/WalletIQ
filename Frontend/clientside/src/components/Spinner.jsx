import { useContext, useEffect, useState } from "react";
import { useNavigate ,useLocation} from "react-router-dom";
import { AuthContext } from "../context/AuthContext";



const Spinner=()=>{
    const {auth}=useContext(AuthContext);
    const [count,setCount]=useState(3);
    const navigate=useNavigate();
    const location=useLocation();
    useEffect(()=>{
        const interval=setInterval(()=>{
        setCount(count-1)
        },1000);
        if(count===0){
          if(!auth?.user){
         navigate('/login',{
            state:location.pathname
        }); 
    }else {
        navigate('/');
    }
    }
        return ()=>clearInterval(interval);
    },[count,navigate,location]);
    return(
         <>
            <div className="d-flex flex-column justify-content-center align-items-center vw-100 vh-100">
                <h1 className="mb-4 spinner-text">Redirecting to you in {count} seconds</h1>
                <div className="spinner-border" role="status" style={{ width: "3rem", height: "3rem" }}>
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </>
    );
}

export default Spinner;