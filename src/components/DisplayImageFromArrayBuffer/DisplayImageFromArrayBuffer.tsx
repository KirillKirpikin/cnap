import { useState, useEffect } from "react";

interface DisplayImageProps {
  fileBuffer: ArrayBuffer;
  fileType: string;
}

export function DisplayImageFromArrayBuffer({
  fileBuffer,
  fileType,
}: DisplayImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const blob = new Blob([new Uint8Array(fileBuffer)], { type: fileType });
    const imageUrl = URL.createObjectURL(blob);
    setImageUrl(imageUrl);

    return () => {
      // Clean up the URL when the component is unmounted
      URL.revokeObjectURL(imageUrl);
    };
  }, [fileBuffer, fileType]);

  return imageUrl ? <img src={imageUrl} alt="Image" /> : null;
}