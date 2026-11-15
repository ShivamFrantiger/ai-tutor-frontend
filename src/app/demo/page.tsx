"use client";

import { useState, useEffect } from "react";
import { useAudioRecorder } from "@/hooks/useAudioRecorder";

export default function DemoPage() {
  const [word, setWord] = useState("cat");
  const [useRealModel, setUseRealModel] = useState(false);
  const [responseJson, setResponseJson] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { isRecording, startRecording, stopRecording, audioBlob, error } = useAudioRecorder();

  const handleToggleRecording = () => {
    if (isRecording) {
      stopRecording();
      setIsProcessing(true);
    } else {
      setResponseJson(null);
      startRecording();
    }
  };

  useEffect(() => {
    async function processAudio() {
      if (isProcessing && audioBlob) {
        try {
          const formData = new FormData();
          formData.append("word", word);
          formData.append("audio", audioBlob, "recording.wav");
          formData.append("real_speech", useRealModel ? "true" : "false"); 

          // If using the Python backend, use apiUrl. Here we use the local Next.js route:
          const res = await fetch(`/api/pronunciation/word`, {
            method: "POST",
            body: formData,
          });
          
          const result = await res.json();
          setResponseJson(result);
        } catch (err: any) {
          console.error("Audio processing failed:", err);
          setResponseJson({ error: err.message || "Failed to process audio" });
        } finally {
          setIsProcessing(false);
        }
      }
    }
    
    processAudio();
  }, [isProcessing, audioBlob, word, useRealModel]);

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "40px 20px", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "24px" }}>Pronunciation API Demo</h1>
      
      <div style={{ marginBottom: "24px" }}>
        <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Word to pronounce:</label>
        <input 
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          disabled={isRecording || isProcessing}
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "1rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginBottom: "12px"
          }}
        />
        <label style={{ display: "flex", alignItems: "center", cursor: "pointer", fontWeight: "bold" }}>
          <input
            type="checkbox"
            checked={useRealModel}
            onChange={(e) => setUseRealModel(e.target.checked)}
            disabled={isRecording || isProcessing}
            style={{ marginRight: "8px", width: "18px", height: "18px" }}
          />
          Use Real Machine Learning Model (real_speech=true)
        </label>
      </div>

      <div style={{ marginBottom: "32px" }}>
        <button
          onClick={handleToggleRecording}
          disabled={isProcessing}
          style={{
            padding: "12px 24px",
            fontSize: "1.1rem",
            fontWeight: "bold",
            color: "white",
            backgroundColor: isRecording ? "#ef4444" : "#3b82f6",
            border: "none",
            borderRadius: "4px",
            cursor: isProcessing ? "not-allowed" : "pointer",
            width: "100%",
            transition: "background-color 0.2s"
          }}
        >
          {isProcessing ? "Processing..." : isRecording ? "Stop Recording" : "Start Recording"}
        </button>
        {error && <p style={{ color: "red", marginTop: "8px" }}>{error}</p>}
      </div>

      {responseJson && (
        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", margin: 0 }}>API Response:</h2>
            <button 
              onClick={() => navigator.clipboard.writeText(JSON.stringify(responseJson, null, 2))}
              style={{
                padding: "6px 12px",
                fontSize: "0.85rem",
                backgroundColor: "#e5e7eb",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Copy JSON
            </button>
          </div>
          <pre style={{ 
            backgroundColor: "#f3f4f6", 
            padding: "16px", 
            borderRadius: "8px",
            overflowX: "auto",
            fontSize: "0.9rem",
            margin: 0
          }}>
            {JSON.stringify(responseJson, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
