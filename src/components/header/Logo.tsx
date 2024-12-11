import Link from 'next/link';
import React from 'react';
import "./style.css";

interface LogoProps {
  size?: string;
  className?: string;
  logoClassName?: string;
  textClassName?: string;
}


export default function Logo({ 
  size = '300px', 
  className = '', 
  logoClassName = '', 
  textClassName = '' 
}: LogoProps) {
  return (
    <Link href={'/'} className={`group flex items-center ${className}`}>
      <div 
        style={{ width: size, height: size }}
        className={`
          logo relative cursor-pointer transition-transform duration-300 ease-in-out group-hover:scale-105
          before:content-[''] before:absolute before:top-1/2 before:left-1/2 
          before:transform before:-translate-x-1/2 before:-translate-y-1/2 
          before:size-[110%] before:bg-logo-gradient before:-z-[2] 
          before:blur-[10px] before:animate-gradient-move

          after:content-[''] after:absolute after:top-1/2 after:left-1/2 
          after:transform after:-translate-x-1/2 after:-translate-y-1/2 
          after:size-[110%] after:bg-logo-gradient after:-z-[1] 
          after:animate-gradient-move
          ${logoClassName}
        `}
      />
      <h1 className={`font-bold ml-3 text-4xl mb-3 ${textClassName}`}>Graphix</h1>
    </Link>
  );
}
