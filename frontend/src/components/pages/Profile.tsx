import {Alert, Button, Card, Col, Container, Form, FormGroup, Modal, Row, Stack} from "react-bootstrap";
import {useAuthContext} from "../../contexts/AuthContext.tsx";
import {object} from "yup";
import * as Yup from 'yup';
import {Formik} from "formik";
import axios from "axios";
import {environment} from "../../../environment.ts";
import {useEffect, useState} from "react";
import {User} from "../../models/User.ts";
import Notification from "../Notification.tsx";
import {useNotificationContext} from "../../contexts/NotificationContext.tsx";
import {Variant} from "../../models/Variant.ts";
import {useNavigate} from "react-router-dom";

export default function Profile(){
    const {user, token, resetToken} = useAuthContext();
    const {pushNotification} = useNotificationContext();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

    // TODO handle response
    function submitDataChange(values){
        console.log(values);

        axios.put(environment.apiUrl + "users",
            values,
            {headers: { Authorization: `Bearer ${token}`}})
            .then(res => {
                console.log(res);
                pushNotification('Changed user data',Variant.info);
            })
            .catch(err => {
                console.error(err);
                pushNotification("Cannot change user data", Variant.danger);
            })
    }

    function submitPasswordChange(values){
        console.log(values);

        axios.patch(environment.apiUrl + "users/password",
            values,
            {headers: { Authorization: `Bearer ${token}`}})
            .then(res => {
                console.log(res);
                pushNotification('Changed password',Variant.info);
            })
            .catch(err => {
                console.error(err);
                pushNotification("Cannot change password", Variant.danger);
            })
    }

    function onDeleteAccount(){
        axios.delete(environment.apiUrl + "users",
            {headers: { Authorization: `Bearer ${token}`}})
            .then(res => {
                console.log(res);
                resetToken();
                pushNotification('Deleted account',Variant.info);
                navigate("/");
            })
            .catch(err => {
                console.error(err);
                pushNotification("Cannot delete user", Variant.danger);
            });
    }

    // TODO Add styling
    // initial values don't work
    return (
      <Container className="d-flex flex-column justify-content-start align-items-start" style={{ height: '90vh', marginTop: '10vh' }}>
          <Card>
              <Card.Body>
                  <h1>{user.username} profile</h1>
                  {/* Change email and username */}
                  <Formik initialValues={{email: '', username: ''}}
                          validationSchema={dataSchema} enableReinitialize={true}
                          onSubmit={async (values) => {
                              submitDataChange(values)
                          }}>
                      {({touched, errors, handleChange, handleSubmit, handleBlur}) => (
                          <>
                              <Form noValidate onSubmit={handleSubmit}>
                                  <Row className='mb-3'>
                                      <Col xs={12} md={4} className="mb-3 mb-md-0">
                                          <FormGroup controlId="username">
                                              <Form.Control type="username" name="username"
                                                            placeholder="Enter your username" onChange={handleChange}
                                                            onBlur={handleBlur}/>
                                              {touched.username && errors.username && <Alert style={{marginTop: '10px'}}
                                                                                             variant="danger">{errors.username}</Alert>}
                                          </FormGroup>
                                      </Col>
                                      <Col xs={12} md={4} className="mb-3 mb-md-0">
                                          <FormGroup controlId="email">
                                              <Form.Control type="email" name="email" placeholder="Enter your email"
                                                            onChange={handleChange} onBlur={handleBlur}/>
                                              {touched.email && errors.email && <Alert style={{marginTop: '10px'}}
                                                                                       variant="danger">{errors.email}</Alert>}
                                          </FormGroup>
                                      </Col>
                                      <Col xs={12} md={4}>
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
                          onSubmit={async (values) => {
                              submitPasswordChange(values)
                          }}>
                      {({errors, touched, handleChange, handleBlur, handleSubmit}) => (
                          <>
                              <Form noValidate onSubmit={handleSubmit}>
                                  <Row className='mb-3'>
                                      <Col xs={12} md={4} className="mb-3 mb-md-0">
                                          <FormGroup controlId="oldPassword">
                                              <Form.Control type="password" name="oldPassword"
                                                            placeholder="Enter your old password"
                                                            onChange={handleChange} onBlur={handleBlur}/>
                                              {touched.oldPassword && errors.oldPassword &&
                                                  <Alert style={{marginTop: '10px'}}
                                                         variant="danger">{errors.oldPassword}</Alert>}
                                          </FormGroup>
                                      </Col >
                                      <Col xs={12} md={4} className="mb-3 mb-md-0">
                                          <FormGroup controlId="newPassword">
                                              <Form.Control type="password" name="newPassword"
                                                            placeholder="Enter your new password"
                                                            onChange={handleChange} onBlur={handleBlur}/>
                                              {touched.newPassword && errors.newPassword &&
                                                  <Alert style={{marginTop: '10px'}}
                                                         variant="danger">{errors.newPassword}</Alert>}
                                          </FormGroup>
                                      </Col>
                                      <Col xs={12} md={4}>
                                          <Button type="submit">Change password</Button>
                                      </Col>
                                  </Row>
                              </Form>
                          </>
                      )}
                  </Formik>
                  <Button variant="danger" onClick={handleShow}>Delete your account</Button>
              </Card.Body>
          </Card>

          <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                  <Modal.Title>Deleting account</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <p>Are you sure you want to delete your account?</p>
              </Modal.Body>
              <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                  <Button variant="danger" onClick={onDeleteAccount}>Delete</Button>
              </Modal.Footer>
          </Modal>
      </Container>
    );
}