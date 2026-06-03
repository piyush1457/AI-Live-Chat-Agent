import { useState } from 'react';
import {ShoppingBag, MessageCircle } from 'lucide-react';
import avatarImage from '../Assessts/image.png';
import { useChat } from '../hooks/useChat';
import { MessageList } from './MessageList';
import { InputBar } from './InputBar';

export function ChatWidget({ isOpenProp, onToggle }: { isOpenProp?: boolean, onToggle?: (v: boolean) => void } = {}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = isOpenProp !== undefined ? isOpenProp : internalIsOpen;
  
  const handleToggle = (val: boolean) => {
    if (onToggle) onToggle(val);
    else setInternalIsOpen(val);
  };

  const [isHovered, setIsHovered] = useState(false);
  const { messages, isLoading, error, sendMessage, clearChat } = useChat();

  return (
    <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 9999 }}>
      {/* Expanded Panel */}
      <div className={`chat-panel ${isOpen ? 'open' : ''}`} style={{
        transformOrigin: 'bottom right',
        pointerEvents: isOpen ? 'auto' : 'none',
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(99,102,241,0.3) 0%, rgba(168,85,247,0.2) 100%)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img 
              src={avatarImage} 
              alt="Avatar" 
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                boxShadow: '0 4px 12px rgba(99,102,241,0.5)',
                objectFit: 'cover'
              }} 
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#f1f5f9', fontWeight: 600, fontSize: '15px' }}>ChiLLGuy</span>
                <span style={{
                  fontSize: '10px',
                  background: 'linear-gradient(135deg, rgba(99,102,241,0.4), rgba(168,85,247,0.4))',
                  padding: '4px 8px',
                  borderRadius: '10px',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <ShoppingBag size={10} style={{ marginRight: '4px' }} /> ShopEasy
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#22c55e',
                  boxShadow: '0 0 8px #22c55e'
                }} />
                <span style={{ color: '#64748b', fontSize: '12px' }}>Online</span>
              </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={clearChat}
              title="New Chat"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '16px',
                background: 'rgba(255,255,255,0.08)',
                color: '#94a3b8',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                e.currentTarget.style.color = 'white';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.color = '#94a3b8';
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
            <button 
              onClick={() => handleToggle(false)}
              title="Close"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '16px',
                background: 'rgba(255,255,255,0.08)',
                color: '#94a3b8',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                e.currentTarget.style.color = 'white';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.color = '#94a3b8';
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 1L13 13M1 13L13 1" />
              </svg>
            </button>
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div style={{
            background: 'rgba(239,68,68,0.15)',
            border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: '10px',
            margin: '8px 16px',
            padding: '8px 12px',
            color: '#fca5a5',
            fontSize: '13px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            animation: 'slideInUp 0.3s ease'
          }}>
            <span>{error}</span>
          </div>
        )}

        <MessageList messages={messages} isLoading={isLoading} />
        <InputBar onSend={sendMessage} isLoading={isLoading} />
      </div>

      {/* Floating Button */}
      <button
        onClick={() => handleToggle(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #6366f1, #a855f7)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          animation: isOpen ? 'none' : 'ripple 2s infinite',
          transform: isHovered && !isOpen ? 'scale(1.1) rotate(-5deg)' : 'scale(1) rotate(0)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <MessageCircle size={24} color="white" />
        )}
      </button>
    </div>
  );
}
