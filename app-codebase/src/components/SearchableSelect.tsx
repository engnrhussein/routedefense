"use client";
import React, { useState, useRef, useEffect } from "react";

interface Option {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  id?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  name?: string;
  disabled?: boolean;
}

export default function SearchableSelect({
  id,
  options,
  value,
  onChange,
  placeholder,
  name,
  disabled,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
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

  const filteredOptions = options.filter((o) =>
    o.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative w-full" ref={containerRef}>
      {name && <input type="hidden" name={name} value={value} />}
      <button
        id={id}
        type="button"
        disabled={disabled}
        aria-expanded={isOpen}
        onClick={() => {
          setIsOpen(!isOpen);
          setSearch("");
        }}
        className={`w-full border border-rdink/15 bg-white px-4 py-3 text-base sm:text-sm text-left transition-colors flex justify-between items-center ${
          disabled
            ? "opacity-50 cursor-not-allowed bg-[#fafafa]"
            : "focus:outline-none focus:border-rdaccent cursor-pointer"
        }`}
      >
        <span
          className={`truncate mr-2 ${
            selectedOption ? "text-rdink font-medium" : "text-rdink/40"
          }`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={`w-4 h-4 text-rdink/40 shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-rdink/15 shadow-lg max-h-60 flex flex-col">
          <div className="p-2 border-b border-rdink/10 shrink-0 bg-[#fafafa]">
            <input
              type="text"
              autoFocus
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              className="w-full border border-rdink/15 bg-white px-3 py-2 text-base sm:text-sm text-rdink focus:outline-none focus:border-rdaccent"
              placeholder="Type to filter..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <ul className="overflow-y-auto flex-1 overscroll-contain">
            {filteredOptions.length === 0 ? (
              <li className="px-4 py-3 text-xs sm:text-sm text-rdink/50">
                No matches found
              </li>
            ) : (
              filteredOptions.map((option) => (
                <li key={option.value}>
                  <button
                    type="button"
                    className={`w-full text-left px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                      value === option.value
                        ? "bg-rdink text-white font-semibold"
                        : "text-rdink/80 hover:bg-[#fafafa]"
                    }`}
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                  >
                    {option.label}
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
