import { useContext,useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { MenuItems } from "../../utils/MenuItems";
import {Link} from 'react-router-dom'
import './sidebar.css'
const Sidebar=()=>{
    const {auth,active,setActive}=useContext(AuthContext);
    useEffect(() => {
        const storedActive = localStorage.getItem("active");
        if (storedActive !== null) {
          setActive(parseInt(storedActive));
        }
      }, [setActive]);
    
return(
    <div className="sidebar-container">
        <Link to='/finance/tracking/profile' className="user-profile">
            <img src="https://static.vecteezy.com/system/resources/previews/024/183/502/original/male-avatar-portrait-of-a-young-man-with-a-beard-illustration-of-male-character-in-modern-color-style-vector.jpg" alt="user-avtar" />
            <div className="user-name">
                <h5>{auth?.user?.name&&auth?.user?.name.toUpperCase()}</h5>
                <p>Your Profile!</p> 
            </div> 
        </Link>
        <div className="menu-items d-flex flex-column">
                {MenuItems.map((item)=>(
                <Link className={`sidebar-link ${active === item.id ? "active-link":""}`}
                 key={item.id} to={item.link} onClick={()=>{setActive(item.id);localStorage.setItem('active',item.id)}}>
                        {item.icon}
                      <span>{item.title}</span>
                </Link>
                ))}
        </div>
    </div>
);
}

export default Sidebar;


