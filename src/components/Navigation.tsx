"use client"; 

import { useState } from "react";
import Image from "next/image";
import Link from 'next/link';
import NavLogo from '../../public/assets/logo.png';
import { Zilla_Slab } from 'next/font/google';

const brandFont = Zilla_Slab({ 
  subsets: ['latin'], 
  weight: ['700'], 
  style: ['normal']
});

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  
  const menuItems = ['Home', 'Menu', 'Gallery', 'About'];

  return (
    <header className="sticky top-0 z-50 bg-[#1E1E1E]/95 backdrop-blur-md text-white p-3 md:px-10 shadow-xl border-b border-white/10">
      <div className="flex justify-between items-center max-w-[1600px] mx-auto w-full">
        
        <Link href="/" className="flex items-center group cursor-pointer">
          <Image 
            src={NavLogo}
            alt="Teffie's Smoky BBQ Logo" 
            width={65}
            height={65}
             className="transition-transform duration-200 active:scale-115 cursor-pointer"
          />
          <h1 className={`${brandFont.className} ml-4 text-2xl uppercase tracking-widest font-bold`}>
            <span className="bg-clip-text text-transparent bg-stone-300">
              Teffie&apos;s Smoky BBQ
            </span>
          </h1>
        </Link>

        {/* Desktop Navigation (Hidden on mobile) */}
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-6 lg:space-x-10">
            {menuItems.map((item) => (
              <li key={item}>
                <Link 
                  href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                  className="relative text-sm uppercase tracking-widest font-medium hover:text-[#F2442E] transition-colors duration-300 group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F2442E] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
            <li>

              <Link 
                href="/order" 
                className="bg-[#F2442E] text-white px-6 py-2 rounded-md font-bold shadow-lg hover:shadow-[#F2442E]/50 hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
              >
                Order Now
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Button (Hidden on desktop) */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-3xl focus:outline-none z-20">
            {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden absolute top-[77px] left-0 w-full bg-[#1E1E1E]/95 p-6 flex flex-col space-y-6 text-center shadow-2xl">
          {menuItems.map((item) => (
            <Link 
              key={item}
              href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
              onClick={() => setIsOpen(false)} 
              className="text-xl uppercase py-2 hover:bg-[#F2442E]/20 rounded transition-colors"
            >
              {item}
            </Link>
          ))}
           <Link 
            href="/order" 
            onClick={() => setIsOpen(false)} 
            className="bg-[#F2442E] text-white px-6 py-3 mt-4 rounded-full font-bold shadow-lg hover:bg-amber-600 transition duration-300"
          >
            Order Now
          </Link>
        </nav>
      )}
    </header>
  );
}
