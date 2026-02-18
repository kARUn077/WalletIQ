import { useContext, useRef } from "react";
import Layout from "../../components/Layout/Layout";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import './register.css';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { GlobalContext } from "../../context/GlobalContext";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { auth, setAuth, prevLocation } = useContext(AuthContext);
    const { setUser_Id } = useContext(GlobalContext);

    const email = useRef();
    const password = useRef();

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/v1/login-user`, {
                email: email.current.value,
                password: password.current.value,
            });

            if (data?.success) {
                toast.success("Login Successfully", { position: "top-right", autoClose: 3000 });
                setAuth({ ...auth, user: data.user, token: data.token });
                setUser_Id(data.user._id);
                localStorage.setItem('auth', JSON.stringify(data));

                const redirectPath = location.state || prevLocation || '/';
                navigate(redirectPath);
            } else {
                toast.error(data?.message || "Login failed", { position: "top-right", autoClose: 3000 });
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Something went wrong", { position: "top-right", autoClose: 3000 });
            }
        }
    };

    return (
        <Layout>
            <div className="register-wrapper">
                <div className="register-container">
                    <h2>Welcome Back</h2>
                    <p className="auth-footer" style={{ marginTop: '-1rem', marginBottom: '1rem' }}>We are happy to have you back</p>

                    <form className="register-form" autoComplete="off" onSubmit={handleOnSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input type="email" ref={email} id="email" placeholder="Enter your Email" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" ref={password} id="password" placeholder="Enter Password" required />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Link to='/forget' className="auth-link" style={{ fontSize: '0.875rem' }}>Forgot Password?</Link>
                        </div>

                        <button type="submit" className="auth-btn">Login</button>

                        <div className="auth-footer">
                            Don't have an account? <Link to="/register" className="auth-link">Register</Link>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default Login;
