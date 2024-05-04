import "./App.css";
import React, { useState, useEffect, useCallback } from "react";

let focus = false;
let exampleArray = ["a", "s", "d", "f"];
let i = 0;
let firstKeyPress = false;
let seconds = 0;
let minutes = 0;

function Keyboard() {
  let [keyboardHighlight, setKeyboardHighlight] = useState("");
  let [displayWord, setDisplayWord] = useState([]);
  let [highlightWord, setHighlightWord] = useState([]);
  let [mistakes, setMistakes] = useState(0);
  let [timer, setTimer] = useState("0:00");

  const timerSet = () => {
    setInterval(() => {
      console.log(".");
      displayTime();
    }, 1000);
  };

  const resetTimer = () => {
    if (firstKeyPress) {
      window.location.reload();
    }
  };

  const displayTime = () => {
    seconds++;
    if (seconds > 59) {
      seconds = 0;
      minutes++;
    }
    if (seconds < 10) {
      setTimer(`${minutes}:0${seconds}`);
    } else {
      setTimer(`${minutes}:${seconds}`);
    }
  };

  const keyListen = useCallback(
    (e) => {
      if (!firstKeyPress) {
        timerSet();
        firstKeyPress = true;
      }
      if (e.key === displayWord[i]) {
        let display = [...displayWord].slice(i + 1);
        let highlight = [...displayWord].slice(0, i + 1);
        setDisplayWord(display);
        setHighlightWord(highlight);
        i++;
      } else {
        setMistakes((mistakes += 1));
      }
    },
    [displayWord]
  );

  useEffect(() => {
    let lengthOfWord = Math.floor(Math.random() * 2) + 4;
    let length = 0;
    for (let i = 0; i < 132; i++) {
      let randomLetter = Math.floor(Math.random() * exampleArray.length);
      if (length > lengthOfWord) {
        length = 0;
        lengthOfWord = Math.floor(Math.random() * 2) + 4;
        setDisplayWord((prev) => [...prev, " "]);
      } else {
        setDisplayWord((prev) => [...prev, exampleArray[randomLetter]]);
      }
      length++;
    }
  }, []);

  const mouseTarget = useCallback(
    (e) => {
      if (e.target === document.querySelector(".keyboard")) {
        setKeyboardHighlight("keyboard-focus");
        if (focus === false) {
          focus = true;
          document.addEventListener("keydown", keyListen);
        }
      } else {
        setKeyboardHighlight("");
        if (focus === true) {
          document.removeEventListener("keydown", keyListen);
          focus = false;
        }
      }
    },
    [keyListen]
  );

  useEffect(() => {
    document.addEventListener("click", mouseTarget);
    return () => {
      document.removeEventListener("click", mouseTarget);
    };
  }, [mouseTarget]);

  return (
    <div>
      <div className={`keyboard ${keyboardHighlight}`}>
        <p>
          <span className="highlight">{highlightWord}</span>
          <span>&zwnj;</span>
          <span>{displayWord}</span>
        </p>
      </div>
      <div className="displays">
        <div className="time">
          <p>Time / {timer}</p>
        </div>
        <div className="mistakes">
          <p>Mistakes / {mistakes}</p>
        </div>
        <button className="reset" onClick={resetTimer}>
          <p>Reset</p>
        </button>
      </div>
    </div>
  );
}

export default Keyboard;
