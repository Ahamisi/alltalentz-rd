export default function Loading() {
  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex items-center justify-center mb-5">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F99621]"></div>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Preparing your test portal...</h2>
        <p className="text-gray-600 text-sm">
          Please wait a moment. Do not refresh or close this page — we&apos;re getting your
          assessment ready.
        </p>
      </div>
    </div>
  );
}
