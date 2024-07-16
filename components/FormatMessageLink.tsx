import React from "react";
import LinkPreview from "./LinkPreview";

const urlRegex = /(https?:\/\/[^\s]+)/g;

const FormatMessageLink = ({ message }: { message: string }) => {
  const containsNewline = message.includes("\n");
  const match = message.trim().match(urlRegex);
  const isOnlyUrl = match && match[0] === message.trim();

  if (isOnlyUrl) {
    return (
      <React.Fragment>
        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
          <a
            href={message}
            className="text-blue-700 dark:text-blue-500 underline hover:no-underline font-medium break-all">
            {message}
          </a>
        </p>
        <LinkPreview url={message} />
      </React.Fragment>
    );
  } else if (containsNewline) {
    // Handle pesan dengan baris baru
    return message.split("\n").map((part, index) => (
      <React.Fragment key={index}>
        {part.split(urlRegex).map((chunk, i) => {
          if (chunk.match(urlRegex)) {
            return (
              <React.Fragment key={i}>
                <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                  <a
                    key={i}
                    href={chunk}
                    className="text-blue-700 dark:text-blue-500 underline hover:no-underline font-medium break-all">
                    {chunk}
                  </a>
                </p>
                <LinkPreview url={chunk} />
              </React.Fragment>
            );
          } else {
            return (
              <p
                className="text-sm font-normal py-2.5 text-gray-900 dark:text-white"
                key={i}>
                {chunk}
              </p>
            );
          }
        })}
      </React.Fragment>
    ));
  } else {
    // Handle pesan tanpa baris baru
    return (
      <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
        {message.split(urlRegex).map((chunk, i) => {
          if (chunk.match(urlRegex)) {
            return (
              <a
                key={i}
                href={chunk}
                className="text-blue-700 dark:text-blue-500 underline hover:no-underline font-medium break-all">
                {chunk}
              </a>
            );
          } else {
            return chunk;
          }
        })}
      </p>
    );
  }
};

export default FormatMessageLink;
