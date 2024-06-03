import axios from "axios";
import {environment} from "../../../environment.ts";
import {Button, Card, Form, FormGroup, Image} from "react-bootstrap";
import {useAuthContext} from "../../contexts/AuthContext.tsx";
import {default as React, useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
// @ts-ignore
import Header from '@editorjs/header';
// @ts-ignore
import List from '@editorjs/list';
// @ts-ignore
import ImageTool from '@editorjs/image';
import EditorJS, {API, EditorConfig, OutputData} from "@editorjs/editorjs";
import RecipeElement from "./RecipeElement.tsx";
import {useNotificationContext} from "../../contexts/NotificationContext.tsx";
import {Variant} from "../../models/Variant.ts";

export default function RecipeForm(){
    const navigate = useNavigate();
    const location = useLocation();
    const {token} = useAuthContext();
    const {pushNotification} = useNotificationContext();
    const [file, setFile] = useState(null);
    const [editing, setEditing] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const [id, setId] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [content, setContent] = useState<OutputData>();
    const [image_id, set_image_id] = useState("");
    const [categories, setCategories] = useState([]);

    const editorRef = useRef<EditorJS>();

    const initEditor = (contenti) => {
        const editor = new EditorJS({
            holder: 'editorjs',
            onReady: () => {
                console.log("content w init", contenti);
                editor.render(contenti);
                editorRef.current = editor;
            },
            onChange(api: API, event: any) {
                if(editorRef.current){
                    editorRef.current?.save().then((data: OutputData) => {
                        setContent(data);
                    }).catch(err => {
                        console.log(err);
                        pushNotification("Cannot save text from editor", Variant.danger);
                    })
                }
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
                setCategories(res.data);
            }).catch(err => console.error(err));

    }, []);

    useEffect(() => {

        const state = location.state;
        let contenti = undefined;

        if(state && state.update){
            const recipe = state.recipe;

            setEditing(true);
            setTitle(recipe.title);
            setCategory(recipe.category);
            setId(recipe._id);
            set_image_id(recipe.image_id);

            if(location.state && location.state.update) {
                console.log(recipe.content);
                contenti = recipe.content;
                setContent(content);
            }
        }

        if (editorRef.current === null) {
            initEditor(contenti);
        }   

        // why here??
        if(location.state && location.state.update) {
            console.log("content", contenti);
            editorRef?.current?.render(contenti);
        }

        return () => {
            editorRef?.current?.destroy();
            // @ts-ignore
            editorRef.current = null;
        };
    }, []);

    // init data if editing
    useEffect(() => {
        
    }, []);

    function handleFile(event: any){
        if(event.target.files){
            setFile(event.target.files[0]);
        }
    }

    async function onSubmit(){
        console.log(content);

        if(content === undefined || content.blocks.length === 0){
            console.error("Empty content");
            pushNotification("Empty content", Variant.danger);
            return;
        }

        if(!editing && file === null){
            console.error("Empty image");
            pushNotification("Empty image", Variant.danger);
            return;
        }

        if(title == ""){
            console.error("Empty title");
            pushNotification("Empty title", Variant.danger);
            return;
        }

        if(category == ""){
            console.error("Empty category");
            pushNotification("Empty category", Variant.danger);
            return;
        }

        const recipeData = {
          title: title,
          category_id: category,
          content: content
        };

        let formData = new FormData();
        // @ts-ignore
        formData.append('image', file);
        formData.append('recipe', JSON.stringify(recipeData));

        console.log(recipeData);

        if(editing){
            axios.put(environment.apiUrl + "recipe/" + id,
                formData,
                {headers: { Authorization: `Bearer ${token}`}})
                .then(res => {
                    console.log(res);
                    pushNotification("Updated recipe", Variant.success);
                    navigate(`/recipe-details/${id}`);
                })
                .catch(err => {
                    console.error(err);
                    pushNotification("Cannot update recipe", Variant.danger);
                })
        } else {
            axios.post(environment.apiUrl + "recipe",
                formData,
                {headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    }})
                .then(res => {
                    pushNotification("Added new recipe", Variant.success);
                    navigate(`/recipe-details/${res.data._id}`);
                })
                .catch(err => {
                    console.error(err);
                    pushNotification("Cannot add recipe", Variant.danger);
                });
        }
    }

    return (
        <>
            <Card style={{margin: '100px'}}>
                <Card.Body>
                    <Card.Title className="text-center">Add new recipe</Card.Title>
                        <Form noValidate>
                            <FormGroup controlId="title" className="mb-3">
                                <Form.Label>Recipe title</Form.Label>
                                <Form.Control type="text" name="title" value={title} onChange={e => setTitle(e.target.value)}
                                              placeholder="Enter recipe title"></Form.Control>
                            </FormGroup>
                            <FormGroup>
                                <Form.Select aria-label="Default select example" value={category._id} name="category" onChange={e => setCategory(e.target.value)}>
                                    <option>Select category</option>
                                    {categories.map((category, index) => (
                                        <option key={index} value={category._id}>{category.name}</option>
                                    ))}
                                </Form.Select>
                            </FormGroup>
                            <FormGroup>
                                <input id="file" className="form-control mt-3" name="file" type="file" onChange={handleFile}/>
                            </FormGroup>
                            {   editing &&
                                <Image src={environment.apiUrl + "image/" + image_id} className="img-fluid"/>
                            }
                            <FormGroup>
                                <Form.Label>Content</Form.Label>
                                <div id="editorjs" className="editor"></div>
                            </FormGroup>
                            <Button onClick={onSubmit}>{editing ? 'Edit' : 'Add'} Recipe</Button>
                        </Form>
                    {/*<Editor onSave={saveTextEditorState} readOnly={false} initData={recipeToEdit.content}/>*/}
                </Card.Body>
            </Card>
        </>
    );
}