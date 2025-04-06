"use client";
import { ReadVResult } from "fs";
import { useState, useEffect } from "react";

export default function Page() {
  const [phase, setPhase] = useState<
    "start" | "wait" | "action" | "result" | "early"
  >("start");
  const [percent, setPercent] = useState<number>(100);
  const [timer, setTimer] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  useEffect(() => {
    if (phase == "wait") {
      if (percent <= 0) {
        setPhase("action");
        setTimer(0);
      } else {
        const a = setInterval(() => {
          setPercent(percent - 1);
        }, 100);
        return () => {
          clearInterval(a);
        };
      }
    }
    if (phase == "action") {
      const a = setInterval(() => {
        setTimer(timer + 10);
      }, 10);
      return () => {
        clearInterval(a);
      };
    }
  });

  function renderColor() {
    if (phase === "start") {
      return "bg-orange-500";
    } else if (phase === "wait") {
      return "bg-yellow-500";
    } else if (phase === "action") {
      return "bg-blue-500";
    } else if (phase === "result") {
      return "bg-green-500";
    } else if (phase === "early") {
      return "bg-red-500";
    }
  }

  function renderPage() {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <button
          className={`flex items-center ${renderColor()} justify-center h-screen w-screen`}
          onClick={() => {
            if (phase == "start") {
              setPhase("wait");
              setPercent(Math.floor(Math.random() * 50) + 30);
            } else if (phase == "wait") {
              setPhase("early");
              setPercent(0);
              setTimer(0);
            } else if (phase == "action") {
              setPhase("result");
              setResult(timer);
            } else if (phase === "result") {
              setPhase("start");
            } else if (phase === "early") {
              setPhase("start");
            }
          }}
        >
          {phase === "start" ? (
            <div className="text-centre">Reaction Time Test</div>
          ) : phase === "wait" ? (
            <div className="text-centre">Wait</div>
          ) : phase === "action" ? (
            <div className="text-centre">Click!</div>
          ) : phase === "result" ? (
            <div className="text-centre">Your time was: {result} ms</div>
          ) : (
            <div className="text-centre">Too Early!</div>
          )}
        </button>
      </div>
    );
  }
  return renderPage();
}
