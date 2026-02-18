import { useContext} from "react"
import { AuthContext } from "../context/AuthContext"
import { Outlet } from "react-router-dom";
import Spinner from "../components/Spinner";

const PrivateLoginRegister=()=>{
    const {auth}=useContext(AuthContext);
    return (
           !auth?.user ? <Outlet/> : <Spinner/>  
    );
}

export default PrivateLoginRegister;