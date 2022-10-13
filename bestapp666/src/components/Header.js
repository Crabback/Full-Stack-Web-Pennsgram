import "../Styles.css";

export function Header(props) {
    if (props.page=="home") {
    return (
        <div className="header" >
            <div className="header_elements">Home</div>
            <div className="header_elements">About</div>
            <div className="header_elements">Contact Us</div>
            <div className="header_elements">Login</div>
            <div className="header_elements">Sign up</div>
        </div>);
    } else if (props.page=="user"){
        return (
            <div className="header" >
                <div className="header_elements">Home</div>
                <div className="header_elements">About</div>
                <div className="header_elements">Contact Us</div>
            </div>);
    }
  }
