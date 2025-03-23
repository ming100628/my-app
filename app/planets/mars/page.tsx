"use client";
import { useState } from "react";

export default function Page() {
  const [number, setNumber] = useState<number>(0);
  const [level, setLevel] = useState<number>(0);
  const [phase, setPhase] = useState<"memorize" | "guess" | "result">(
    "memorize"
  );
  const [started, setStarted] = useState<boolean>(false);
  const [guessedNumber, setGuessedNumber] = useState<string>("");

  function handleSubmit() {
    if (guessedNumber === number.toString()) {
      setLevel(level + 1);
      setPhase("memorize");
      setNumber(Math.floor(Math.random() * Math.pow(10, level + 2)));
    } else {
      setStarted(false);
      setPhase("result");
    }
  }
  if (!started) {
    if (phase === "result") {
      return (
        <div className="flex items-center justify-center h-screen">
          <div>Game Over!</div>
          <div>Level you reached: {level}</div>
          <div>Correct answer was: {number}</div>
          <div>Your answer was: {guessedNumber}</div>
          <button
            onClick={() => {
              setStarted(false);
              setNumber(Math.floor(Math.random() * 10));
              setPhase("memorize");
              setLevel(0);
            }}
          >
            Restart
          </button>
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-center h-screen">
          <button
            onClick={() => {
              setStarted(true);
              setNumber(Math.floor(Math.random() * 10));
            }}
          >
            Start
          </button>
        </div>
      );
    }
  } else if (phase === "memorize") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div>memorize this number {number}</div>
        <button onClick={() => setPhase("guess")}>Done</button>
      </div>
    );
  } else if (phase === "guess") {
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
  } else {
    return (
      <div className="items-center justify-center h-screen">
        <div>Game Over!</div>
        <div>Level you reached: {level}</div>
        <div>Correct answer was: {number}</div>
        <div>Your answer was: {guessedNumber}</div>
        <button
          onClick={() => {
            setStarted(true);
            setNumber(Math.floor(Math.random() * 10));
            setPhase("memorize");
            setLevel(0);
          }}
        >
          Restart
        </button>
      </div>
    );
  }
}
