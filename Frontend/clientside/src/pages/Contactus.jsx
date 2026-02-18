import Layout from "../components/Layout/Layout";
import './contactus.css';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contactus = () => {
  return (
    <Layout>
      <div className="contact-box">
        <div className="contact-container">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Have questions or feedback? We'd love to hear from you. Our team is here to help you with your financial tracking journey.
            </p>

            <div className="contact-item">
              <div className="contact-icon"><FaPhoneAlt /></div>
              <div className="contact-text">
                <h4>Phone</h4>
                <p>+1 (555) 000-0000</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon"><FaEnvelope /></div>
              <div className="contact-text">
                <h4>Email</h4>
                <p>support@walletiq.com</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon"><FaMapMarkerAlt /></div>
              <div className="contact-text">
                <h4>Office</h4>
                <p>123 Finance St, Wealth City, VC 10101</p>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <form className="contact-form">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="John Doe" required />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="john@example.com" required />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input type="text" placeholder="How can we help?" required />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea rows="4" placeholder="Your message here..." required></textarea>
              </div>
              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Contactus;