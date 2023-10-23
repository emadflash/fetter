import "./Navbar.css";
import { useContext } from 'react';
import AuthContext from "./Auth";

function Navbar(props) {
    const { auth, setAuth } = useContext(AuthContext);
    const isLoggedIn = (!auth.username) ? false : true;

    if (isLoggedIn) {
        return (
            <div className="navbar">
                <div className='site-title'>
                    <a href='./'> connect.org </a>
                </div>
                <div className="site-navigation">
                    {auth.username}
                </div>
            </div>
        )
    } else {
        return (
            <div className="navbar">
                <div className='site-title'>
                    <a href='./'> connect.org </a>
                </div>
                <div className='site-navigation'>
                    <a href="./login">sign in</a>
                </div>
            </div>
        )
    }
}

export default Navbar;