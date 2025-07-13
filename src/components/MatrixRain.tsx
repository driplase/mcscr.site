import React, { useEffect, useRef } from 'react';

interface MatrixCharacter {
  char: string;
  x: number;
  y: number;
  speed: number;
  opacity: number;
  fadeSpeed: number;
}

const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters (binary + Japanese)
    const characters = '０１２３４５６７８９ａｂｃｄｅｆｇｈｉｊｋｍｎｏｐｌｑｒｓｔｕｖｗｘｙｚＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    // Matrix rain settings
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: MatrixCharacter[] = [];

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops.push({
        char: characters[Math.floor(Math.random() * characters.length)],
        x: i * fontSize,
        y: Math.random() * canvas.height,
        speed: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.5,
        fadeSpeed: Math.random() * 0.02 + 0.01
      });
    }

    // Animation loop
    const animate = () => {
      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set text properties
      ctx.font = `${fontSize}px monospace`;
      ctx.textAlign = 'center';

      // Draw and update drops
      drops.forEach((drop, index) => {
        // Draw character with glow effect
        ctx.fillStyle = `rgba(74, 222, 128, ${drop.opacity})`;
        ctx.shadowColor = 'rgba(74, 222, 128, 0.8)';
        ctx.shadowBlur = 5;
        ctx.fillText(drop.char, drop.x, drop.y);
        
        // Reset shadow
        ctx.shadowBlur = 0;

        // Update position
        drop.y += drop.speed;
        
        // Randomly change character during fall
        if (Math.random() < 0.1) { // 10% chance per frame
          drop.char = characters[Math.floor(Math.random() * characters.length)];
        }
        
        // Fade out effect
        drop.opacity -= drop.fadeSpeed;

        // Reset drop when it goes off screen or fades out
        if (drop.y > canvas.height || drop.opacity <= 0) {
          drop.y = Math.random() * canvas.height; // Random spawn above screen
          drop.opacity = Math.random() * 0.5 + 0.5;
          drop.char = characters[Math.floor(Math.random() * characters.length)];
          drop.speed = Math.random() * 2 + 1;
          drop.fadeSpeed = Math.random() * 0.012 + 0.006;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ opacity: 0.3 }}
    />
  );
};

export default MatrixRain; 