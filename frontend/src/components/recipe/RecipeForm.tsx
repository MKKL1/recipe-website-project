import axios from "axios";
import {environment} from "../../../environment.ts";
import {Button, Card, Form, FormGroup, FormLabel} from "react-bootstrap";
import {Formik} from "formik";
import {useAuthContext} from "../../contexts/AuthContext.tsx";
import {createReactEditorJS} from "react-editor-js";
import Editor from "./RecipeEditor.tsx";
import {useState} from "react";

// two editors are made and one is broken
export default function RecipeForm(){
    const {token} = useAuthContext();
    const ReactEditorJs = createReactEditorJS();
    const [data, setData] = useState( {
        time: 1635603431943,
        blocks: [
            {
                id: "-MhwnSs3Dw",
                type: "header",
                data: {
                    text: "What does it mean «block-styled editor»"
                }
            },
            {
                id: "Ptb9oEioJn",
                type: "paragraph",
                data: {
                    text:
                        'Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class="cdx-marker">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor\'s Core.'
                }
            }
        ]
    });

    async function onSubmit(values){
        console.log(values);
        console.log(token);

        let formData = new FormData();
        formData.append('title', values.title);
        formData.append('image', values.image);

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
                    <Editor data={data} setData={setData}/>
                </Card.Body>
            </Card>
        </>
    );
}