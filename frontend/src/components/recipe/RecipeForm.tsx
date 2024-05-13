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
    const [file, setFile] = useState(null);

    function handleFile(event: any){
        if(event.target.files){
            setFile(event.target.files[0]);
        }
    }

    async function onSubmit(values){
        console.log(values);
        console.log(token);
        console.log(data);
        console.log(file);

        const recipeData = {
          title: values.title,
          content: data
        };

        // can't send formdata to backend -> returns error
        let formData = new FormData();
        // @ts-ignore
        formData.append('image', file);
        formData.append('recipe', JSON.stringify(recipeData));

        // TODO handle response
        axios.post(environment.apiUrl + "recipe",
            formData,
            {headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }})
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.error(err);
            });
    }

    function saveTextEditorState(outputData: OutputData){
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
                                    <input id="file" name="file" type="file" onChange={handleFile}/>
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