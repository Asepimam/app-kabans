const Skeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="space-y-2 mt-2">
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded w-4/6"></div>
        <div className="h-4 bg-gray-300 rounded w-2/6"></div>
      </div>
    </div>
  );
};

export default Skeleton;
