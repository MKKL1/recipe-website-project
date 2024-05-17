import axios from "axios";
import {environment} from "../../../environment.ts";
import {Button, Card, Form, FormGroup, FormLabel} from "react-bootstrap";
import {Formik} from "formik";
import {useAuthContext} from "../../contexts/AuthContext.tsx";
import {default as React, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Recipe} from "../../models/Recipe.ts";
// @ts-ignore
import Header from '@editorjs/header';
// @ts-ignore
import List from '@editorjs/list';
// @ts-ignore
import ImageTool from '@editorjs/image';
import EditorJS, {EditorConfig, OutputData} from "@editorjs/editorjs";

// TODO validate input
export default function RecipeForm(){
    const navigate = useNavigate();
    const location = useLocation();
    const {token} = useAuthContext();
    // const [data, setData] = useState({});
    const [file, setFile] = useState(null);
    const [recipeToEdit, setRecipeToEdit] = useState(new Recipe('','','','',[], '', Date.prototype));
    const [editor, setEditor] = useState<EditorJS>(new EditorJS({
        holder: 'editorjs',
        tools: {
            header: Header,
            list: List,
            image: {
                class: ImageTool,
                config: {
                    endpoints: {
                        byFile: environment.apiUrl + "image",
                        byUrl: environment.apiUrl + "image"
                    }
                }
            }
        },
        onReady: () => {
            console.log('Editor.js is ready to work!');
        }
    }));
    // checking if entered in editing mode
    // if so initialize fields with data
    useEffect(() => {

        if(!location.state || !location.state.update){
            return;
        }

        console.log(location.state.recipe);

        if(editor.render) {
            editor.render({blocks: location.state.recipe.blocks});
        }
        // don't work because async
        // setRecipeToEdit(location.state.recipe);
    }, []);

    function handleFile(event: any){
        if(event.target.files){
            setFile(event.target.files[0]);
        }
    }

    async function onSubmit(values: any, data: Promise<OutputData>){
        // add error in ui
        if(Object.keys(data).length === 0){
            console.error("Empty content");
            return;
        }

        // add error in ui
        if(file === null){
            console.error("Empty image");
            return;
        }

        if(values.title == "" || values.category == ""){
            console.error("Wrong title or cateogry");
            return;
        }
        const recipeData = {
          title: values.title,
          category: values.category,
          content: await data
        };

        let formData = new FormData();
        // @ts-ignore
        formData.append('image', file);
        formData.append('recipe', JSON.stringify(recipeData));

        // TODO handle error
        axios.post(environment.apiUrl + "recipe",
            formData,
            {headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }})
            .then(res => {
                navigate(`/recipe-details/${res.data._id}`);
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
                    <Formik initialValues={{title: '', file: null}} onSubmit={values => onSubmit(values, editor.save())}>
                        {({handleSubmit, handleChange}) => (
                            <Form onSubmit={handleSubmit} noValidate>
                                <FormGroup controlId="title" className="mb-3">
                                    <Form.Label>Recipe title</Form.Label>
                                    <Form.Control type="text" name="title" onChange={handleChange}
                                                  placeholder="Enter recipe title"></Form.Control>
                                </FormGroup>
                                <FormGroup>
                                    <Form.Select aria-label="Default select example" name="category" onChange={handleChange}>
                                        <option>Select category</option>
                                        <option value="chleb">Chleb</option>
                                        <option value="bulka">Bułka</option>
                                        <option value="bagieta">Bagieta</option>
                                    </Form.Select>
                                </FormGroup>
                                <FormGroup>
                                    <input id="file" name="file" type="file" onChange={handleFile}/>
                                </FormGroup>

                                <FormGroup>
                                    <Form.Label>Content</Form.Label>
                                    <div id="editorjs" className="editor"></div>
                                </FormGroup>

                                <Button type="submit">Add Recipe</Button>
                            </Form>
                        )}
                    </Formik>

                    {/*<Editor onSave={saveTextEditorState} readOnly={false} initData={recipeToEdit.content}/>*/}
                </Card.Body>
            </Card>
        </>
    );
}