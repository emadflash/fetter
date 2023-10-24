import Navbar from "./Navbar";
import { useState } from "react";
import './form.css';


import 'bootstrap/dist/css/bootstrap.css';
import { Col, Container, Form, FormControl, FormLabel, Row } from "react-bootstrap";
import { Button } from "react-bootstrap";

const SignUpForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
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

    const form = () => {
        return (
            <Container
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
                </Row>
            </Container>
        );
    }

    return form();
}

const SignUpPage = () => {
    return (
        <div>
            <Navbar />
            <SignUpForm />
        </div>
    )
}

export default SignUpPage;