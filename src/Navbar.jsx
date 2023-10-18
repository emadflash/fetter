import "./Navbar.css";
import { useContext } from 'react';
import { Auth } from "./Auth";

function Navbar(props) {
    const [name, setName] = useContext(Auth);
    console.log(name);

    if (props.isSignUpPage) {
        return (
            <div class="navbar">
                <div class='site-title'>connect.org</div>
            </div>
        )
    } else {
        return (
            <div class="navbar">
                <div class='site-title'>
                    <a href='./'> connect.org </a>
                </div>
                <div class='site-navigation'>
                    <a href="./login">sign in</a>
                </div>
            </div>
        )
    }
}

export default Navbar;