import axios from "axios";
import {environment} from "../../../environment.ts";
import {Button, Card, Form, FormGroup, FormLabel} from "react-bootstrap";
import {Formik} from "formik";
import {useAuthContext} from "../../contexts/AuthContext.tsx";
import {default as React, useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Recipe} from "../../models/Recipe.ts";
// @ts-ignore
import Header from '@editorjs/header';
// @ts-ignore
import List from '@editorjs/list';
// @ts-ignore
import ImageTool from '@editorjs/image';
import EditorJS, {EditorConfig, OutputData} from "@editorjs/editorjs";
import RecipeElement from "./RecipeElement.tsx";

// TODO validate input
export default function RecipeForm(){
    const navigate = useNavigate();
    const location = useLocation();
    const {token} = useAuthContext();
    // const [data, setData] = useState({});
    const [file, setFile] = useState(null);
    const [recipeToEdit, setRecipeToEdit] = useState(new Recipe('','','','',[], '', Date.prototype));
    // const [editor, setEditor] = useState<EditorJS>();

    const [categories, setCategories] = useState([]);
    const ejInstance = useRef<EditorJS>();

    const initEditor = () => {
        const editor = new EditorJS({
            holder: 'editorjs',
            onReady: () => {
                ejInstance.current = editor;
            },
            autofocus: true,
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
        });
    };

    // loading categories from backend
    useEffect(() => {
        axios.get(environment.apiUrl + 'category/')
            .then(res => {
                console.log(res);
                setCategories(res.data);
            }).catch(err => console.error(err));

    }, []);

    useEffect(() => {
        if (ejInstance.current === null) {
            initEditor();
        }

        if(location.state && location.state.update) {
            ejInstance?.current?.render({blocks: location.state.recipe.blocks})
        }

        return () => {
            ejInstance?.current?.destroy();
            // @ts-ignore
            ejInstance.current = null;
        };
    }, []);

    function handleFile(event: any){
        if(event.target.files){
            setFile(event.target.files[0]);
        }
    }

    async function onSubmit(values: any, data: Promise<OutputData>){

        console.log(values);

        //TODO add error in ui
        const adata = await data;
        console.log(adata);
        if(adata.blocks.length === 0){
            console.error("Empty content");
            return;
        }

        //TODO add error in ui
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
          category_id: values.category,
          content: adata
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
                    <Formik initialValues={{title: '', file: null}} onSubmit={values => onSubmit(values, ejInstance?.current?.save())}>
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
                                        {/*<option value="chleb">Chleb</option>*/}
                                        {/*<option value="bulka">Bułka</option>*/}
                                        {/*<option value="bagieta">Bagieta</option>*/}
                                        {categories.map((category, index) => (
                                            <option key={index} value={category._id}>{category.name}</option>
                                        ))}
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