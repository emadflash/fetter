import NavigationBar from "./Navbar"

import { useState } from "react";
import useAuth from "./hooks/useAuth";
import axios from "./api/axios";
import { Navigate } from "react-router";

import 'bootstrap/dist/css/bootstrap.css';
import { Col, Container, Form, FormControl, FormLabel, Row, Button } from "react-bootstrap";

const PostForm = (props) => {
    const [formData, setFormData] = useState({
        title: "",
        githubLink: "",
        description: "",
    });

    const onChange = (event) => {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value,
            }
        })
    };

    const { auth } = useAuth();

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("/api/post",
                JSON.stringify(formData),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${auth.accessToken}`
                    },
                    withCredentials: true,
                }
            );
            setFormData({
                title: "",
                githubLink: "",
                description: "",
            });
            props.setFormSubmitted(true)
            return;
        } catch (err) {
            console.log(err.message);
        }
    }

    const form = () => {
        return (
            <Form onSubmit={onSubmit}>
                {/* PROJECT TITLE FIELD */}
                <Form.Group className="mb-2">
                    <FormControl
                        type="text"
                        name="title"
                        placeholder="Title"
                        onChange={onChange}
                        value={formData.title}
                    />
                </Form.Group>


                {/* PROJECT GITHUB LINK */}
                <Form.Group className="mb-2">
                    <FormControl
                        type="text"
                        name="githubLink"
                        placeholder="Github Link"
                        onChange={onChange}
                        value={formData.githubLink}
                    />
                </Form.Group>



                {/* PROJECT DESC FIELD */}
                <Form.Group controlId="formTextarea" className="mb-3">
                    <FormControl as="textarea"
                        rows={8}
                        placeholder="Description"
                        name="description"
                        onChange={onChange}
                        value={formData.description}
                    />
                </Form.Group>



                {/* SUBMIT BUTTON */}
                <Button variant="primary" type="submit">
                    Post
                </Button>
            </Form>
        );
    };

    return form();
};

const PostPage = () => {
    const [formSubmitted, setFormSubmitted]  = useState(false);
    if (formSubmitted) {
        return <Navigate to="/"/>;
    }

    return (
        <>
            <NavigationBar />
            <Container className="mt-4">
            <PostForm setFormSubmitted={setFormSubmitted}/>
            </Container>
        </>
    )
};

export default PostPage;