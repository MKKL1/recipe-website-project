import axios from "axios";
import {environment} from "../../../environment.ts";
import {Button, Card, Form, FormGroup, FormLabel} from "react-bootstrap";
import {Formik} from "formik";
import {useAuthContext} from "../../contexts/AuthContext.tsx";
import {createReactEditorJS} from "react-editor-js";
import Editor from "./RecipeEditor.tsx";
import {useState} from "react";
import {OutputData} from "@editorjs/editorjs";

// two editors are made and one is broken
export default function RecipeForm(){
    const {token} = useAuthContext();
    const [data, setData] = useState({});

    async function onSubmit(values){
        console.log(values);
        console.log(token);
        console.log(data);

        // can't send formdata to backend -> returns error
        let formData = new FormData();
        formData.append('title', values.title);
        //formData.append('image', values.image);
        formData.append('image', "aaaaaa");
        //formData.append('content', JSON.stringify(data));
        formData.append('content', JSON.stringify(data));

        // TODO handle response
        axios.post(environment.apiUrl + "recipe",
            {
                title: values.title,
                content: JSON.stringify(data),
                // cannot send image
                image_id: 'dsadsadsadsa'
            },
            {headers: {
                Authorization: `Bearer ${token}`
                //"Content-Type": "multipart/form-data"
            }})
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.error(err);
            });
    }

    function saveTextEditorState(outputData: OutputData){
        console.log("w recipeform: ", data);
        setData(outputData);
    }

    return (
        <>
            <Card style={{margin: '100px'}}>
                <Card.Body>
                    <Card.Title className="text-center">Add new recipe</Card.Title>
                    <Formik initialValues={{title: '', file: null}}
                        onSubmit={onSubmit}>
                        {({setFieldValue, handleSubmit, handleChange}) => (
                            <Form onSubmit={handleSubmit} noValidate>
                                <FormGroup controlId="title" className="mb-3">
                                    <Form.Label>Recipe title</Form.Label>
                                    <Form.Control type="text" name="title" onChange={handleChange} placeholder="Enter recipe title"></Form.Control>
                                </FormGroup>
                                <FormGroup>
                                    <input id="file" name="file" type="file" onChange={(event) => {
                                        // @ts-ignore
                                        setFieldValue("file", event.currentTarget.files[0]);
                                    }}/>
                                </FormGroup>
                                <Button type="submit">Add Recipe</Button>
                            </Form>
                        )}
                    </Formik>
                    <Editor onSave={saveTextEditorState}/>
                </Card.Body>
            </Card>
        </>
    );
}