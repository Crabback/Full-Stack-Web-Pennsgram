import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/User">UserPage</Link>
          </li>
          <li>
            <Link to="/Register">Register</Link>
          </li>
        </ul>
      </nav>
      <div className="header" >
            <div className="header_elements">Home</div>
            <div className="header_elements">About</div>
            <div className="header_elements">Contact Us</div>
            <div className="header_elements">Login</div>
            <div className="header_elements">Sign up</div>
      </div>
      <div className="logos">
          <img src={require("../images/pennsgram_logo.png")} alt="logo" width="234" height="66"></img>
        </div>
      <Outlet />
    </>
  )
};

export default Layout;