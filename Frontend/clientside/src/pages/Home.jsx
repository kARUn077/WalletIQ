import { useContext } from "react";
import Layout from "../components/Layout/Layout";
import { AuthContext } from "../context/AuthContext";
import { Link } from 'react-router-dom';

const Home = () => {
  const { auth } = useContext(AuthContext);

  return (
    <Layout>
      <div className="home-hero" style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        background: `linear-gradient(var(--hero-overlay), var(--hero-overlay)), url("https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '2rem',
        transition: 'background 0.3s ease'
      }}>
        <div style={{ maxWidth: '800px' }}>
          <h1 style={{ fontSize: '4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.5rem', lineHeight: 1.1 }}>
            Master Your Money <br />
            <span style={{ color: 'var(--primary-color)' }}>With Professional Precision</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
            The most intuitive and powerful platform to track your expenses, manage your incomes, and achieve the financial freedom you deserve.
          </p>

          {!auth.user ? (
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <Link to="/register" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem', fontWeight: 600, borderRadius: '12px', background: 'var(--primary-color)', border: 'none' }}>
                Start Free Trial
              </Link>
              <Link to="/aboutus" className="btn btn-outline-secondary" style={{ padding: '1rem 2rem', fontSize: '1.1rem', fontWeight: 600, borderRadius: '12px', border: '2px solid var(--border-color)' }}>
                Learn More
              </Link>
            </div>
          ) : (
            <Link to="/finance/tracking" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem', fontWeight: 600, borderRadius: '12px', background: 'var(--primary-color)', border: 'none' }}>
              Go to Dashboard
            </Link>
          )}
        </div>
      </div>

      <div style={{ padding: '5rem 2rem', background: 'var(--card-bg)', transition: 'background 0.3s ease' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📈</div>
              <h3 style={{ fontWeight: 700, marginBottom: '0.75rem' }}>Real-time Tracking</h3>
              <p style={{ color: 'var(--text-muted)' }}>Instantly record and categorize every transaction with our lightning-fast interface.</p>
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📊</div>
              <h3 style={{ fontWeight: 700, marginBottom: '0.75rem' }}>Visual Insights</h3>
              <p style={{ color: 'var(--text-muted)' }}>Transform raw numbers into beautiful, actionable charts that tell your financial story.</p>
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔒</div>
              <h3 style={{ fontWeight: 700, marginBottom: '0.75rem' }}>Secure & Private</h3>
              <p style={{ color: 'var(--text-muted)' }}>Your data is encrypted and protected with industry-standard security protocols.</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '5rem 2rem', background: 'var(--bg-color)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>Ready to take control?</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>Join thousands of users who have transformed their relationship with money.</p>
          <Link to="/register" className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.1rem', fontWeight: 600, borderRadius: '12px', background: 'var(--primary-color)', border: 'none' }}>
            Get Started Today
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default Home;