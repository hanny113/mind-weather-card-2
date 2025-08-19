import React, { useMemo } from 'react';
import type { Emotion } from '../types';

interface QuestionDisplayProps {
  emotion: Emotion;
  onReset: () => void;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ emotion, onReset }) => {
  // emotion prop이 바뀔 때마다 questions 배열에서 새로운 질문을 랜덤으로 선택합니다.
  const question = useMemo(() => {
    if (!emotion?.questions?.length) {
      return '질문을 불러올 수 없습니다.';
    }
    const randomIndex = Math.floor(Math.random() * emotion.questions.length);
    return emotion.questions[randomIndex];
  }, [emotion]);

  return (
    <div className="flex flex-col items-center animate-fade-in w-full max-w-2xl">
      <div className="mb-8 text-center bg-white/50 p-4 rounded-xl shadow-md">
        <p className="text-xl text-stone-600">선택한 마음</p>
        <h2 className="text-3xl font-bold text-stone-800">{emotion.name}</h2>
      </div>

      <div
        className={`w-full h-80 rounded-3xl shadow-2xl mb-10 border-8 border-white flex items-center justify-center overflow-hidden transition-all duration-500 p-8 text-center ${emotion.color}`}
      >
        <p className="text-3xl md:text-4xl text-stone-800 font-semibold leading-relaxed tracking-wide">
            {question}
        </p>
      </div>
      
      <button
        onClick={onReset}
        className="mt-12 bg-orange-400 text-white text-2xl font-bold py-3 px-8 rounded-full shadow-md hover:bg-orange-500 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
      >
        다시 고르기
      </button>
    </div>
  );
};

export default QuestionDisplay;
