import "./App.css";
import React, { useState } from "react";

function App() {
  let [dropDown, setDropDown] = useState("levelDropDownHidden");

  const dropClickEvent = () => {
    dropDown == "levelDropDownHidden"
      ? setDropDown("levelDropDownShow")
      : setDropDown("levelDropDownHidden");
  };

  return (
    <div className="mainContent">
      <div className="navBar">
        <div className="levels" onClick={dropClickEvent}>
          <p>Level 0</p>
          <div className={"levelDropDown " + dropDown}>
            <p>Level 1</p>
            <p>Level 2</p>
            <p>Level 3</p>
            <p>Level 4</p>
            <p>Level 5</p>
            <p>Level 6</p>
            <p>Level 7</p>
            <p>Level 8</p>
          </div>
        </div>
        <div className="heading">
          <a>TypeMaster.com</a>
          <button>
            <p>SignUp</p>
          </button>
        </div>
      </div>
      <div className="content">
        <div className="mainText">
          <p>
            lorem ipsum adsdsasdfsdfs asdfasdfasdfs sdfasdf s sdf sdfksjfjsadf
            ifjenngennds;dyfen;lsdkjfiw
          </p>
        </div>
        <div className="mainImage">
          <img src="type.jpg"></img>
        </div>
      </div>
      <div className="keyboard"></div>
      <div className="displays">
        <div className="time">
          <p>Time / 0:00</p>
        </div>
        <button className="reset">
          <p>Reset</p>
        </button>
      </div>
    </div>
  );
}

export default App;
