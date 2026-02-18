import { Link } from "react-router-dom";


const Footer = () => {
    return (
        <footer className="footer" style={{ borderTop: '1px solid var(--border-color)', background: 'var(--card-bg)', padding: '2rem 1rem', transition: 'background 0.3s ease' }}>
            <div className="container text-center">
                <h5 style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '1rem' }}>WalletIQ</h5>
                <div className="footer-link-container d-flex justify-content-center gap-4 mb-3">
                    <Link to='/aboutus' style={{ textDecoration: 'none', color: 'var(--text-muted)', fontWeight: 500 }}>About</Link>
                    <Link to='/contactus' style={{ textDecoration: 'none', color: 'var(--text-muted)', fontWeight: 500 }}>Contact</Link>
                </div>
                <p className="mb-0" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>© {new Date().getFullYear()} All rights reserved</p>
            </div>
        </footer>
    );
}

export default Footer;