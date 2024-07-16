import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);

  useEffect(() => {
    const handleFullScreenChange = () => {
      if (document.fullscreenElement) {
        setIsFullScreen(true);
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('visibilitychange', handleVisibilityChange);
      } else {
        setIsFullScreen(false);
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        // Re-enter full screen if it exits unexpectedly (e.g., using Fn + F11)
        setTimeout(() => {
          if (!document.fullscreenElement && !submitClicked) {
            turnFullScreen();
          }
        }, 1000); // Check every second
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        alert('Tab change detected');
      }
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [submitClicked]);

  const turnFullScreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { // Firefox
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { // Chrome, Safari, and Opera
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { // IE/Edge
      element.msRequestFullscreen();
    }
  };

  const exitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
      document.msExitFullscreen();
    }
  };

  const handleKeyDown = (event) => {
    if (event.altKey && event.key === 'Tab') {
      alert('Alt + Tab detected');
    }
  };

  const handleSubmit = () => {
    setSubmitClicked(true); // Set submit clicked to true
    alert('Submit clicked, exiting full screen.');
    exitFullScreen();
  };

  return (
    <>
      {!isFullScreen && !submitClicked ? (
        <button className='text-white m-[400px]' onClick={turnFullScreen}>Full-Screen</button>
      ) : (
        <button className='text-white m-[400px]' onClick={handleSubmit} disabled={!isFullScreen}>
          Submit
        </button>
      )}
    </>
  );
}

export default App;
