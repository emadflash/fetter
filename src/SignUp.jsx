import Navbar from "./Navbar";
import { useState } from "react";
import './form.css';
import axios from "./api/axios";

import 'bootstrap/dist/css/bootstrap.css';
import { Col, Container, Form, FormControl, FormLabel, Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Navigate } from "react-router";

const SignUpForm = (props) => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [failedAttempt, setFailedAttempt] = useState(false);

    const onChange = (event) => {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value,
            }
        })
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("/api/user/signup",
                JSON.stringify(formData),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );
            props.setHasRegistered(true);
            return;
        } catch (err) {
            setFailedAttempt(true);
            console.log(err.message);
        }
    }

    const form = () => {
        return (
            <Container
                style={{width: '50%'}}
                className="border bg-body-secondary mx-auto my-4">
                <Row className="my-3"><h3>Sign Up</h3></Row>

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


                        {/* EMAIL FIELD */}
                        <Form.Group>
                            <FormLabel>email</FormLabel>
                            <FormControl
                                type="text"
                                name="email"
                                onChange={onChange}
                                value={formData.email}
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
                                <Button className="m-2" variant="primary" type="submit">SIGN UP</Button>
                            </Col>
                        </Row>
                    </Form>



                    {/* FOOTER */}
                    {
                        (failedAttempt)

                        ? (
                            <Row className="mb-2 text-center justify-content-center">
                            <p className="text-danger"> Error while submitting signup form</p>
                            </Row>
                        )

                        : <div></div>
                    }
                </Row>
            </Container>
        );
    }

    return form();
}

const SignUpPage = () => {
    const [hasRegistered, setHasRegistered] = useState(false);
    if (hasRegistered) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <Navbar />
            <SignUpForm setHasRegistered={setHasRegistered}/>
        </div>
    )
}

export default SignUpPage;