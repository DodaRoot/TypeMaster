import "./App.css";
import React, { useState, useEffect } from "react";

let focus = false;

function Keyboard() {
  const keyListen = (e) => {
    console.log(e.key);
  };
  const mouseTarget = (e) => {
    if (e.target == document.querySelector(".keyboard")) {
      setKeyboardHighlight("keyboard-focus");
      if (focus == false) {
        focus = true;
        document.addEventListener("keydown", keyListen);
      }
    } else {
      setKeyboardHighlight("");
      console.log("remove");
      return () => {
        document.removeEventListener("keydown", keyListen);
      };
    }
  };
  useEffect(() => {
    document.addEventListener("click", mouseTarget);
    return () => {
      document.removeEventListener("click", mouseTarget);
    };
  });

  let [keyboardHighlight, setKeyboardHighlight] = useState("");
  return <div className={`keyboard ${keyboardHighlight}`}></div>;
}

export default Keyboard;
