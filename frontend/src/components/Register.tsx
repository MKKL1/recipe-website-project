import {Alert, Button, Card, Form, FormGroup, Spinner} from "react-bootstrap";
import {Formik} from "formik";
import {RegistrationRequest} from "../models/RegistrationRequest.ts";
import * as Yup from 'yup';
import {object} from "yup";

export default function Register(){
    const registrationSchema = object({
        username: Yup.string()
            .min(6, 'Username must have at least 6 characters')
            .required("Username is required"),
        email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
        password: Yup.string()
            .required("Password is required"),
        passwordConfirm: Yup.string()
            .required("Password confirm is required")
    });

    function submitRegistration(values: RegistrationRequest){
        // send request to backend
        setTimeout(() => {console.log(values)}, 2000);

    }

    return (
        <>
            <Card className="form-container">
                <Card.Body>
                    <Card.Title className="text-center">Create new account</Card.Title>
                        {/* fix displaying errors */}
                        <Formik initialValues={{username: '',email: '', password: '', passwordConfirm: ''}}
                                onSubmit={async (values: RegistrationRequest): Promise<void> => submitRegistration(values)}
                                validationSchema={registrationSchema}>
                            {({errors, isSubmitting, handleSubmit, handleChange}) => (
                                <Form onSubmit={handleSubmit} noValidate>
                                    <FormGroup controlId="username" className="mb-3">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="username" name="username" placeholder="Enter your username" onChange={handleChange}/>
                                        {errors.username && <Alert style={{marginTop: '10px'}} variant="danger">{errors.username}</Alert>}
                                    </FormGroup>
                                    <FormGroup controlId="email" className="mb-3">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" name="email" placeholder="Enter your email" onChange={handleChange}/>
                                        {errors.email && <Alert style={{marginTop: '10px'}} variant="danger">{errors.email}</Alert>}
                                    </FormGroup>
                                    <FormGroup controlId="password" className="mb-3">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" name="password" placeholder="Enter your Password" onChange={handleChange}/>
                                        {errors.password && <Alert style={{marginTop: '10px'}} variant="danger">{errors.password}</Alert>}
                                    </FormGroup>
                                    <FormGroup controlId="passwordConfirm" className="mb-3">
                                        <Form.Label>Confirm password</Form.Label>
                                        <Form.Control type="passwordConfirm" name="passwordConfirm" placeholder="Confirm your password" onChange={handleChange}/>
                                        {errors.passwordConfirm && <Alert style={{marginTop: '10px'}} variant="danger">{errors.passwordConfirm}</Alert>}
                                    </FormGroup>
                                    {/* change button after submitting */}
                                    { !isSubmitting ?
                                        <Button type="submit">Register</Button> :
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