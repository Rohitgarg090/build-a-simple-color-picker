'use client';

import React, { useState, useEffect, CSSProperties } from 'react';
import { Palette, Save, Trash2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext'; // Assuming this path
import { hexToRgb, isDarkColor } from '../utils/colorUtils'; // Assuming this path

// Define a custom interface for CSS properties that includes the custom CSS variable
interface CustomCSSProperties extends CSSProperties {
  '--tw-ring-color'?: string;
}

export default function Home() {
  const { colors } = useTheme(); // Assuming useTheme hook provides colors
  const [currentColor, setCurrentColor] = useState('#007bff');
  const [savedColors, setSavedColors] = useState<string[]>([]);

  // Load saved colors from localStorage on initial render
  useEffect(() => {
    const storedColors = localStorage.getItem('savedColors');
    if (storedColors) {
      setSavedColors(JSON.parse(storedColors));
    }
  }, []);

  // Save colors to localStorage whenever savedColors changes
  useEffect(() => {
    localStorage.setItem('savedColors', JSON.stringify(savedColors));
  }, [savedColors]);

  const currentRgb = hexToRgb(currentColor);

  const handleHexInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Basic validation for hex color (e.g., #RRGGBB or RRGGBB)
    const hexRegex = /^#?([0-9A-Fa-f]{3}){1,2}$/;
    if (hexRegex.test(value)) {
      setCurrentColor(value.startsWith('#') ? value : `#${value}`);
    } else if (value === '' || value === '#') {
      setCurrentColor(value); // Allow empty or just '#' for user input
    }
  };

  const handleColorInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentColor(event.target.value);
  };

  const handleSaveColor = () => {
    if (currentColor && !savedColors.includes(currentColor)) {
      setSavedColors([...savedColors, currentColor]);
    }
  };

  const handleSelectSavedColor = (color: string) => {
    setCurrentColor(color);
  };

  const handleDeleteColor = (colorToDelete: string) => {
    setSavedColors(savedColors.filter(color => color !== colorToDelete));
  };

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center p-6"
      style={{ backgroundColor: colors.background }}
    >
      {/* Header Section */}
      <header
        className="w-full max-w-2xl p-4 rounded-lg shadow-md flex items-center justify-center mb-8"
        style={{ backgroundColor: colors.surface, border: "1px solid " + colors.border + "" }}
      >
        <Palette size={28} style={{ color: colors.primary }} className="mr-3" />
        <h1 className="text-3xl font-bold" style={{ color: colors.text }}>
          Forge Color Picker
        </h1>
      </header>

      {/* Current Color Display and Picker Section */}
      <section
        className="w-full max-w-2xl p-6 rounded-lg shadow-md mb-8"
        style={{ backgroundColor: colors.surface, border: "1px solid " + colors.border + "" }}
      >
        <h2 className="text-2xl font-semibold mb-4" style={{ color: colors.text }}>
          Current Color
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Large Color Swatch */}
          <div
            className="w-32 h-32 rounded-lg shadow-inner flex items-center justify-center text-lg font-medium"
            style={{
              backgroundColor: currentColor,
              border: "1px solid " + colors.border + "",
              color: isDarkColor(currentColor) ? '#FFFFFF' : colors.text // Dynamic text color for contrast
            }}
          >
            {/* Display "Dark" or "Light" based on perceived luminance */}
            {isDarkColor(currentColor) ? 'Dark' : 'Light'}
          </div>

          {/* Color Details and Input Controls */}
          <div className="flex-1 flex flex-col gap-3 w-full">
            {/* Hex Input */}
            <div className="flex items-center">
              <label htmlFor="hex-input" className="w-16 font-medium text-sm" style={{ color: colors.text }}>HEX:</label>
              <input
                id="hex-input"
                type="text"
                value={currentColor.toUpperCase()}
                onChange={handleHexInputChange}
                className="flex-1 p-2 rounded-md border text-sm font-mono focus:outline-none focus:ring-2"
                style={{
                  borderColor: colors.border,
                  backgroundColor: colors.background,
                  color: colors.text,
                  '--tw-ring-color': colors.primary // Custom ring color for focus
                } as CustomCSSProperties} /* FIX 1 */
              />
            </div>
            {/* RGB Display */}
            <div className="flex items-center">
              <label className="w-16 font-medium text-sm" style={{ color: colors.text }}>RGB:</label>
              <span
                className="flex-1 p-2 rounded-md border text-sm font-mono"
                style={{ borderColor: colors.border, backgroundColor: colors.background, color: colors.text }}
              >
                {currentRgb ? `rgb(${currentRgb.r}, ${currentRgb.g}, ${currentRgb.b})` : 'Invalid Color'}
              </span>
            </div>
            {/* Color Picker Input and Save Button */}
            <div className="flex items-center gap-3 mt-2">
              <input
                type="color"
                value={currentColor}
                onChange={handleColorInputChange}
                className="w-16 h-10 p-0 border-none cursor-pointer rounded-md overflow-hidden focus:outline-none focus:ring-2"
                style={{
                  WebkitAppearance: 'none', // For Safari
                  MozAppearance: 'none',    // For Firefox
                  appearance: 'none',       // Standard
                  backgroundColor: 'transparent',
                  border: "1px solid " + colors.border + "",
                  '--tw-ring-color': colors.primary // Custom ring color for focus
                } as CustomCSSProperties} /* FIX 2 */
              />
              <button
                onClick={handleSaveColor}
                className="flex-1 flex items-center justify-center px-4 py-2 rounded-md font-medium transition-colors duration-200 hover:opacity-90 focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: colors.primary,
                  color: colors.surface,
                  border: "1px solid " + colors.primary + "",
                  '--tw-ring-color': colors.primary
                } as CustomCSSProperties} /* FIX 3 */
              >
                <Save size={18} className="mr-2" /> Save Color
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Saved Colors List Section */}
      <section
        className="w-full max-w-2xl p-6 rounded-lg shadow-md"
        style={{ backgroundColor: colors.surface, border: "1px solid " + colors.border + "" }}
      >
        <h2 className="text-2xl font-semibold mb-4" style={{ color: colors.text }}>
          Saved Colors
        </h2>
        {savedColors.length === 0 ? (
          <p className="text-center text-gray-500" style={{ color: colors.text }}>No colors saved yet. Save your first color!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedColors.map((color, index) => (
              <div
                key={index} // Using index as key is generally discouraged but acceptable here as list order doesn't change and items are unique by color.
                className="flex items-center p-3 rounded-md shadow-sm group"
                style={{ backgroundColor: colors.background, border: "1px solid " + colors.border + "" }}
              >
                {/* Small Color Swatch - clickable to set as current color */}
                <div
                  className="w-8 h-8 rounded-full mr-3 cursor-pointer transition-transform duration-100 hover:scale-105"
                  style={{ backgroundColor: color, border: "1px solid " + colors.border + "" }}
                  onClick={() => handleSelectSavedColor(color)}
                  title={`Set ${color.toUpperCase()} as current color`}
                ></div>
                {/* Hex Value */}
                <span className="flex-1 font-mono text-sm" style={{ color: colors.text }}>
                  {color.toUpperCase()}
                </span>
                {/* Delete Button */}
                <button
                  onClick={() => handleDeleteColor(color)}
                  className="p-1 rounded-full text-red-500 hover:bg-red-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-300"
                  title="Delete color"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
