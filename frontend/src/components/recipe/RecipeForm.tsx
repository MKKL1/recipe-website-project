import axios from "axios";
import {environment} from "../../../environment.ts";
import {Button, Card, Form, FormGroup, FormLabel} from "react-bootstrap";
import {Formik} from "formik";
import {useAuthContext} from "../../contexts/AuthContext.tsx";
import Editor from "./RecipeEditor.tsx";
import {useEffect, useState} from "react";
import {OutputData} from "@editorjs/editorjs";
import {useLocation, useNavigate} from "react-router-dom";
import {Recipe} from "../../models/Recipe.ts";

// TODO validate input
export default function RecipeForm(){
    const navigate = useNavigate();
    const location = useLocation();
    const {token} = useAuthContext();
    const [data, setData] = useState({});
    const [file, setFile] = useState(null);
    const [recipeToEdit, setRecipeToEdit] = useState(new Recipe('','','',[],''));

    // FOR EDITTING MODE
    // checking if entered in editing mode
    // if so initialize fields with data
    useEffect(() => {
        if(!location.state || !location.state.update){
            return;
        }

        console.log(location.state.recipe);
        // don't work because async
        setRecipeToEdit(location.state.recipe);
    }, []);

    function handleFile(event: any){
        if(event.target.files){
            setFile(event.target.files[0]);
        }
    }

    async function onSubmit(values: any){
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
            content: data
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
                navigate('/recipe-details', {state: {recipeId: res.data._id}});
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
                        {({handleSubmit, handleChange}) => (
                            <Form onSubmit={handleSubmit} noValidate>
                                <FormGroup controlId="title" className="mb-3">
                                    <Form.Label>Recipe title</Form.Label>
                                    <Form.Control type="text" name="title" onChange={handleChange} placeholder="Enter recipe title"></Form.Control>
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
                                <Button type="submit">Add Recipe</Button>
                            </Form>
                        )}
                    </Formik>
                    <Editor onSave={saveTextEditorState} readOnly={false} initData={recipeToEdit.content}/>
                </Card.Body>
            </Card>
        </>
    );
}