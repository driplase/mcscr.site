import { useState, useEffect, useRef } from 'react';

// Process text to replace link format with display text for animation
const processTextForAnimation = (text: string) => {
  return text.replace(/\[link;([^;]+);([^\]]+)\]/g, '$2');
};

// Process text to preserve link information for rendering
const processTextForRendering = (text: string) => {
  const lines = text.split('\n');
  return lines.map(line => {
    const parts = line.split(/(\[link;[^;]+;[^\]]+\])/g);
    return parts.map(part => {
      if (part.startsWith('[link;') && part.endsWith(']')) {
        return part; // Keep the full link format for rendering
      }
      return part;
    });
  });
};

export const useTypewriter = (text: string, speed: number = 50) => {
  const [displayText, setDisplayText] = useState('');
  const [currentText, setCurrentText] = useState('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const positionRef = useRef(0);
  const processedTextRef = useRef('');

  useEffect(() => {
    // Only reset if the text content actually changed
    if (text !== currentText) {
      setDisplayText('');
      setCurrentText(text);
      positionRef.current = 0;
      
      if (text) {
        processedTextRef.current = processTextForAnimation(text);
      }
    }

    // Clear existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (text && processedTextRef.current) {
      const typingInterval = setInterval(() => {
        if (positionRef.current < processedTextRef.current.length) {
          setDisplayText(prevText => prevText + processedTextRef.current.charAt(positionRef.current));
          positionRef.current++;
        } else {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
        }
      }, speed);

      intervalRef.current = typingInterval;

      return () => {
        clearInterval(typingInterval);
        intervalRef.current = null;
      };
    }
  }, [text, speed]);

  return displayText;
};

// Helper function to render text with links
export const renderTextWithLinks = (text: string, NavLink: any) => {
  const lines = text.split('\n');
  return lines.map((line, index) => {
    const parts = line.split(/(\[link;\S*;[^\]]+\])/g);
    return (
      <div key={index} className="py-1">
        {parts.map((part, i) => {
          if (part.startsWith('[link;') && part.endsWith(']')) {
            const [, command, ...textParts] = part.replace(/\]$/, '').split(';');
            const linkText = textParts.join(';');
            
            // Check if it's an external link (starts with http:// or https://)
            const isExternal = command.startsWith('http://') || command.startsWith('https://');
            
            if (isExternal) {
              return (
                <a
                  key={i}
                  href={command}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:bg-green-400 hover:text-black focus:outline-none focus:bg-green-400 focus:text-black px-2 transition-colors duration-150"
                >
                  {linkText}
                </a>
              );
            } else {
              return (
                <NavLink
                  key={i}
                  to={command}
                  className="hover:bg-green-400 hover:text-black focus:outline-none focus:bg-green-400 focus:text-black px-2 transition-colors duration-150"
                >
                  {linkText}
                </NavLink>
              );
            }
          }
          return <span key={i}>{part || '\ufeff'}</span>;
        })}
      </div>
    );
  });
};
