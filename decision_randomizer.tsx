import React, { useState } from 'react';
import { Shuffle, Plus, X } from 'lucide-react';

export default function DecisionRandomizer() {
  const [options, setOptions] = useState(['Option 1', 'Option 2', 'Option 3']);
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const addOption = () => {
    if (inputValue.trim()) {
      setOptions([...options, inputValue.trim()]);
      setInputValue('');
    }
  };

  const removeOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const randomize = () => {
    if (options.length === 0) return;
    
    setIsAnimating(true);
    setResult(null);
    
    // Shuffle animation
    let count = 0;
    const shuffleInterval = setInterval(() => {
      setResult(options[Math.floor(Math.random() * options.length)]);
      count++;
      
      if (count > 15) {
        clearInterval(shuffleInterval);
        const finalChoice = options[Math.floor(Math.random() * options.length)];
        setResult(finalChoice);
        setIsAnimating(false);
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Decision Time</h1>
          <p className="text-purple-300">Let fate decide for you</p>
        </div>

        {/* Result Display */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-6 border border-white/20 min-h-32 flex items-center justify-center">
          {result ? (
            <div className={`text-center transition-all duration-300 ${isAnimating ? 'scale-95 opacity-70' : 'scale-100 opacity-100'}`}>
              <div className="text-sm text-purple-300 mb-2">The choice is...</div>
              <div className="text-3xl font-bold text-white break-words">{result}</div>
            </div>
          ) : (
            <div className="text-gray-400 text-center">
              Add options below and hit shuffle
            </div>
          )}
        </div>

        {/* Randomize Button */}
        <button
          onClick={randomize}
          disabled={options.length === 0 || isAnimating}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-semibold text-lg mb-6 hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
        >
          <Shuffle className={isAnimating ? 'animate-spin' : ''} size={24} />
          {isAnimating ? 'Deciding...' : 'Shuffle'}
        </button>

        {/* Add Option Input */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-4">
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addOption()}
              placeholder="Add a new option..."
              className="flex-1 bg-white/20 text-white placeholder-gray-400 px-4 py-2 rounded-lg border border-white/30 focus:outline-none focus:border-purple-400"
            />
            <button
              onClick={addOption}
              className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-lg transition-colors"
            >
              <Plus size={24} />
            </button>
          </div>

          {/* Options List */}
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {options.map((option, index) => (
              <div
                key={index}
                className="bg-white/20 rounded-lg px-4 py-3 flex items-center justify-between group hover:bg-white/30 transition-colors"
              >
                <span className="text-white">{option}</span>
                <button
                  onClick={() => removeOption(index)}
                  className="text-gray-400 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>

          {options.length === 0 && (
            <div className="text-center text-gray-400 py-8">
              No options yet. Add some above!
            </div>
          )}
        </div>

        {/* Option Count */}
        <div className="text-center text-purple-300 text-sm">
          {options.length} {options.length === 1 ? 'option' : 'options'} available
        </div>
      </div>
    </div>
  );
}