import React, { useState, useEffect } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import './VirtualKeyboard.css';

const hindiLayout = {
  default: [
    "अ आ इ ई उ ऊ ए ऐ ओ औ ऍ {bksp}",
    "ऋ ॠ ऌ ॡ ऍ क ख ग घ ङ च छ ज झ {tab}",
    "ट ठ ड ढ ण त थ द ध न प फ {shift}",
    "ब भ म य र ल व श ष स ह {accept} {space} {cancel}"
  ],
  shift: [
    "क़ ख़ ग़ ज़ ड़ ढ़ फ़ य़ ॲ {bksp}",
    "ॐ ऽ । ॰ ँ ः ं {tab}",
    "ि ी ु ू ृ ॄ ॅ ॉ ॆ ॊ {shift}",
    "ा ो ौ ं ँ ि ी {accept} {space} {cancel}"
  ]
};

const VirtualKeyboard = ({ onChange }) => {
  const [layoutName, setLayoutName] = useState('default');
  const [keyboardWidth, setKeyboardWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setKeyboardWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleShift = () => {
    const newLayoutName = layoutName === 'default' ? 'shift' : 'default';
    setLayoutName(newLayoutName);
  };

  return (
    <div className="keyboard-container" style={{ width: keyboardWidth }}>
      <Keyboard
        layout={hindiLayout}
        layoutName={layoutName}
        onChange={onChange}
        onKeyPress={(button) => {
          if (button === '{shift}' || button === '{lock}') handleShift();
        }}
      />
    </div>
  );
};

export default VirtualKeyboard;