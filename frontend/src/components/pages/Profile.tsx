import {Alert, Button, Col, Form, FormGroup, Row} from "react-bootstrap";
import {useAuthContext} from "../../contexts/AuthContext.tsx";
import {object} from "yup";
import * as Yup from 'yup';
import {Formik} from "formik";
import axios from "axios";
import {environment} from "../../../environment.ts";

export default function Profile(){
    const {user, token} = useAuthContext();

    const dataSchema = object({
        email: Yup.string()
           .email("Invalid email")
           .required("Email is required"),
        username: Yup.string()
            .min(6, "Username must have at least 6 characters")
            .required("Username is required")
    });

    const passwordSchema = Yup.object({
        oldPassword: Yup.string()
            .required("Old password is required"),
        newPassword: Yup.string()
            .required("New pasword is required")
            .notOneOf([Yup.ref('oldPassword')], "New password cannot be old password")
    });

    function submitDataChange(values){
        console.log(values);

        axios.put(environment.apiUrl + "users",
            values,
            {headers: { Authorization: `Bearer ${token}`}})
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.error(err);
            })
    }

    function submitPasswordChange(values){
        console.log(values);

        axios.patch(environment.apiUrl + "users/password",
            values,
            {headers: { Authorization: `Bearer ${token}`}})
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.error(err);
            })
    }

    // TODO Add styling
    // initial values don't work
    return (
      <>
        <h1>{user.username} profile</h1>
          {/* Change email and password */}
          <Formik initialValues={{email: user.email, username: user.username}}
                  validationSchema={dataSchema}
                  onSubmit={async (values) => {submitDataChange(values)}}>
              {({errors, handleChange, handleSubmit}) => (
                  <>
                  <Form noValidate onSubmit={handleSubmit}>
                      <Row className='mb-3'>
                          <Col>
                              <FormGroup controlId="username">
                                  <Form.Control type="username" name="username" placeholder="Enter your username" onChange={handleChange}/>
                                  {errors.username && <Alert style={{marginTop: '10px'}} variant="danger">{errors.username}</Alert>}
                              </FormGroup>
                          </Col>
                          <Col>
                              <FormGroup controlId="email">
                                  <Form.Control type="email" name="email" placeholder="Enter your email" onChange={handleChange}/>
                                  {errors.email && <Alert style={{marginTop: '10px'}} variant="danger">{errors.email}</Alert>}
                              </FormGroup>
                          </Col>
                          <Col>
                            <Button type="submit">Change data</Button>
                          </Col>
                      </Row>
                  </Form>
                  </>
              )}
          </Formik>
          {/* Change password */}
          <Formik initialValues={{oldPassword: "", newPassword: ""}}
                  validationSchema={passwordSchema}
                  onSubmit={async (values) => {submitPasswordChange(values)}}>
              {({errors, handleChange, handleSubmit}) => (
                  <>
                      <Form noValidate onSubmit={handleSubmit}>
                          <Row className='mb-3'>
                              <Col>
                                  <FormGroup controlId="oldPassword">
                                      <Form.Control type="password" name="oldPassword" placeholder="Enter your old password" onChange={handleChange}/>
                                      {errors.oldPassword && <Alert style={{marginTop: '10px'}} variant="danger">{errors.oldPassword}</Alert>}
                                  </FormGroup>
                              </Col>
                              <Col>
                                  <FormGroup controlId="newPassword">
                                      <Form.Control type="password" name="newPassword" placeholder="Enter your new password" onChange={handleChange}/>
                                      {errors.newPassword && <Alert style={{marginTop: '10px'}} variant="danger">{errors.newPassword}</Alert>}
                                  </FormGroup>
                              </Col>
                              <Col>
                                  <Button type="submit">Change password</Button>
                              </Col>
                          </Row>
                      </Form>
                  </>
              )}
          </Formik>
      </>
    );
}