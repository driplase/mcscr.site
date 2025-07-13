import React, { useState, useEffect, useRef } from 'react';
import { BASE_COMMANDS } from '../types';
import { getPageContent } from '../constants';
import { useTypewriter, renderTextWithLinks } from '../hooks/useTypewriter.tsx';
import BlinkingCursor from './BlinkingCursor';
import { NavLink, useLocation } from "react-router";

interface TerminalProps {
  command: string;
}

const Terminal: React.FC<TerminalProps> = ({ command }) => {
  const [content, setContent] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [animationReady, setAnimationReady] = useState(false);
  const [isSpedUp, setIsSpedUp] = useState(false);
  const textRef = useRef<HTMLPreElement>(null);
  const isAIGhost = false;
  
  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      setAnimationReady(false);
      try {
        const pageContent = await getPageContent(command);
        setContent(pageContent);
        // Small delay to ensure animation starts properly
        setTimeout(() => {
          setLoading(false);
          setAnimationReady(true);
        }, 100);
      } catch (error) {
        console.error('Failed to load page content:', error);
        setContent(['Error loading page content']);
        setLoading(false);
        setAnimationReady(true);
      }
    };
    
    loadContent();
  }, [command]);

  const fullText = isAIGhost ? content[0] : content.join('\n');
  const typingSpeed = isSpedUp ? 1 : 10;
  const typedText = useTypewriter(isAIGhost || !animationReady ? '' : fullText, typingSpeed);
  
  const isTyping = !isAIGhost && animationReady && typedText.length < fullText.length;

  const handleMouseDown = () => {
    if (isTyping) {
      setIsSpedUp(true);
    }
  };

  const handleMouseUp = () => {
    setIsSpedUp(false);
  };

  // Reconstruct text with links for rendering
  const reconstructTextWithLinks = (animatedText: string, originalText: string) => {
    if (!animatedText) return '';
    
    const originalLines = originalText.split('\n');
    const animatedLines = animatedText.split('\n');
    let result = '';
    let animatedIndex = 0;
    
    for (const originalLine of originalLines) {
      const parts = originalLine.split(/(\[link;[^;]+;[^\]]+\])/g);
      let lineResult = '';
      
      for (const part of parts) {
        if (part.startsWith('[link;') && part.endsWith(']')) {
          // This is a link, extract the display text
          const [, , ...textParts] = part.replace(/\]$/, '').split(';');
          const linkText = textParts.join(';');
          
          // Check if we have enough animated text to show this link
          if (animatedIndex + linkText.length <= animatedText.length) {
            lineResult += part; // Keep the full link format
            animatedIndex += linkText.length;
          } else {
            // Show partial link text
            const remainingChars = animatedText.length - animatedIndex;
            if (remainingChars > 0) {
              lineResult += linkText.substring(0, remainingChars);
              animatedIndex += remainingChars;
            }
            break;
          }
        } else {
          // Regular text
          if (animatedIndex + part.length <= animatedText.length) {
            lineResult += part || '\ufeff';
            animatedIndex += part.length;
          } else {
            const remainingChars = animatedText.length - animatedIndex;
            if (remainingChars > 0) {
              lineResult += (part || '\ufeff').substring(0, remainingChars);
              animatedIndex += remainingChars;
            }
            break;
          }
        }
      }
      
      if (lineResult) {
        result += lineResult + '\n';
      }
      
      if (animatedIndex >= animatedText.length) break;
    }
    
    return result.trim();
  };

  const textToRender = reconstructTextWithLinks(typedText, fullText);

  let location = useLocation();
  const paths = location.pathname.replace(/^\//, '').split('/');

  if (loading) {
    return (
      <main className="flex-grow">
        <nav className="mb-8 sticky top-0 bg-black/80">
          <NavLink
              to={BASE_COMMANDS.HOME}
              className="text-xl hover:bg-green-400 hover:text-black focus:outline-none focus:bg-green-400 focus:text-black px-2 transition-colors duration-150"
          >
              [ index ]
          </NavLink>
          {paths.map((dir, index) => {
            return (
              <div key={index} className="inline-block text-xl">
                /
                <NavLink
                  to={`/${paths.slice(0, index + 1).join('/')}`}
                  className="hover:bg-green-400 hover:text-black focus:outline-none focus:bg-green-400 focus:text-black px-2 transition-colors duration-150"
                  >
                    [ {dir} ]
                </NavLink>
              </div>
            )
          })}
        </nav>
        <div className="text-lg">...</div>
      </main>
    );
  }

  return (
    <main className="flex-grow min-h-full">
      <nav className="pb-8 sticky top-0 bg-black/80">
        <NavLink
            to={BASE_COMMANDS.HOME}
            className="text-xl hover:bg-green-400 hover:text-black focus:outline-none focus:bg-green-400 focus:text-black px-2 transition-colors duration-150"
        >
            [ index ]
        </NavLink>
        {paths.map((dir, index) => {
          return (
            <div key={index} className="inline-block text-xl">
              /
              <NavLink
                to={`/${paths.slice(0, index + 1).join('/')}`}
                className="hover:bg-green-400 hover:text-black focus:outline-none focus:bg-green-400 focus:text-black px-2 transition-colors duration-150"
                >
                  [ {dir} ]
              </NavLink>
            </div>
          )
        })}
      </nav>

{isAIGhost ? (
  <>
  <h2 className="text-lg mb-4">{fullText}</h2>
        </>
      ) : (
        <div 
          className="relative" 
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <pre ref={textRef} className="whitespace-pre-wrap text-lg leading-relaxed break-all">
            {(() => {
              const renderedText = renderTextWithLinks(textToRender, NavLink);
              
              if (isTyping) {
                // Find the last text element and add cursor after it
                const lastElement = renderedText[renderedText.length - 1];
                if (lastElement && lastElement.props.children) {
                  const children = Array.isArray(lastElement.props.children) 
                    ? lastElement.props.children 
                    : [lastElement.props.children];
                  
                  const newChildren = [...children];
                  newChildren.push(
                    <BlinkingCursor />
                  );
                  
                  return [
                    ...renderedText.slice(0, -1),
                    React.cloneElement(lastElement, { key: lastElement.key }, newChildren)
                  ];
                }
              }
              
              return renderedText;
            })()}
          </pre>
        </div>
      )}
    </main>
  );
};

export default Terminal;