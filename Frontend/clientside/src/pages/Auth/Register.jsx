import { useRef } from "react";
import Layout from "../../components/Layout/Layout";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios'
import './register.css'
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const name = useRef();
  const email = useRef();
  const phone = useRef();
  const password = useRef();
  const answer = useRef();
  const address = useRef();

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/v1/register-user`,
        {
          name: name.current.value,
          email: email.current.value,
          phone: phone.current.value,
          password: password.current.value,
          answer: answer.current.value,
          address: address.current.value
        });
      if (data?.success) {
        toast.success("Register Successfully");
        navigate("/login");
      }
      else {
        toast.error(data?.message);
      }
    }
    catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  }

  return (
    <Layout>
      <div className="register-wrapper">
        <div className="register-container">
          <h2>Create Account</h2>
          <p className="auth-footer" style={{ marginTop: '-1rem', marginBottom: '1rem' }}>We are happy to have you with us</p>

          <form className="register-form" autoComplete="off" onSubmit={handleOnSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" ref={name} id="name" placeholder="Enter your Name" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" ref={email} id="email" placeholder="Enter your Email" required />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="text" ref={phone} id="phone" placeholder="Enter your Phone Number" required />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" ref={password} id="password" placeholder="Min 6 characters" required />
            </div>

            <div className="form-group">
              <label htmlFor="answer">Security Answer (Favourite Sport)</label>
              <input type="text" ref={answer} id="answer" placeholder="Your favourite Sport" required />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input type="text" ref={address} id="address" placeholder="Enter your Address" required />
            </div>

            <button type="submit" className="auth-btn">Register</button>

            <div className="auth-footer">
              Already have an account? <a href="/login" className="auth-link">Login</a>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Register;
