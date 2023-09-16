import React, { useState, useEffect } from 'react';

export const BottomDragSheet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dragset, setDragset] = useState(false);
  const [dragYAxis, setDragYAxis] = useState(0);
  const [dragYsetOff, setDragYsetOff] = useState(0);

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === 'ArrowDown' && isOpen) {
        setIsOpen(false);
      } else if (e.key === 'ArrowUp' && !isOpen) {
        setIsOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [isOpen]);

  const togglebtn = () => {
    setIsOpen(!isOpen);
  };

  const mouseDown = (e) => {
    setDragset(true);
    setDragYAxis(e.clientY);
    setDragYsetOff(e.clientY - e.currentTarget.getBoundingClientRect().top);
  };

  const mouseMoving = (e) => {
    if (dragset) {
      const newYaxis = e.clientY - dragYAxis;
      const maxYaxis = window.innerHeight - e.currentTarget.clientHeight;
      const axisSettingOff = Math.min(maxYaxis, Math.max(0, newYaxis + dragYsetOff));
      e.currentTarget.style.transform = `translateY(${axisSettingOff}px)`;
    }
  };

  const mouseUp = () => {
    setDragset(false);
  };

  const styling = {
    height: isOpen ? '100%' : '50%',
    transform: isOpen ? 'translateY(0%)' : 'translateY(100%)',
  };

  return <div className="sheet-parent">
      <button
        className={`toggle-button ${isOpen ? 'open' : ''}`}
        onClick={togglebtn}
      >
        {isOpen ? 'Close' : 'Open'}
      </button>
      <div
        className={`bottom-sheet ${isOpen ? 'open' : ''}`}
        style={styling}
        onMouseDown={mouseDown}
        onMouseMove={mouseMoving}
        onMouseUp={mouseUp}
        onMouseLeave={mouseUp}
      >
        <div className="bottom-para">
          <h2>Bottom Sheet ....</h2>
          <p>Features</p>
          <ul>
            <li>On clicking arrow up &#8593; and arrow down &#8595; keys to open and close</li>
            <li>Drag using mouseup and mouse down from halfway to full way and vice-versa</li>
            <li>Closing works with close button only</li>
            <li>Used functional components like hooks example useState and useEffect</li>
            <li>Used CSS transitions for achieving the drag feature</li>
            <li>Used keyframes for glowing text using text-shadow of CSS</li>
          </ul>
        </div>
      </div>
    </div>
  
};


