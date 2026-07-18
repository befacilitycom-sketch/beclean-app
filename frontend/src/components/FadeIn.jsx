'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function FadeIn({ children, delay = 0, className = '' }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    });
    
    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  const delayClass = delay > 0 ? `animate-delay-${delay}` : '';

  return (
    <div
      ref={domRef}
      className={`animate-fade-in ${isVisible ? 'is-visible' : ''} ${delayClass} ${className}`}
    >
      {children}
    </div>
  );
}
