import React, { useState } from "react";

const ReadMore = ({
  text,
  maxLength = 100,
}: {
  text: string | null | undefined;
  maxLength: number;
}) => {
  if (!text) return "";

  const [isTruncated, setIsTruncated] = useState(true);

  // Check if the text needs to be truncated
  const shouldTruncate = text.length > maxLength;

  // Truncate the text if necessary
  const displayedText =
    isTruncated && shouldTruncate ? text.slice(0, maxLength) + "..." : text;

  return (
    <div className="inline">
      <span>{displayedText}</span>
      {shouldTruncate && (
        <button
          onClick={() => setIsTruncated(!isTruncated)}
          className="text-indigo-500 cursor-pointer border-none bg-transparent p-0 ml-1 text-base tracking-tighter"
        >
          {isTruncated ? "Read More" : "Show Less"}
        </button>
      )}
    </div>
  );
};

export default ReadMore;
