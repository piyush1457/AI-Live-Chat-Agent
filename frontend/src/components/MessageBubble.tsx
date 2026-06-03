
import { Message } from '../api/chat';
import ReactMarkdown from 'react-markdown';
import avatarImage from '../Assessts/image.png';

interface Props {
  message: Message;
}

export function MessageBubble({ message }: Props) {
  const isUser = message.sender === 'user';
  
  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div style={{
      display: 'flex',
      flexDirection: isUser ? 'row-reverse' : 'row',
      alignItems: 'flex-end',
      gap: '8px',
      animation: 'slideInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      marginBottom: '8px'
    }}>
      {!isUser && (
        <img 
          src={avatarImage} 
          alt="Avatar" 
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            boxShadow: '0 4px 10px rgba(99,102,241,0.5)',
            flexShrink: 0,
            objectFit: 'cover'
          }} 
        />
      )}
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isUser ? 'flex-end' : 'flex-start',
        maxWidth: '80%'
      }}>
        <div style={
          isUser 
          ? {
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: 'white',
              fontWeight: 500,
              borderRadius: '18px 18px 4px 18px',
              boxShadow: '0 4px 15px rgba(99,102,241,0.4)',
              borderTop: '1px solid rgba(255,255,255,0.2)',
              padding: '10px 14px',
              fontSize: '14px',
              lineHeight: '1.4',
              wordBreak: 'break-word'
            }
          : {
              background: 'rgba(255,255,255,0.07)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '18px 18px 18px 4px',
              color: '#f1f5f9',
              padding: '10px 14px',
              fontSize: '14px',
              lineHeight: '1.4',
              wordBreak: 'break-word'
            }
        }>
          <ReactMarkdown
            components={{
              p: ({node, ...props}) => <p style={{ margin: 0, padding: 0 }} {...props} />,
              ul: ({node, ...props}) => <ul style={{ margin: '4px 0 0 20px', padding: 0 }} {...props} />,
              ol: ({node, ...props}) => <ol style={{ margin: '4px 0 0 20px', padding: 0 }} {...props} />,
              li: ({node, ...props}) => <li style={{ marginBottom: '4px' }} {...props} />,
              a: ({node, ...props}) => <a style={{ color: isUser ? '#fff' : '#a855f7', textDecoration: 'underline' }} {...props} />
            }}
          >
            {message.text}
          </ReactMarkdown>
        </div>
        
        <span style={{
          color: '#475569',
          fontSize: '11px',
          marginTop: '4px',
          padding: '0 4px'
        }}>
          {formattedTime}
        </span>
      </div>
    </div>
  );
}
