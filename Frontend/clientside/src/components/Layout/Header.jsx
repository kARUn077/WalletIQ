import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiMoneyEuroBoxFill, RiSunFill, RiMoonFill } from "react-icons/ri";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify";
import { GlobalContext } from "../../context/GlobalContext";


const Header = () => {
  const { auth, setAuth, setPrevLocation } = useContext(AuthContext);
  const { setIncomes, setExpenses, setUser_Id, theme, toggleTheme } = useContext(GlobalContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    if (location.pathname !== '/register' && location.pathname !== '/login')
      setPrevLocation(location.pathname);
    localStorage.removeItem("auth");
    setIncomes([]);
    setExpenses([]);
    setUser_Id("");
    toast.success("LogOut Successfully");
    navigate('/login');
  }
  return (
    <nav className="navbar navbar-expand-lg glass sticky-top" style={{ padding: '0.75rem 2rem', borderBottom: '1px solid var(--border-color)', background: 'var(--glass-bg)' }}>
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary-color)' }}>
          <RiMoneyEuroBoxFill style={{ marginRight: '0.5rem', fontSize: '1.75rem' }} />
          WalletIQ
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMain" aria-controls="navbarMain" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" style={{ filter: theme === 'dark' ? 'invert(1)' : 'none' }}></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarMain">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} style={{ fontWeight: 500, padding: '0.5rem 1rem', color: 'var(--text-main)' }} to="/">Home</Link>
            </li>

            {!auth.user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" style={{ fontWeight: 500, padding: '0.5rem 1rem', color: 'var(--text-main)' }} to="/register">Register</Link>
                </li>
                <li className="nav-item ms-lg-2">
                  <Link className="btn btn-primary" style={{ background: 'var(--primary-color)', border: 'none', borderRadius: '8px', padding: '0.5rem 1.5rem', fontWeight: 600 }} to="/login">Login</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname.includes('/finance') ? 'active' : ''}`} style={{ fontWeight: 500, padding: '0.5rem 1rem', color: 'var(--text-main)' }} to="/finance/tracking">Finance Dashboard</Link>
                </li>
                <li className="nav-item ms-lg-3">
                  <button className="btn btn-outline-danger" style={{ borderRadius: '8px', padding: '0.5rem 1.25rem', fontWeight: 600 }} onClick={handleLogout}>LogOut</button>
                </li>
              </>
            )}

            <li className="nav-item ms-lg-3">
              <button
                onClick={toggleTheme}
                className="theme-toggle-btn"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-main)',
                  fontSize: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.5rem'
                }}
              >
                {theme === 'light' ? <RiMoonFill /> : <RiSunFill />}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;