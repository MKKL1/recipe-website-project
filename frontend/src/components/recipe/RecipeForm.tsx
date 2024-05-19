import axios from "axios";
import {environment} from "../../../environment.ts";
import {Button, Card, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {Formik, useFormik} from "formik";
import {useAuthContext} from "../../contexts/AuthContext.tsx";
import {default as React, useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Recipe} from "../../models/Recipe.ts";
import {OutputData} from "@editorjs/editorjs";
import {useNotificationContext} from "../../contexts/NotificationContext.tsx";
import {Variant} from "../../models/Variant.ts";
import Editor from "./Editor.tsx";

export default function RecipeForm(){
    const {pushNotification} = useNotificationContext();
    const {token} = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation();

    const [content, setContent] = useState<{
        time: number, blocks: [], version: string
    }>({blocks: [], time: 0, version: ""});
    const [initData, setInitData] = useState<{
        time: number, blocks: [], version: string
    }>({blocks: [], time: 0, version: ""});
    const [file, setFile] = useState();
    const [editing, setEditing] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [id, setId] = useState<string>("");


    useEffect(() => {
        const state = location.state;

        if(state && state.update){
            const recipe = state.recipe;

            console.log(recipe);

            setEditing(true);
            setTitle(recipe.title);
            setCategory(recipe.category);
            setId(recipe._id);
            setContent(recipe.content);

            // 🤡🤡🤡
            setTimeout(() => {
                console.log('waiting...');
                setInitData(recipe.content);
            }, 50);
        }

    }, [location.state]);

    function handleFile(event: any){
        const files = event.target.files;

        if(files && files[0]){
            if(!files[0].type.startsWith('image/')){
                console.error("Wrong file type");
                pushNotification("File type must be a image", Variant.danger);
                return;
            }

            setFile(event.target.files[0]);
        }
    }

    async function onSubmit(e: any){
        e.preventDefault();

        if(content.blocks.length === 0){
            console.error("Empty content");
            pushNotification("Empty content", Variant.danger);
            return;
        }

        if(file === null){
            console.error("Empty image");
            pushNotification("Empty image", Variant.danger);
            return;
        }

        if(title == "" || category === undefined){
            console.error("Wrong title or cateogry");
            pushNotification("Empty title or category", Variant.danger);
            return;
        }

        console.log(content);

        const recipeData = {
          title: title,
          category: category,
          content: content
        };

        if(editing){
            // editing existing recipe
            axios.put(environment.apiUrl + "recipe/" + id,
                recipeData,
                {headers: { Authorization: `Bearer ${token}` }})
                .then(res => {
                    console.log(res);
                    pushNotification("Recipe updated", Variant.info);
                    navigate('/recipe-details/' + id);
                })
                .catch(err => {
                   console.error(err);
                   pushNotification("Cannot edit recipe", Variant.danger);
                });
        } else {
            // creating new recipe
            let formData = new FormData();
            // @ts-ignore
            formData.append('image', file);
            formData.append('recipe', JSON.stringify(recipeData));

            axios.post(environment.apiUrl + "recipe",
                formData,
                {headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    }})
                .then(res => {
                    pushNotification("Added recipe", Variant.success);
                    navigate(`/recipe-details/${res.data._id}`);
                })
                .catch(err => {
                    console.error(err);
                    pushNotification("Cannot add recipe", Variant.danger);
                });
        }
    }

    function saveTextEditorState(output: OutputData){
        setContent(output);
    }

    return (
        <>
            <Card style={{margin: '100px'}}>
                <Card.Body>
                    <Card.Title className="text-center">Add new recipe</Card.Title>
                        <Form onSubmit={onSubmit} noValidate>
                            <FormGroup controlId="title" className="mb-3">
                                <Form.Label>Recipe title</Form.Label>
                                <Form.Control type="text" name="title" value={title} onChange={e => setTitle(e.target.value)}
                                              placeholder="Enter recipe title"></Form.Control>
                            </FormGroup>
                            <FormGroup className="mb-3">
                                <Form.Select aria-label="Default select example" value={category} name="category" onChange={e => setCategory(e.target.value)}>
                                    <option>Select category</option>
                                    <option value="chleb">Chleb</option>
                                    <option value="bulka">Bułka</option>
                                    <option value="bagieta">Bagieta</option>
                                </Form.Select>
                            </FormGroup>
                            <FormGroup className="mb-3">
                                <FormControl id="file" name="file" type="file" onChange={handleFile}></FormControl>
                            </FormGroup>
                            <Editor saveData={saveTextEditorState} initData={initData}/>
                            <Button type="submit">Save Recipe</Button>
                        </Form>
                </Card.Body>
            </Card>
        </>
    );
}