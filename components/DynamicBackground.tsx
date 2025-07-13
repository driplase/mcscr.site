import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import MatrixRain from './MatrixRain';

const DynamicBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const blurShapesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create particle system
    const createParticles = () => {
      if (!particlesRef.current) return;
      
      const particles = [];
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-1 h-1 bg-green-400/30 rounded-full';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particlesRef.current.appendChild(particle);
        particles.push(particle);
      }

      // Animate particles with GSAP
      particles.forEach((particle, index) => {
        gsap.to(particle, {
          x: gsap.utils.random(-100, 100),
          y: gsap.utils.random(-100, 100),
          duration: gsap.utils.random(3, 8),
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: index * 0.1
        });

        // Fade in/out effect
        gsap.to(particle, {
          opacity: gsap.utils.random(0.1, 0.4),
          duration: gsap.utils.random(2, 4),
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: index * 0.2
        });
      });
    };

    // Create enhanced hyper blurred gradient shapes
    const createBlurShapes = () => {
      if (!blurShapesRef.current) return;
      
      // Create multiple blurred circles with enhanced animations
      for (let i = 0; i < 8; i++) {
        const blurShape = document.createElement('div');
        blurShape.className = 'absolute rounded-full blur-3xl';
        blurShape.style.width = gsap.utils.random(120, 400) + 'px';
        blurShape.style.height = blurShape.style.width;
        blurShape.style.left = gsap.utils.random(0, 100) + '%';
        blurShape.style.top = gsap.utils.random(0, 100) + '%';
        blurShape.style.background = `radial-gradient(circle, rgba(74, 222, 128, ${gsap.utils.random(0.05, 0.2)}) 0%, transparent 70%)`;
        blurShape.style.filter = 'blur(50px)';
        blurShapesRef.current.appendChild(blurShape);

        // Complex animation sequence for blur shapes
        const tl = gsap.timeline({ repeat: -1, delay: i * 0.3 });
        
        tl.to(blurShape, {
          x: gsap.utils.random(-80, 80),
          y: gsap.utils.random(-80, 80),
          scale: gsap.utils.random(0.7, 1.3),
          opacity: gsap.utils.random(0.4, 0.8),
          duration: gsap.utils.random(10, 18),
          ease: "power2.inOut"
        })
        .to(blurShape, {
          rotation: gsap.utils.random(-180, 180),
          scale: gsap.utils.random(0.5, 1.5),
          duration: gsap.utils.random(8, 15),
          ease: "power3.inOut"
        }, "-=5")
        .to(blurShape, {
          x: gsap.utils.random(-60, 60),
          y: gsap.utils.random(-60, 60),
          opacity: gsap.utils.random(0.2, 0.6),
          duration: gsap.utils.random(12, 20),
          ease: "power1.inOut"
        }, "-=8");
      }

      // Create morphing gradient overlays
      const gradientOverlay1 = document.createElement('div');
      gradientOverlay1.className = 'absolute inset-0 opacity-25';
      gradientOverlay1.style.background = 'radial-gradient(ellipse at 20% 30%, rgba(74, 222, 128, 0.15) 0%, transparent 60%)';
      gradientOverlay1.style.filter = 'blur(80px)';
      blurShapesRef.current.appendChild(gradientOverlay1);

      const gradientOverlay2 = document.createElement('div');
      gradientOverlay2.className = 'absolute inset-0 opacity-20';
      gradientOverlay2.style.background = 'radial-gradient(ellipse at 80% 70%, rgba(74, 222, 128, 0.12) 0%, transparent 60%)';
      gradientOverlay2.style.filter = 'blur(100px)';
      blurShapesRef.current.appendChild(gradientOverlay2);

      const gradientOverlay3 = document.createElement('div');
      gradientOverlay3.className = 'absolute inset-0 opacity-15';
      gradientOverlay3.style.background = 'radial-gradient(ellipse at 50% 50%, rgba(74, 222, 128, 0.08) 0%, transparent 70%)';
      gradientOverlay3.style.filter = 'blur(120px)';
      blurShapesRef.current.appendChild(gradientOverlay3);

      // Complex overlay animations
      gsap.to(gradientOverlay1, {
        scale: 1.3,
        opacity: 0.4,
        duration: 15,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });

      gsap.to(gradientOverlay2, {
        scale: 0.7,
        opacity: 0.3,
        duration: 18,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: 3
      });

      gsap.to(gradientOverlay3, {
        scale: 1.1,
        opacity: 0.25,
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: 6
      });
    };

    // Create corner pulses
    const createCornerPulses = () => {
      const corners = [
        { top: '0%', left: '0%', transform: 'scale(0)' },
        { top: '0%', right: '0%', transform: 'scale(0)' },
        { bottom: '0%', left: '0%', transform: 'scale(0)' },
        { bottom: '0%', right: '0%', transform: 'scale(0)' }
      ];

      corners.forEach((corner, index) => {
        const pulse = document.createElement('div');
        pulse.className = 'absolute w-16 h-16 bg-gradient-to-br from-green-400/10 to-transparent rounded-br-full';
        Object.assign(pulse.style, corner);
        containerRef.current?.appendChild(pulse);

        gsap.to(pulse, {
          scale: 1.5,
          opacity: 0.3,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: index * 0.5
        });
      });
    };

    // Create floating elements
    const createFloatingElements = () => {
      const shapes = ['●', '■', '◆', '▲'];
      shapes.forEach((shape, index) => {
        const element = document.createElement('div');
        element.className = 'absolute text-green-400/20 text-lg';
        element.textContent = shape;
        element.style.left = (20 + index * 20) + '%';
        element.style.top = (30 + index * 10) + '%';
        containerRef.current?.appendChild(element);

        gsap.to(element, {
          y: gsap.utils.random(-50, 50),
          x: gsap.utils.random(-30, 30),
          rotation: gsap.utils.random(-180, 180),
          duration: gsap.utils.random(5, 10),
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: index * 0.8
        });
      });
    };

    // Create wave effect
    const createWaveEffect = () => {
      const wave = document.createElement('div');
      wave.className = 'absolute w-full h-32 bg-gradient-to-b from-green-400/5 to-transparent';
      wave.style.bottom = '0%';
      containerRef.current?.appendChild(wave);

      gsap.to(wave, {
        y: -20,
        opacity: 0.1,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
    };

    // Initialize all effects
    createParticles();
    createBlurShapes();
    createCornerPulses();
    createFloatingElements();
    createWaveEffect();

    // Cleanup function
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden blur-xs">
      <div ref={blurShapesRef} className="absolute inset-0"></div>
      <MatrixRain />
      <div ref={particlesRef} className="absolute inset-0"></div>
    </div>
  );
};

export default DynamicBackground; 