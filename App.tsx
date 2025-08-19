import React, { useState } from 'react';
import type { Emotion } from './types';
import { EMOTIONS } from './constants';
import EmotionSelector from './components/ImageSelector';
import QuestionDisplay from './components/QuestionDisplay';
import Footer from './components/Footer';

function App(): React.ReactNode {
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);

  const handleEmotionSelect = (emotion: Emotion) => {
    setSelectedEmotion(emotion);
  };

  const handleReset = () => {
    setSelectedEmotion(null);
  };

  return (
    <div className="bg-[#FFF9F0] text-stone-800 min-h-screen flex flex-col items-center justify-center p-4 selection:bg-orange-200">
      <main className="w-full max-w-6xl flex-grow flex flex-col items-center justify-center text-center px-4">
        {!selectedEmotion ? (
          <>
            <h1 className="text-5xl md:text-6xl font-bold text-orange-500 mb-4 tracking-wide">오늘의 마음 날씨</h1>
            <p className="text-xl md:text-2xl text-stone-600 mb-12">현재 감정과 가장 가까운 카드를 선택해주세요.</p>
            <EmotionSelector emotions={EMOTIONS} onEmotionSelect={handleEmotionSelect} />
          </>
        ) : (
          <QuestionDisplay
            emotion={selectedEmotion}
            onReset={handleReset}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;