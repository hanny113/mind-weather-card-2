import React from 'react';
import type { Emotion } from '../types';

interface EmotionSelectorProps {
  emotions: Emotion[];
  onEmotionSelect: (emotion: Emotion) => void;
}

// Sound effect URL - Changed to a more energetic fanfare sound
const clickSoundUrl = 'https://cdn.pixabay.com/audio/2021/08/04/audio_12b0c7443c.mp3';
let audio: HTMLAudioElement | null = null;
try {
  // Create a single audio element to be reused
  audio = new Audio(clickSoundUrl);
} catch (e) {
  console.error("Could not create audio element for sound effects.", e);
}

const EmotionSelector: React.FC<EmotionSelectorProps> = ({ emotions, onEmotionSelect }) => {

  const handleCardClick = (emotion: Emotion) => {
    // Play sound effect
    if (audio) {
      audio.currentTime = 0; // Rewind to the start in case it's played again quickly
      audio.play().catch(error => {
        // Autoplay might be prevented by the browser.
        console.error("Audio play failed:", error);
      });
    }

    // Call the original handler to switch views
    onEmotionSelect(emotion);
  };

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 w-full">
      {emotions.map((emotion) => (
        <div
          key={emotion.id}
          className={`group cursor-pointer p-4 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-in-out border-4 border-transparent hover:border-white flex flex-col items-center justify-center text-center ${emotion.color}`}
          onClick={() => handleCardClick(emotion)}
          style={{ minHeight: '140px' }}
        >
          <span className="text-4xl mb-2 transition-transform duration-300 group-hover:scale-125">{emotion.emoji}</span>
          <h3 className="text-xl font-bold text-stone-800">{emotion.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default EmotionSelector;