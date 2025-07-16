import React, { useState, useEffect } from 'react';
import clicksound from'./click.mp3'
import './calculator.css';

const Calculator = () => {
    const PlayClickSound= () =>{
    const audio= new Audio(clicksound);
    audio.play();
};
  
  const [input, setInput] = useState('');
  const [activeButton,setActiveButton] =useState(null);
  const [isDark, setIsDark] =useState(() =>{
    const storedTheme = localStorage.getItem('theme');
    return storedTheme ? storedTheme ==='dark': true;

  });

  // Handles button and key events
  const handleClick = (value) => {
    setActiveButton(value);
    PlayClickSound();
    setTimeout(() => setActiveButton(null),100);
    switch (value) {
      case 'C':
        setInput('');
        break;
      case '⌫':
        setInput((prev) => prev.slice(0, -1));
        break;
      case '=':
        try {
          setInput(eval(input).toString());
        } catch {
          setInput('Error');
        }
        break;
      default:
        setInput((prev) => prev + value);
    }
  };

  
  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark':'light');
  }, [isDark]);

    const handleKeyDown = (event) => {
        const key =event.key;
        console.log(event.key);
        setActiveButton(key);
    
        setTimeout(()=>setActiveButton(null),100);
        PlayClickSound();
      

      // Allow numbers and operators
      if (/[\d.+\-*/()]/.test(key)) {
        setInput((prev) => prev + key);
      }
      // Evaluate expression on Enter
      else if (key === 'Enter') {
        try {
          setInput(eval(input).toString());
        } catch {
          setInput('Error');
        }
      }
      // Backspace removes last character
      else if (key === 'Backspace') {
        setInput((prev) => prev.slice(0, -1));
      }
      // Clear input on 'c' or 'C'
      else if (key.toLowerCase() === 'c') {
        setInput('');
      }
    };

    useEffect(() => {

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }); 

  const buttons = [
    'C', '⌫', '(', ')',
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+'
  ];

  return (
    <div className={"calculator ${isDark ? 'dark' : 'light'}"}>
        <div className="theme-toggle">
  <label className="switch">
    <input
      type="checkbox"
      checked={!isDark}
      onChange={() => setIsDark(!isDark)}
    />
    <span className="slider"></span>
  </label>
  <span className="mode-label">
    {isDark ? '🌙 Dark Mode' : '🌞 Light Mode'}
  </span>
</div>
    

      <div className="display">{input || '0'}</div>
      <div className="buttons">
        {buttons.map((btn, index) => (
            <button
  key={index}
  onClick={() => handleClick(btn)}
  className={`${
    btn === '=' ? 'equals' :
    btn === 'C' ? 'clear' :
    btn === '⌫' ? 'backspace' : ''
  } ${activeButton === btn ? 'pressed' : ''}`} 
  >
  {btn}
  </button>
          
        ))}
      </div>
    </div>
  );
};

export default Calculator;

  
                