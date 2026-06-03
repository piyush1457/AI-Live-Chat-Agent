import { useEffect, useRef } from 'react';
import { Message } from '../api/chat';
import { MessageBubble } from './MessageBubble';
import avatarImage from '../Assessts/image.png';

interface Props {
  messages: Message[];
  isLoading: boolean;
}

export function MessageList({ messages, isLoading }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      padding: '20px',
      overflowY: 'auto',
      flex: 1
    }}>
      {messages.length === 0 ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          textAlign: 'center',
          gap: '16px'
        }}>
          <img 
            src={avatarImage} 
            alt="Avatar" 
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.1)',
              animation: 'float 3s infinite ease-in-out',
              objectFit: 'cover'
            }} 
          />
          <div>
            <h3 className="text-gradient" style={{ fontSize: '20px', fontWeight: 600, marginBottom: '6px' }}>
              Hi! I'm ChiLLGuy
            </h3>
            <p style={{ color: '#64748b', fontSize: '14px' }}>
              Your ShopEasy support assistant. Ask me anything!
            </p>
          </div>
        </div>
      ) : (
        messages.map(msg => (
          <MessageBubble key={msg.id} message={msg} />
        ))
      )}

      {isLoading && (
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '12px',
          animation: 'slideInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          <img 
            src={avatarImage} 
            alt="Avatar" 
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              boxShadow: '0 4px 10px rgba(99,102,241,0.5)',
              opacity: 0.8,
              objectFit: 'cover'
            }} 
          />
          
          <div style={{
            background: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '18px 18px 18px 4px',
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <div style={{ display: 'flex', gap: '4px' }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#6366f1',
                  animation: `bounce 1.2s infinite`,
                  animationDelay: `${i * 0.2}s`
                }} />
              ))}
            </div>
            <span style={{ color: '#64748b', fontSize: '13px', marginLeft: '6px' }}>
              ChiLLGuy is typing
            </span>
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}
