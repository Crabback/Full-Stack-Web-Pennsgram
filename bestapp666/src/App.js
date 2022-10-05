import "./App.css";
import {Welcome} from "./components/Welcome";

export default function App() {
  return (
    <div className="App">
<<<<<<< HEAD
      <div class="top_half_page">
        <div class="right">
          <p>Home About Sign up Login</p>
          <p>Brief About the platform</p>
          <Welcome name="Sara" />;
        </div>
        <div class="logos">
          <img src="pennsgram_logo.jpeg" alt="logo"></img>
          <h1>Pennsgram</h1>
        </div>
        <div className="right">
          <button class="btn"> Start your journey </button>
        </div>
      </div>
      <div className="bot_half_page">
        <p>Some moments from our users</p>
        <div className="pics">
          <img src="pennsgram_logo.jpeg" alt="user pic 1"></img>
          <img src="pennsgram_logo.jpeg" alt="user pic 2"></img>
          <img src="pennsgram_logo.jpeg" alt="user pic 3"></img>
        </div>
        <div className="bottom">
          <p>Term And Policies All Copy Right Reserved</p>
        </div>
      </div>
=======
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React

          HIIII 
        </a>
      </header>
>>>>>>> 24dc11ffde7502e9cd5c081121dfbd0c6f9e5d01
    </div>
  );
}

