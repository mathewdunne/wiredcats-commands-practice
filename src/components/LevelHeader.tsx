import { Level } from '../types';
import { ChevronLeft, ChevronRight, CheckCircle, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import WiredcatsLogo from '../assets/WiredcatsVectorLogo.png';

interface LevelHeaderProps {
  level: Level;
  currentLevelIndex: number;
  totalLevels: number;
  onPrevLevel: () => void;
  onNextLevel: () => void;
  isComplete?: boolean;
}

export function LevelHeader({
  level,
  currentLevelIndex,
  totalLevels,
  onPrevLevel,
  onNextLevel,
  isComplete = false,
}: LevelHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-800 border-b-2 border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <img src={WiredcatsLogo} alt="Wiredcats Logo" className="w-6 h-6" />
            <h1 className="text-2xl font-bold text-white">{level.title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-100 text-md">
              Level {currentLevelIndex + 1} of {totalLevels}
            </span>
            {isComplete && (
              <CheckCircle className="text-green-500" size={20} />
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/')}
            className="px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-1"
            title="Back to Home"
          >
            <Home size={18} />
            Home
          </button>
          <button
            onClick={onPrevLevel}
            disabled={currentLevelIndex === 0}
            className="px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
          >
            <ChevronLeft size={18} />
            Previous
          </button>
          <button
            onClick={onNextLevel}
            disabled={currentLevelIndex === totalLevels - 1}
            className="px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
          >
            Next
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <p className="text-gray-300 mt-2 text-sm">{level.description}</p>
    </div>
  );
}
