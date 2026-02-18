import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

const PrivateRoutes=()=>{    
const [ok,setOk]=useState(false);
const {auth}=useContext(AuthContext);
useEffect(()=>{
    const checkAuth=async ()=>{
    const {data}=await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/user-auth`);
    if(data.ok)
    setOk(true);
    else setOk(false);
    }
    if(auth?.token) checkAuth();
    },[auth?.token]);
return( 
    ok ? <Outlet/> :<Spinner path={'/'}/>
);
}

export default PrivateRoutes;