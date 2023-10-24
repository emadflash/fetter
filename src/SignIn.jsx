import Navbar from "./Navbar";
import { useState } from "react";
import './form.css';
import axios from './api/axios';
import { Navigate } from "react-router";
import useAuth from './hooks/useAuth';

import 'bootstrap/dist/css/bootstrap.css';
import { Col, Container, Form, FormControl, FormLabel, Row } from "react-bootstrap";
import { Button } from "react-bootstrap";


const LoginForm = (props) => {
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

    const form = () => {
        return (
            <Container
                className="border bg-body-secondary mx-auto my-4">
                <Row className="my-3"><h3>Sign In</h3></Row>

                <Row>
                    <Form onSubmit={onSubmit} className="pb-2">



                        {/* USERNAME FIELD */}
                        <Form.Group>
                            <FormLabel>username</FormLabel>
                            <FormControl
                                type="text"
                                name="username"
                                onChange={onChange}
                                value={formData.username}
                            />
                        </Form.Group>



                        {/* PASSWORD FIELD */}
                        <Form.Group>
                            <FormLabel>password</FormLabel>
                            <FormControl
                                type="password"
                                name="password"
                                onChange={onChange}
                                value={formData.password}
                            />
                        </Form.Group>



                        {/* SUBMIT BUTTON */}
                        <Row className="text-center justify-content-center">
                            <Col>
                                <Button className="m-2" variant="primary" type="submit">LOGIN</Button>
                            </Col>
                        </Row>
                    </Form>
                </Row>



                {/* FOOTER */}
                <Row className="mb-2 text-center justify-content-center">
                    <Col><a href="/signup">Sign Up</a></Col>
                    <Col><a href="#">Password Reset</a></Col>
                </Row>
            </Container>
        );
    }

    return form();
}

const LoginPage = () => {
    const [isLoggedIn, setIsLoggedIn]  = useState(false);
    if (isLoggedIn) {
        return <Navigate to="/"/>;
    }

    return (
        <div>
            <Navbar />
            <LoginForm setIsLoggedIn={setIsLoggedIn}/>
        </div>
    )
}

export default LoginPage;