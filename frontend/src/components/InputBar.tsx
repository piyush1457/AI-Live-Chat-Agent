import { useState, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';

interface Props {
  onSend: (text: string) => void;
  isLoading: boolean;
}

export function InputBar({ onSend, isLoading }: Props) {
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSend = () => {
    if (text.trim() && !isLoading) {
      onSend(text);
      setText('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{
      padding: '16px 20px',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      background: 'rgba(0,0,0,0.2)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      gap: '12px',
      alignItems: 'flex-end'
    }}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Type a message..."
        disabled={isLoading}
        rows={Math.min(Math.max(text.split('\n').length, 1), 4)}
        style={{
          flex: 1,
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '14px',
          color: '#f1f5f9',
          padding: '12px 16px',
          fontSize: '14px',
          resize: 'none',
          outline: 'none',
          borderColor: isFocused ? 'rgba(99,102,241,0.6)' : 'rgba(255,255,255,0.1)',
          boxShadow: isFocused ? '0 0 0 3px rgba(99,102,241,0.15)' : 'none',
          transition: 'all 0.2s ease',
          fontFamily: 'inherit'
        }}
      />
      <button
        onClick={handleSend}
        disabled={isLoading || !text.trim()}
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          boxShadow: '0 4px 15px rgba(99,102,241,0.4)',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: isLoading || !text.trim() ? 'not-allowed' : 'pointer',
          opacity: isLoading || !text.trim() ? 0.4 : 1,
          transition: 'all 0.2s ease',
          transform: 'scale(1)',
          flexShrink: 0
        }}
        onMouseOver={(e) => {
          if (!isLoading && text.trim()) {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(99,102,241,0.6)';
          }
        }}
        onMouseOut={(e) => {
          if (!isLoading && text.trim()) {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(99,102,241,0.4)';
          }
        }}
        onMouseDown={(e) => {
          if (!isLoading && text.trim()) e.currentTarget.style.transform = 'scale(0.95)';
        }}
        onMouseUp={(e) => {
          if (!isLoading && text.trim()) e.currentTarget.style.transform = 'scale(1.05)';
        }}
      >
        {isLoading ? (
          <div style={{
            width: '16px',
            height: '16px',
            border: '2px solid rgba(255,255,255,0.3)',
            borderTopColor: 'white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
        ) : (
          <Send size={16} color="white" style={{ marginLeft: '-2px' }} />
        )}
      </button>
    </div>
  );
}
