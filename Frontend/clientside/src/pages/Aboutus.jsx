import Layout from "../components/Layout/Layout";

const Aboutus = () => {
  return (
    <Layout>
      <div className="about-wrapper" style={{ background: 'var(--bg-color)', padding: '4rem 2rem', minHeight: '100vh' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div className="text-center" style={{ marginBottom: '4rem' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.5rem' }}>Empowering Your Financial Future</h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto' }}>
              We build tools that help you understand your spending, save more, and live the life you want.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div className="glass" style={{ padding: '2.5rem', borderRadius: '24px', background: 'var(--card-bg)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🎯</div>
              <h3 style={{ fontWeight: 700, marginBottom: '1rem' }}>Our Mission</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                To provide the most intuitive and powerful platform for personal finance management, making wealth building accessible to everyone.
              </p>
            </div>

            <div className="glass" style={{ padding: '2.5rem', borderRadius: '24px', background: 'var(--card-bg)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🛡️</div>
              <h3 style={{ fontWeight: 700, marginBottom: '1rem' }}>Privacy First</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Your data is yours. We employ industry-leading security practices to ensure your financial information remains private and secure.
              </p>
            </div>

            <div className="glass" style={{ padding: '2.5rem', borderRadius: '24px', background: 'var(--card-bg)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🚀</div>
              <h3 style={{ fontWeight: 700, marginBottom: '1rem' }}>Continuous Innovation</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                We're constantly evolving, adding new features and insights to help you make better financial decisions every day.
              </p>
            </div>
          </div>

          <div style={{ marginTop: '5rem', display: 'flex', alignItems: 'center', gap: '3rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <h2 style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>Why track with us?</h2>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 500 }}>
                  <span style={{ color: 'var(--success)' }}>✓</span> Real-time expense monitoring
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 500 }}>
                  <span style={{ color: 'var(--success)' }}>✓</span> Intelligent category breakdown
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 500 }}>
                  <span style={{ color: 'var(--success)' }}>✓</span> Visualized spending trends
                </li>
              </ul>
            </div>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <img
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Financial Planning"
                style={{ width: '100%', borderRadius: '24px', boxShadow: 'var(--shadow)' }}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Aboutus;
