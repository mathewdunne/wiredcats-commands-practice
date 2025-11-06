import { Trophy, X } from 'lucide-react';

interface CongratulationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CongratulationsModal({ isOpen, onClose }: CongratulationsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-70"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-gray-800 border-2 border-yellow-400 rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        {/* Content */}
        <div className="text-center">
          {/* Trophy icon */}
          <div className="flex justify-center mb-4">
            <div className="bg-yellow-400 rounded-full p-4">
              <Trophy size={48} className="text-gray-900" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-yellow-400 mb-3">
            Congratulations!
          </h2>

          {/* Message */}
          <p className="text-gray-200 text-lg mb-6">
            You've completed all 4 levels! 🎉
          </p>

          <p className="text-gray-300 text-base mb-8">
            You've mastered the basics of command group creation. Great job, Wiredcat!
          </p>

          {/* Close button */}
          <button
            onClick={onClose}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Awesome!
          </button>
        </div>
      </div>
    </div>
  );
}
