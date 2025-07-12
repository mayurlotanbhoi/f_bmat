
import { FaRegSadTear } from 'react-icons/fa';

type NoDataProps = {
  message?: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
};

export default function NoData({
  message = "No data found",
  actionText,
  onAction,
  className = ""
}: NoDataProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center min-h-[100vh] py-12 px-4 bg-white rounded-xl shadow-md ${className}`}
      aria-live="polite"
    >
      <div className="mb-4 animate-bounce-slow">
        <FaRegSadTear className="text-6xl text-gray-300" />
      </div>
      <h2 className="text-2xl font-bold text-gray-700 mb-2 text-center">{message}</h2>
      <p className="text-gray-500 text-center mb-6 max-w-md">
        Sorry, we couldn't find any results matching your request.<br />
        Try adjusting your filters or search terms.
      </p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="px-6 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/90 transition font-semibold text-base"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}

// Add this to your global CSS or Tailwind config for a slow bounce:
// .animate-bounce-slow { animation: bounce 2.5s infinite; }
