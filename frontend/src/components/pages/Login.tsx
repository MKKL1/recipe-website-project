import {Alert, Button, Card, Container, Form, FormGroup, Spinner} from "react-bootstrap";
import {LoginRequest} from "../../models/LoginRequest.ts";
import {Formik} from "formik";
import * as Yup from 'yup';
import {object} from "yup";
import axios from "axios";
import {environment} from "../../../environment.ts";
import { useAuthContext} from "../../contexts/AuthContext.tsx";
import {useNavigate} from "react-router-dom";
import {useNotificationContext} from "../../contexts/NotificationContext.tsx";
import {Variant} from "../../models/Variant.ts";


export default function Login(){
    const {updateToken} = useAuthContext();
    const {pushNotification} = useNotificationContext();
    const navigate = useNavigate();

    const loginSchema = object({
        username: Yup.string()
            .required("Username is required"),
        password: Yup.string()
            .required("Password is required")
    });

    function submitLogin(values: LoginRequest, setSubmitting: (isSubmitting: boolean) => void){
        console.log(values);

        // send request to backend
        axios.post(environment.apiUrl + "auth/login", values)
            .then(res => {
                const accessToken = res.data.access_token;
                updateToken(accessToken);
                setSubmitting(false);
                pushNotification("Succesfully logged in", Variant.info);
                navigate('/recipes');
            })
            .catch(err => {
                setSubmitting(false);
                console.error(err);
                // check why error occurs
                const message = err.response?.status === 401 ?
                    'User with this username and password doesnt exist' : 'Error during logging in';

                pushNotification(message, Variant.danger);
            });
    }

    return (
        <>
            <Container className="d-flex justify-content-center align-items-center" style={{ height: '90vh' }}>
                <Card style={{ width: '50rem', height: '30rem' }}>
                    <Card.Body style={{display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Card.Title className="text-center">Sign in</Card.Title>
                        <Formik initialValues={{username: '', password: ''}}
                                onSubmit={(values, { setSubmitting }) => {
                                    submitLogin(values, setSubmitting);
                                }}
                                validationSchema={loginSchema}>
                            {({errors, touched, dirty, isSubmitting,isValid , handleSubmit, handleChange, handleBlur}) => (
                                <Form onSubmit={handleSubmit} noValidate>
                                    <FormGroup controlId="username" className="mb-3">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="username" name="username" placeholder="Enter your username" onChange={handleChange} onBlur={handleBlur}/>
                                        {touched.username && errors.username && <Alert style={{marginTop: '10px'}} variant="danger">{errors.username}</Alert>}
                                    </FormGroup>
                                    <FormGroup controlId="password" className="mb-3">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" name="password" placeholder="Enter your Password" onChange={handleChange} onBlur={handleBlur}/>
                                        {touched.password && errors.password && <Alert style={{marginTop: '10px'}} variant="danger">{errors.password}</Alert>}
                                    </FormGroup>
                                    {/* change button after submitting */}
                                    { isSubmitting ?
                                        <Button variant="primary" disabled>
                                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/> Loading...
                                        </Button> :
                                        <Button type="submit" disabled={isSubmitting || !isValid || !dirty}>Sign in</Button>
                                    }
                                </Form>
                            )}
                        </Formik>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}