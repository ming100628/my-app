"use client";
import { useState, useEffect } from "react";

export default function Page() {
  const [number, setNumber] = useState<number>(0);
  const [level, setLevel] = useState<number>(0);
  const [phase, setPhase] = useState<"memorize" | "guess" | "result" | "start">(
    "start"
  );
  const [guessedNumber, setGuessedNumber] = useState<string>("");
  const [percent, setPercent] = useState<number>(100);
  console.log("i have rerendered");
  useEffect(() => {
    if (percent <= 0 && phase == "memorize") {
      setPhase("guess");
      setPercent(100);
    }
    const a = setInterval(() => {
      setPercent(percent - 1);
    }, 100);
    return () => {
      clearInterval(a);
    };
  });
  function handleSubmit() {
    if (guessedNumber === number.toString()) {
      setLevel(level + 1);
      setPhase("memorize");
      setNumber(Math.floor(Math.random() * Math.pow(10, level + 2)));
    } else {
      setPhase("result");
    }
  }
  function renderResults() {
    return (
      <div className="flex items-center justify-center h-screen">
        <div>Game Over!</div>
        <div>Level you reached: {level}</div>
        <div>Correct answer was: {number}</div>
        <div>Your answer was: {guessedNumber}</div>
        <button
          onClick={() => {
            setNumber(Math.floor(Math.random() * 10));
            setPhase("start");
            setLevel(0);
            setPercent(100);
          }}
        >
          Restart
        </button>
      </div>
    );
  }
  function renderStartPage() {
    return (
      <div className="flex items-center justify-center h-screen">
        <button
          onClick={() => {
            setPhase("memorize");
            setNumber(Math.floor(Math.random() * 10));
          }}
        >
          Start
        </button>
      </div>
    );
  }

  function renderMemorizePage() {
    return (
      <div className="flex items-center justify-center h-screen">
        <div>
          <div
            className="bg-green-300 h-8 w-full"
            style={{ width: `${percent}%` }}
          ></div>
          <div>memorize this number {number}</div>
        </div>
      </div>
    );
  }

  function renderGuess() {
    return (
      <div className="flex items-center justify-center h-screen">
        <input
          value={guessedNumber}
          onChange={(event) => {
            setGuessedNumber(event.target.value);
          }}
          type="text"
          className="border border-black"
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    );
  }

  function renderPhase() {
    if (phase === "start") {
      return renderStartPage();
    } else if (phase === "result") {
      return renderResults();
    } else if (phase === "memorize") {
      return renderMemorizePage();
    } else {
      return renderGuess();
    }
  }
  return renderPhase();
}
