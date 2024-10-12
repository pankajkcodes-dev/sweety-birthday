import React, { useState, useEffect } from 'react';
import {
  Heart,
  Cake,
  Gift,
  Music,
  Sparkles,
  Volume2,
  VolumeX,
} from 'lucide-react';
import ReactConfetti from 'react-confetti';

function App() {
  const [showWishes, setShowWishes] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  const toggleMusic = () => {
    const audio = document.getElementById('bgMusic') as HTMLAudioElement;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 to-purple-300 flex flex-col items-center justify-center p-4 overflow-hidden">
      <audio id="bgMusic" loop>
        <source
          src="https://upsoftech.com/7dev-mode/sweety/happy-birthday-to-you-traditional-song.mp3"
          type="audio/mpeg"
        />
        Your browser does not support the audio element.
      </audio>

      <button
        onClick={toggleMusic}
        className="fixed top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300"
      >
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>

      {showConfetti && (
        <ReactConfetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          numberOfPieces={200}
          recycle={false}
          colors={['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF']}
          confettiSource={{
            x: windowDimensions.width / 2,
            y: windowDimensions.height / 2,
          }}
          drawShape={(ctx) => {
            ctx.beginPath();
            for (let i = 0; i < 5; i++) {
              const angle = 0.35 * i;
              const x = (0.2 + 1.5 * angle) * Math.cos(angle);
              const y = (0.2 + 1.5 * angle) * Math.sin(angle);
              ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fill();
          }}
        />
      )}

      <header className="text-center mb-8 relative">
        <h1 className="text-5xl font-bold text-purple-800 mb-2 animate-bounce">
          Happy Birthday, Bestie!
        </h1>
        <p className="text-2xl text-purple-600">
          Celebrating you today and always
        </p>
        <Sparkles
          className="absolute -top-4 -left-4 text-yellow-400 animate-pulse"
          size={24}
        />
        <Sparkles
          className="absolute -bottom-4 -right-4 text-yellow-400 animate-pulse"
          size={24}
        />
      </header>

      <main className="max-w-2xl w-full bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
        <div className="relative h-80 overflow-hidden">
          <img
            src="https://media.licdn.com/dms/image/v2/D5635AQEYLvpsOfve6g/profile-framedphoto-shrink_800_800/profile-framedphoto-shrink_800_800/0/1716275408698?e=1729296000&v=beta&t=IDdLW1WzFhGme3sZG-S3Y-ezBT5TFpnudQiJ919PhcE"
            alt="Birthday celebration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <img
              src="https://media.licdn.com/dms/image/v2/D5635AQEYLvpsOfve6g/profile-framedphoto-shrink_800_800/profile-framedphoto-shrink_800_800/0/1716275408698?e=1729296000&v=beta&t=IDdLW1WzFhGme3sZG-S3Y-ezBT5TFpnudQiJ919PhcE"
              alt="Best Friend"
              className="w-40 h-40 rounded-full border-4 border-white shadow-lg animate-spin-slow"
            />
          </div>
        </div>

        <div className="p-6 text-center">
          <p className="text-lg text-gray-700 mb-4">
            On this special day, I want to celebrate the amazing person you are
            and the incredible friendship we share.
          </p>
          <button
            onClick={() => {
              setShowWishes(!showWishes);
              triggerConfetti();
            }}
            className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition duration-300 transform hover:scale-110"
          >
            {showWishes ? 'Hide' : 'Show'} Birthday Wishes
          </button>
        </div>

        {showWishes && (
          <div className="p-6 bg-purple-100 text-purple-800 animate-fade-in">
            <ul className="space-y-2">
              <li className="flex items-center">
                <Heart className="mr-2 text-red-500" /> Wishing you a day filled
                with love and laughter
              </li>
              <li className="flex items-center">
                <Cake className="mr-2 text-yellow-500" /> May your cake be as
                sweet as you are
              </li>
              <li className="flex items-center">
                <Gift className="mr-2 text-green-500" /> Hope you're showered
                with amazing gifts
              </li>
              <li className="flex items-center">
                <Music className="mr-2 text-blue-500" /> Dance the night away
                and make beautiful memories
              </li>
            </ul>
          </div>
        )}
      </main>

      <div className="mt-8 flex space-x-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="cake-container">
            <div className="cake">
              <div className="candle">
                <div className="flame"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <footer className="mt-8 text-purple-800 text-center">
        <p>Made with ❤️ for my best friend</p>
      </footer>
    </div>
  );
}

export default App;
