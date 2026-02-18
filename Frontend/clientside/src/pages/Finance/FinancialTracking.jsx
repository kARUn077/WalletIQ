import { Outlet } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import Sidebar from "./Sidebar";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

const FinancialTracking=()=>{
    return(
        <Layout>
            <div className="main-container">
                <div className="sidbar-box">
                   <Sidebar/>
                </div>
                <div className="body-container">
                   <Outlet/>
                </div>
            </div>
            {/* <ToastContainer/> */}
        </Layout>
    ); 
}

export default FinancialTracking;
