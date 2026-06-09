export default function LoadingSpinner() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3">
      <div className="h-7 w-7 animate-spin rounded-full border-2 border-gray-200 border-t-[rgb(100,210,100)]" />
      <p className="text-xs text-gray-300">불러오는 중...</p>
    </div>
  );
}
