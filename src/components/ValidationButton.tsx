import { ValidationResult } from '../types';
import { CheckCircle, XCircle, RefreshCw } from 'lucide-react';

interface ValidationButtonProps {
  onCheck: () => void;
  onReset: () => void;
  validationResult: ValidationResult | null;
}

export function ValidationButton({ onCheck, onReset, validationResult }: ValidationButtonProps) {
  return (
    <div className="bg-gray-800 border-t-2 border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          {validationResult && (
            <div
              className={`
                px-4 py-3 rounded-lg flex items-center gap-3
                ${validationResult.success ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}
              `}
            >
              {validationResult.success ? (
                <CheckCircle size={20} className="flex-shrink-0" />
              ) : (
                <XCircle size={20} className="flex-shrink-0" />
              )}
              <span className="font-medium">{validationResult.message}</span>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={onReset}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
          >
            <RefreshCw size={18} />
            Reset
          </button>
          <button
            onClick={onCheck}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors font-semibold flex items-center gap-2"
          >
            <CheckCircle size={18} />
            Check Solution
          </button>
        </div>
      </div>
    </div>
  );
}
