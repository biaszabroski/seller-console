import type { ErrorProps } from "../../types/error";

export default function ErrorMessage({ message, onRetry }: ErrorProps) {
  return (
    <div className="bg-red-100 text-red-700 p-3 m-3 rounded-lg flex justify-between items-center">
      <span>{message}</span>
      {onRetry && (
        <button
          className="ml-4 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={onRetry}
        >
          Retry
        </button>
      )}
    </div>
  );
}
