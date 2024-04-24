import "./App.css";

function App() {
  return (
    <div className="mainContent">
      <div className="navBar">
        <div className="levels">
          <p>Level 0</p>
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
