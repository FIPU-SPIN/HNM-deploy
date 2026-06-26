"use client";

export default function Burger({ isOpen, onClick, className = "" }) {
  return (
    <div 
      className={`burger ${isOpen ? "active" : ""} ${className}`}
      onClick={onClick}
      aria-label="Izbornik"
      aria-expanded={isOpen}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}