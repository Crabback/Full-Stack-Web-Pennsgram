import "./App.css";
import {Welcome} from "./components/Welcome";

export default function App() {
  return (
    <div className="App">
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
    </div>
  );
}

