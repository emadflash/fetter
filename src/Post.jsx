import NavigationBar from "./Navbar"

import 'bootstrap/dist/css/bootstrap.css';
import { Col, Container, Form, FormControl, FormLabel, Row, Button } from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup';

const Content = () => {
    return (
        <Container className="mt-4">
            <Form>


                {/* PROJECT TITLE FIELD */}
                <Form.Group>
                    <FormControl
                        type="text"
                        name="title"
                        placeholder="Title"
                    />
                </Form.Group>


                {/* PROJECT DESC FIELD */}
                <Form.Group controlId="formTextarea" className="my-3">
                    <FormControl as="textarea" rows={3} placeholder="Description" />
                </Form.Group>



                {/* SUBMIT BUTTON */}
                <Button className="m-2" variant="primary" type="submit">
                    Post
                </Button>
            </Form>
        </Container>
    )
};

const PostPage = () => {
    return (
        <>
            <NavigationBar />
            <Content />     
        </>
    )
};

export default PostPage;