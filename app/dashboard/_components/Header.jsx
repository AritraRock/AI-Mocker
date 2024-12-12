"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import Link from 'next/link'

export const Header = () => {
  const path = usePathname();

  useEffect(() => {
    console.log(path); // You can remove this if not needed
  }, [path]);

  return (
    <div className="flex p-4 items-center justify-between" style={{ backgroundColor: 'rgb(72, 69, 210)' }}>
      {/* Logo Section */}
      <Image 
  src='/vector-illustration-cool-artificial-intelligence-landing-page-website-template-ai-machine-deep-learning-technology-sci-fi-134758060.webp' 
  alt='Logo' 
  width={40} 
  height={40}  // Make height equal to width to make it round
  style={{ 
    borderRadius: "50%",  // This makes the image fully rounded
    width: "auto", 
    height: "auto" 
  }} 
/>
      
      {/* Dashboard Link */}
      <ul className="hidden md:flex gap-6">
        <li className={`text-white hover:text-blue-300 hover:font-bold hover:scale-105 transition-all duration-200 cursor-pointer ${path === '/dashboard' && 'text-white font-bold'}`}>
          <Link href="/dashboard">Dashboard</Link>
        </li>
      </ul>

      {/* User Button */}
      <UserButton />
    </div>
  );
}
