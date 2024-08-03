// src/components/WebcamCapture.js

import { useRef, useCallback, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "./ui/button";

const WebCamCapture = ({
  onCapture,
}: {
  onCapture: (imageSrc: string) => void;
}) => {
  const webcamRef = useRef<Webcam>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setImageSrc(imageSrc);
        onCapture(imageSrc); // Pass the image to the parent component or handler
      }
      // Stop the webcam
      if (webcamRef.current.video) {
        const stream = webcamRef.current.video.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    }
  }, [webcamRef, onCapture]);

  return (
    <div>
      <h1 className="text-sm mb-1 font-semibold">Owner photo</h1>
      {!imageSrc && (
        <>
          <Webcam
            className="rounded-md"
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={320}
            height={240}
          />
          <button
            type="button"
            onClick={capture}
            className="text-sm font-semibold"
          >
            Click here to capture photo
          </button>
        </>
      )}
      {imageSrc && (
        <div>
          <img src={imageSrc} alt="Captured" className="rounded-md" />
          <Button
            type="button"
            onClick={() => {
              setImageSrc(null);
              capture();
            }}
            variant={"link"}
            className="text-red-600"
          >
            Retake photo
          </Button>
        </div>
      )}
    </div>
  );
};

export default WebCamCapture;
