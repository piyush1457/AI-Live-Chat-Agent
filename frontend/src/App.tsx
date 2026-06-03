import { useState } from 'react';
import { ShoppingBag, Headphones, Watch, Keyboard, Menu, X } from 'lucide-react';
import { ChatWidget } from './components/ChatWidget';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar */}
      <nav className="navbar">
        <div style={{ fontSize: '24px', fontWeight: 700, display: 'flex', alignItems: 'center', zIndex: 50 }} className="text-gradient">
          <ShoppingBag size={24} style={{ marginRight: '8px', color: '#6366f1' }} /> ShopEasy
        </div>
        
        {/* Desktop Nav */}
        <div className="nav-links desktop-only">
          <span style={{ cursor: 'pointer', color: '#f1f5f9' }}>Home</span>
          <span style={{ cursor: 'pointer' }}>Products</span>
          <span style={{ cursor: 'pointer' }}>Orders</span>
          <span style={{ cursor: 'pointer' }}>About</span>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button 
          className="mobile-menu-toggle" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{ zIndex: 50 }}
        >
          {isMobileMenuOpen ? <X size={28} color="#f1f5f9" /> : <Menu size={28} color="#f1f5f9" />}
        </button>

        {/* Mobile Nav Overlay */}
        <div className={`mobile-nav-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-nav-links">
            <span onClick={() => setIsMobileMenuOpen(false)}>Home</span>
            <span onClick={() => setIsMobileMenuOpen(false)}>Products</span>
            <span onClick={() => setIsMobileMenuOpen(false)}>Orders</span>
            <span onClick={() => setIsMobileMenuOpen(false)}>About</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="hero-section">
        <h1 className="text-gradient hero-title">
          Premium Shopping Experience
        </h1>
        <p className="hero-subtitle">
          Discover curated collections of high-end products. Experience seamless shopping with our AI-powered support.<br/><br/>
          <span style={{ fontSize: '16px', opacity: 0.8 }}>
            This is a demo landing page built primarily to showcase the AI assistant. It can later be fully integrated with a real Shopify website.
          </span>
        </p>
        
        <div className="hero-buttons">
          <button 
            onClick={() => setIsChatOpen(true)}
            className="bg-gradient btn-primary" 
          >
            Talk with AI
          </button>
          <button className="btn-secondary">
            Learn More
          </button>
        </div>

        {/* Product Cards */}
        <div className="product-grid">
          {[
            { id: 1, name: 'Premium Wireless Headphones', price: '₹14,999', icon: <Headphones size={48} strokeWidth={1.5} color="#8b5cf6" /> },
            { id: 2, name: 'Smart Fitness Watch', price: '₹8,999', icon: <Watch size={48} strokeWidth={1.5} color="#8b5cf6" /> },
            { id: 3, name: 'Mechanical Keyboard', price: '₹6,499', icon: <Keyboard size={48} strokeWidth={1.5} color="#8b5cf6" /> }
          ].map(product => (
            <div key={product.id} className="product-card"
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-10px)'}
            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{
                fontSize: '64px',
                marginBottom: '24px',
                background: 'rgba(255,255,255,0.05)',
                width: '120px',
                height: '120px',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {product.icon}
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px', color: '#f1f5f9' }}>{product.name}</h3>
              <p className="text-gradient" style={{ fontSize: '24px', fontWeight: 700 }}>{product.price}</p>
            </div>
          ))}
        </div>
      </main>

      <ChatWidget isOpenProp={isChatOpen} onToggle={setIsChatOpen} />
    </div>
  );
}

export default App;
