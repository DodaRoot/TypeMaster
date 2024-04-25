import "./App.css";
import React, { useState, useEffect, useCallback } from "react";

let focus = false;
let exampleArray = ["a", "s", "d", "f"];

function Keyboard() {
  let [fullWord, setFullWord] = useState("");
  let [keyboardHighlight, setKeyboardHighlight] = useState("");

  const keyListen = useCallback(
    (e) => {
      if (e.key === fullWord[0]) {
        console.log("match");
      }
    },
    [fullWord]
  );

  useEffect(function generateText() {
    let lengthOfWord = Math.floor(Math.random() * 2) + 4;
    let length = 0;
    for (let i = 0; i < 132; i++) {
      length++;
      let randomLetter = Math.floor(Math.random() * exampleArray.length);
      if (length > lengthOfWord) {
        length = 0;
        setFullWord((prev) => (prev += " "));
        lengthOfWord = Math.floor(Math.random() * 2) + 4;
      }
      setFullWord((prev) => (prev += exampleArray[randomLetter]));
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
      <p>{fullWord}</p>
    </div>
  );
}

export default Keyboard;
