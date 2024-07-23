import React from "react";

interface UploadAvatarProfileProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageUrl?: string;
  initialImageUrl?: string;
  onRemove?: () => void;
}

const UploadAvatarProfile: React.FC<UploadAvatarProfileProps> = ({
  onChange,
  imageUrl,
  initialImageUrl,
  onRemove,
}) => {
  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        className="
          relative
          flex
          flex-col
          items-center
          justify-center
          w-36
          h-36
          border-2
          border-gray-300
          border-dashed
          cursor-pointer
          bg-gray-50
          dark:hover:bg-gray-800
          dark:border-gray-600
          hover:bg-gray-100
          rounded-full
          overflow-hidden
        ">
        {imageUrl ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={imageUrl}
              alt="Uploaded avatar"
              className="w-full h-full object-cover rounded-full"
            />
            {onRemove && (
              <button
                onClick={onRemove}
                className="
                  absolute
                  top-10
                  right-5
                  bg-gray-800
                  text-white
                  rounded-full
                  p-1
                  ">
                &#x2716;
              </button>
            )}
          </div>
        ) : initialImageUrl ? (
          <div
            className="
            relative
            w-full
            h-full
            flex
            items-center
            justify-center
            ">
            <img
              src={initialImageUrl}
              alt="Initial avatar"
              className="w-full h-full object-cover rounded-full"
            />
            <div
              className="
              absolute
              inset-0
              flex
              flex-col
              items-center
              justify-center
              bg-gray-800
              bg-opacity-50
              ">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 pl-4">
                <span className="font-semibold">Click</span> or drag and drop
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 pl-4">
              <span className="font-semibold">Click</span> or drag and drop
            </p>
          </div>
        )}
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={onChange}
        />
      </label>
    </div>
  );
};

export default UploadAvatarProfile;
