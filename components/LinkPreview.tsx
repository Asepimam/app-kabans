import { useEffect, useState } from "react";

type PreviewData = {
  title: string;
  description: string;
  images: string[];
  sitename: string;
  url: string;
};
const apiKey = process.env.NEXT_PUBLIC_JSON_LINK_KEY || "";

const LinkPreview = ({ url }: { url: string }) => {
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = `https://jsonlink.io/api/extract?url=${url}&api_key=${apiKey}`;

      await fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Error: ${response.status} - ${response.statusText}`,
            );
          }
          return response.json();
        })
        .then((data) => {
          setPreviewData({
            title: data.title,
            description: data.description,
            images: data.images,
            sitename: data.sitename,
            url: data.url,
          });
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });
    };
    fetchData();
  }, [url]);

  return (
    <a
      href={previewData?.url}
      className="bg-gray-50 dark:bg-gray-600 rounded-xl p-4 mb-2 hover:bg-gray-200 dark:hover:bg-gray-500">
      <img src={previewData?.images[0]} className="rounded-lg mb-2" />
      <div className="flex flex-col justify-between">
        <span className="text-sm font-medium text-gray-900 dark:text-white mb-2">
          {previewData?.description}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400 font-normal">
          {previewData?.sitename}
        </span>
      </div>
    </a>
  );
};

export default LinkPreview;
