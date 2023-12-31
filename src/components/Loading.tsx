function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-100">
      <div className="w-20 h-20 rounded-full border-t-4 border-blue-500 border-solid animate-spin"></div>
      <h1 className="text-2xl mt-4 font-semibold text-gray-800">Loading...</h1>
    </div>
  );
}

export default Loading;
