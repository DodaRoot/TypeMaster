import "./App.css";
import React, { useState, useEffect, useCallback } from "react";

let focus = false;
let exampleArray = ["a", "s", "d", "f"];
let a = 0;
let firstKeyPress = false;
let seconds = 0;
let minutes = 0;
let word = "";

let lengthOfWord = Math.floor(Math.random() * 2) + 4;
let length = 0;
for (let i = 0; i < 132; i++) {
  let randomLetter = Math.floor(Math.random() * exampleArray.length);
  if (length > lengthOfWord) {
    length = 0;
    lengthOfWord = Math.floor(Math.random() * 2) + 4;
    word += " ";
  } else {
    word += exampleArray[randomLetter];
  }
  length++;
}

function Keyboard() {
  let [finish, setFinish] = useState("");
  let [keyboardHighlight, setKeyboardHighlight] = useState("");
  let [displayWord, setDisplayWord] = useState(word);
  let [highlightWord, setHighlightWord] = useState("");
  let [mistakes, setMistakes] = useState(0);
  let [timer, setTimer] = useState("0:00");

  const timerSet = useCallback(() => {
    setInterval(() => {
      displayTime();
    }, 1000);
  }, []);

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
      if (e.key === word[a]) {
        a++;
        let display = word.slice(a);
        let highlight = word.slice(0, a);
        setDisplayWord(display);
        setHighlightWord(highlight);
        if (display.length === 0) {
          setFinish("finish");
        }
      } else {
        setMistakes((e) => (e += 1));
      }
    },
    [timerSet]
  );

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
      <div className={`keyboard ${keyboardHighlight} ${finish}`}>
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
