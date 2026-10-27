"use client";
import React, { useState, useRef, useEffect } from "react";

interface Option {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  name?: string;
  disabled?: boolean;
}

export default function SearchableSelect({ options, value, onChange, placeholder, name, disabled }: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(o => o.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const filteredOptions = options.filter(o => o.label.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="relative w-full" ref={containerRef}>
      {name && <input type="hidden" name={name} value={value} />}
      <button
        type="button"
        disabled={disabled}
        onClick={() => { setIsOpen(!isOpen); setSearch(""); }}
        className={`w-full border border-[#E5E7EB] bg-white px-4 py-3 sm:py-3.5 text-sm text-left transition-colors flex justify-between items-center ${
          disabled ? 'opacity-50 cursor-not-allowed bg-slate-50' : 'focus:outline-none focus:border-[#E63946]'
        }`}
      >
        <span className={`truncate mr-2 ${selectedOption ? "text-[#111111] font-medium" : "text-[#888888]"}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg 
          className={`w-4 h-4 text-[#888888] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-[#E5E7EB] shadow-xl max-h-60 flex flex-col rounded-b-md">
          <div className="p-2 border-b border-[#E5E7EB] shrink-0 bg-[#FAFAFA]">
            <input
              type="text"
              autoFocus
              className="w-full border border-[#E5E7EB] bg-white px-3 py-2 text-sm focus:outline-none focus:border-[#E63946]"
              placeholder="Type to filter..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <ul className="overflow-y-auto flex-1 overscroll-contain">
            {filteredOptions.length === 0 ? (
              <li className="px-4 py-3 text-xs sm:text-sm text-[#888888]">No matches found</li>
            ) : (
              filteredOptions.map((option) => (
                <li
                  key={option.value}
                  className={`px-4 py-2.5 text-xs sm:text-sm cursor-pointer transition-colors ${
                    value === option.value ? 'bg-[#111111] text-white font-semibold' : 'text-[#333333] hover:bg-[#F3F4F6]'
                  }`}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                >
                  {option.label}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
