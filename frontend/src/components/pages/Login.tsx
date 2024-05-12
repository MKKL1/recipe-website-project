import {Alert, Button, Card, Form, FormGroup, Spinner} from "react-bootstrap";
import {LoginRequest} from "../../models/LoginRequest.ts";
import {Formik} from "formik";
import * as Yup from 'yup';
import {object} from "yup";

export default function Login(){
    const loginSchema = object({
        email: Yup.string()
            .required("Email is required")
            .email("Invalid email"),
        password: Yup.string()
            .required("Password is required")
    });

    function submitLogin(values: LoginRequest){
        console.log(values);
        // send request to backend
    }

    return (
        <>
            <Card className="form-container">
                <Card.Body>
                    <Card.Title className="text-center">Sign in</Card.Title>
                    <Formik initialValues={{email: '', password: ''}}
                            onSubmit={async (values: LoginRequest): Promise<void> => {submitLogin(values)}}
                            validationSchema={loginSchema}>
                        {({errors, isSubmitting, handleSubmit, handleChange}) => (
                            <Form onSubmit={handleSubmit} noValidate>
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