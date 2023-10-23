import Navbar from "./Navbar";
import { useState } from "react";
import './form.css';
import axios from './api/axios';
import { Navigate } from "react-router";
import useAuth from './hooks/useAuth';

function Form(props) {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const onChange = (event) => {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value,
            }
        })
    };

    const { setAuth } = useAuth();

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(formData)
            const response = await axios.post("/api/user/login",
                JSON.stringify(formData),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );

            const accessToken = response?.data?.accessToken;

            setAuth({ username: formData.username, accessToken: accessToken });
            setFormData({
                username: "",
                password: ""
            });

            props.setIsLoggedIn(true)
            return;
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div className="form">
            <div className="form--title">Sign In</div>

            <form onSubmit={onSubmit} className="form--content">
                <div className="form--item">
                    <div className="form--item-label">username</div>
                    <
                        input type='text'
                        onChange={onChange}
                        name="username"
                        value={formData.username}
                    />
                </div>

                <div className="form--item">
                    <div className="form--item-label">password</div>
                    <
                        input type='password'
                        onChange={onChange}
                        value={formData.password}
                        name="password"
                    />
                </div>

                <div className="form--item">
                    <button className="form--button">LOGIN</button>
                </div>

                <div className="form--footer">
                    <i>Don't have an account ? <a href="/signup"> Sign Up</a></i>
                </div>
            </form>
        </div>
    )
}

function Login() {
    const [ isLoggedIn, setIsLoggedIn]  = useState(false);
    if (isLoggedIn)
        return <Navigate to="/"/>;

    return (
        <div>
            <Navbar />
            <Form setIsLoggedIn={setIsLoggedIn}/>
        </div>
    )
}

export default Login;