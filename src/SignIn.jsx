import Navbar from "./Navbar";
import { useState } from "react";
import './form.css';

function Form() {
    const [formData, setFormData] = useState({
        userName: "",
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

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
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
                        name="userName"
                        value={formData.userName}
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
    return (
        <div>
            <Navbar />
            <Form />
        </div>
    )
}

export default Login;