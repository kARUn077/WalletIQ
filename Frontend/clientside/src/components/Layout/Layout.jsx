import Footer from "./Footer";
import Header from "./Header";
import Orbs from "./Orbs";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


const Layout = ({ children }) => {
  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <Header />
      <main className="flex-grow-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;