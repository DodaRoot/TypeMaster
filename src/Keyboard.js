import "./App.css";
import React, { useState, useEffect, useCallback } from "react";

let focus = false;
let exampleArray = ["a", "s", "d", "f"];
let i = 0;

function Keyboard() {
  let [keyboardHighlight, setKeyboardHighlight] = useState("");
  let [displayWord, setDisplayWord] = useState([]);
  let [highlightWord, setHighlightWord] = useState([]);

  const keyListen = useCallback(
    (e) => {
      if (e.key === displayWord[i]) {
        let display = [...displayWord].slice(i + 1);
        let highlight = [...displayWord].slice(0, i + 1);
        setDisplayWord(display);
        setHighlightWord(highlight);
        i++;
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
    <div className={`keyboard ${keyboardHighlight}`}>
      <p>
        <span className="highlight">{highlightWord}</span>
        <span>&zwnj;</span>
        <span>{displayWord}</span>
      </p>
    </div>
  );
}

export default Keyboard;
