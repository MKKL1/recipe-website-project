import {Alert, Button, Card, Form, FormGroup, Spinner} from "react-bootstrap";
import {LoginRequest} from "../../models/LoginRequest.ts";
import {Formik} from "formik";
import * as Yup from 'yup';
import {object} from "yup";
import axios from "axios";
import {environment} from "../../../environment.ts";

export default function Login(){
    const loginSchema = object({
        username: Yup.string()
            .required("Username is required"),
        password: Yup.string()
            .required("Password is required")
    });

    function submitLogin(values: LoginRequest){
        console.log(values);
        // send request to backend
        // user model isn't returned
        // I don't know if it should return 401
        axios.post(environment.apiUrl + "auth/login", values)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.error(err);
            })
    }

    return (
        <>
            <Card className="form-container">
                <Card.Body>
                    <Card.Title className="text-center">Sign in</Card.Title>
                    <Formik initialValues={{username: '', password: ''}}
                            onSubmit={async (values: LoginRequest): Promise<void> => {submitLogin(values)}}
                            validationSchema={loginSchema}>
                        {({errors, isSubmitting, handleSubmit, handleChange}) => (
                            <Form onSubmit={handleSubmit} noValidate>
                                <FormGroup controlId="username" className="mb-3">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="username" name="username" placeholder="Enter your username" onChange={handleChange}/>
                                    {errors.username && <Alert style={{marginTop: '10px'}} variant="danger">{errors.username}</Alert>}
                                </FormGroup>
                                <FormGroup controlId="password" className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password" placeholder="Enter your Password" onChange={handleChange}/>
                                    {errors.password && <Alert style={{marginTop: '10px'}} variant="danger">{errors.password}</Alert>}
                                </FormGroup>
                                {/* change button after submitting */}
                                { !isSubmitting ?
                                    <Button type="submit">Sign in</Button> :
                                    <Button variant="primary" disabled>
                                        <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true"/> Loading...
                                    </Button>
                                }
                            </Form>
                        )}
                    </Formik>
                </Card.Body>
            </Card>
        </>
    );
}