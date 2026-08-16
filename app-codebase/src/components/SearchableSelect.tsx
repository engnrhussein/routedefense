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
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter(o => o.label.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="relative" ref={containerRef}>
      {name && <input type="hidden" name={name} value={value} />}
      <button
        type="button"
        disabled={disabled}
        onClick={() => { setIsOpen(!isOpen); setSearch(""); }}
        className={`w-full border border-[#CFC6B8] bg-white px-4 py-3 text-sm text-left transition-colors flex justify-between items-center ${disabled ? 'opacity-50 cursor-not-allowed' : 'focus:outline-none focus:border-[#E63946]'}`}
      >
        <span className={selectedOption ? "text-[#1A1A1A]" : "text-[#888888]"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-[#CFC6B8] shadow-lg max-h-60 flex flex-col">
          <div className="p-2 border-b border-[#CFC6B8] shrink-0">
            <input
              type="text"
              autoFocus
              className="w-full border border-[#CFC6B8] bg-white px-3 py-2 text-sm focus:outline-none focus:border-[#E63946]"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <ul className="overflow-y-auto flex-1">
            {filteredOptions.length === 0 ? (
              <li className="px-4 py-3 text-sm text-[#888888]">No results found</li>
            ) : (
              filteredOptions.map((option) => (
                <li
                  key={option.value}
                  className={`px-4 py-2 text-sm cursor-pointer hover:bg-[#E8DFD4] ${value === option.value ? 'bg-[#E8DFD4] font-semibold text-[#111111]' : 'text-[#4A4A4A]'}`}
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
