import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "@vladmandic/face-api";

// Mapping facial expressions to dynamic quotes
const expressionQuotes = {
  neutral: "Sometimes, the most powerful thing you can say is nothing at all.",
  happy: "Happiness is not by chance, but by choice.",
  sad: "Tears are words that need to be written.",
  angry: "Anger is one letter short of danger.",
  surprised: "Surprise is the greatest gift which life can grant us.",
  disgusted: "What we see, what we feel, is a reflection of what we are.",
};

export default function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [expression, setExpression] = useState("Loading...");
  const [quote, setQuote] = useState(expressionQuotes.neutral);

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceExpressionNet.loadFromUri("/models");
      startVideo();
    };
    loadModels();
  }, []);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: {} })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Error accessing webcam:", err));
  };

  const handleVideoOnPlay = () => {
    setInterval(async () => {
      if (!videoRef.current || !canvasRef.current) return;
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();
      if (detections.length > 0) {
        const expressions = detections[0].expressions;
        const maxExpression = Object.keys(expressions).reduce((a, b) =>
          expressions[a] > expressions[b] ? a : b
        );
        setExpression(maxExpression);
        setQuote(expressionQuotes[maxExpression] || expressionQuotes.neutral);

        faceapi.matchDimensions(canvasRef.current, {
          width: videoRef.current.videoWidth,
          height: videoRef.current.videoHeight,
        });

        const resized = faceapi.resizeResults(detections, {
          width: videoRef.current.videoWidth,
          height: videoRef.current.videoHeight,
        });

        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        faceapi.draw.drawDetections(canvasRef.current, resized);
        faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
      }
    }, 1000);
  };

  return (
    <div className="container">
      <h1>Real-Time Facial Expression Recognition</h1>

      <div className="video-container">
        <video
          ref={videoRef}
          autoPlay
          muted
          onPlay={handleVideoOnPlay}
          className="w-100 h-100"
        />
        <canvas ref={canvasRef} className="canvas-container" />
      </div>

      <div className="expression-container">
        <div className="expression-box">{expression.toUpperCase()}</div>
      </div>

      <footer>
        <div className="quote">
          {quote}
        </div>
      </footer>
    </div>
  );
}
