import { useState } from 'react';
import { ShoppingBag, Headphones, Watch, Keyboard } from 'lucide-react';
import { ChatWidget } from './components/ChatWidget';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar */}
      <nav style={{
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ fontSize: '24px', fontWeight: 700, display: 'flex', alignItems: 'center' }} className="text-gradient">
          <ShoppingBag size={24} style={{ marginRight: '8px', color: '#6366f1' }} /> ShopEasy
        </div>
        <div style={{ display: 'flex', gap: '32px', color: '#64748b', fontWeight: 500 }}>
          <span style={{ cursor: 'pointer', color: '#f1f5f9' }}>Home</span>
          <span style={{ cursor: 'pointer' }}>Products</span>
          <span style={{ cursor: 'pointer' }}>Orders</span>
          <span style={{ cursor: 'pointer' }}>About</span>
        </div>
      </nav>

      {/* Hero Section */}
      <main style={{ flex: 1, padding: '50px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <h1 className="text-gradient" style={{ fontSize: '56px', fontWeight: 800, marginBottom: '16px', maxWidth: '800px', lineHeight: 1.2 }}>
          Premium Shopping Experience
        </h1>
        <p style={{ color: '#64748b', fontSize: '20px', maxWidth: '800px', marginBottom: '30px', lineHeight: 1.6 }}>
          Discover curated collections of high-end products. Experience seamless shopping with our AI-powered support.<br/><br/>
          <span style={{ fontSize: '16px', opacity: 0.8 }}>
            This is a demo landing page built primarily to showcase the AI assistant. It can later be fully integrated with a real Shopify website.
          </span>
        </p>
        
        <div style={{ display: 'flex', gap: '20px', marginBottom: '80px' }}>
          <button 
            onClick={() => setIsChatOpen(true)}
            className="bg-gradient" 
            style={{
              padding: '16px 32px',
              borderRadius: '12px',
              border: 'none',
              color: 'white',
              fontWeight: 600,
              fontSize: '16px',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(99,102,241,0.3)'
          }}>
            Talk with AI
          </button>
          <button style={{
            padding: '16px 32px',
            borderRadius: '12px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'white',
            fontWeight: 600,
            fontSize: '16px',
            cursor: 'pointer'
          }}>
            Learn More
          </button>
        </div>

        {/* Product Cards */}
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { id: 1, name: 'Premium Wireless Headphones', price: '₹14,999', icon: <Headphones size={48} strokeWidth={1.5} color="#8b5cf6" /> },
            { id: 2, name: 'Smart Fitness Watch', price: '₹8,999', icon: <Watch size={48} strokeWidth={1.5} color="#8b5cf6" /> },
            { id: 3, name: 'Mechanical Keyboard', price: '₹6,499', icon: <Keyboard size={48} strokeWidth={1.5} color="#8b5cf6" /> }
          ].map(product => (
            <div key={product.id} style={{
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '24px',
              padding: '32px',
              width: '300px',
              textAlign: 'left',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}
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
