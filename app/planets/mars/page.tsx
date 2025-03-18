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
      alert("correct");
    } else {
      alert("incorrect");
      setStarted(false);
      setLevel(0);
      setPhase("memorize");
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      {!started ? (
        <div>
          <button
            onClick={() => {
              setStarted(true);
              setNumber(Math.floor(Math.random() * 10));
            }}
          >
            Start
          </button>
        </div>
      ) : phase === "memorize" ? (
        <div className="flex flex-col items-center justify-center">
          <div>memorize this number {number}</div>
          <button onClick={() => setPhase("guess")}>Done</button>
        </div>
      ) : (
        <div>
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
      )}
    </div>
  );
}
