import {Recipe} from "../../models/Recipe.ts";
import {Badge, Button, Container, Image, Modal, Row, Stack} from "react-bootstrap";
import {useAuthContext} from "../../contexts/AuthContext.tsx";
import Comments from "../comment/Comments.tsx";
import {environment} from "../../../environment.ts";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import RecipeContent from "./RecipeContent.tsx";
import '../../styles/style.scss'
import {useNotificationContext} from "../../contexts/NotificationContext.tsx";
import {Variant} from "../../models/Variant.ts";
import "../../styles/recipes.css";
import UserOverviewDTO from "../../models/UserOverviewDTO.ts";

export default function RecipeDetails(){
    let {id} = useParams();
    const navigate = useNavigate();
    const {user, isAuth, token} = useAuthContext();
    const {pushNotification} = useNotificationContext();

    const [recipe, setRecipe] = useState(new Recipe());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showConfirm, setShowConfirm] = useState(false);

    const handleCloseConfirm = () => setShowConfirm(false);
    const handleShowConfirm = () => setShowConfirm(true);

    useEffect(() => {
        axios.get(`${environment.apiUrl}recipe/${id}`) // Use environment variables for API URL
            .then(res => {
                console.log(res.data);
                setRecipe(res.data);
            })
            .catch(err => {
                setError(err);
                console.error(err);
                pushNotification("Cannot load recipe", Variant.danger);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    function onEdit(){
        console.log("Editing...");
        // add editing
        navigate('/add', {
            state: {
                update: true,
                recipe: recipe
            }
        });
    }

    function onDelete(){
        console.log("Deleting...");
        // add deleting
        axios.delete(environment.apiUrl + "recipe/" + recipe._id,
            {headers: { Authorization: `Bearer ${token}`}})
            .then(res => {
                console.log(res);
                pushNotification("Deleted recipe", Variant.info);
                navigate('/recipes');
            })
            .catch(err => {
                console.log(err);
                pushNotification("Error during deleting recipe", Variant.danger);
            })
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!recipe) return <div>No recipe found</div>;

    return (
        // Add breakpoint for width
        <Container className="px-4 px-lg-5 my-5 w-50">
            <Row>
                <Image src={environment.apiUrl + "image/" + recipe.image_id} className="img-fluid"/>
            </Row>
            <Row>
                <Stack direction="horizontal" className="col-12 col-md-8 w-100 justify-content-between">
                    <div className="recipe-headline my-5">
                        <h2 className="p-0 m-0">{recipe.title}</h2>
                    </div>
                    {isAuth && user.roles.includes("admin") && user.id === recipe.author._id &&
                        <div className="my-5">
                            <Button onClick={onEdit} className="mx-2">Edit</Button>
                            <Button onClick={handleShowConfirm} variant="danger">Delete</Button>
                        </div>
                    }
                </Stack>
                <div>
                    <Badge pill bg="secondary" style={{color: 'white', marginRight: '5px'}}>{
                        new Date(recipe.createdAt == recipe.updatedAt ? recipe.createdAt : recipe.updatedAt).toLocaleString('pl-PL')
                    }</Badge>
                    <Badge pill>{recipe.category.name}</Badge>
                </div>
                <p>Author: {recipe.author.username}</p>
            </Row>
            <div>
                {/* Display content */}
                <RecipeContent data={recipe.content}/>
                {/*  Comments section  */}
                <Comments commentsProp={recipe.comments} recipeId={recipe._id}/>
                {/* Modal for delete confirmation*/}
                <Modal show={showConfirm}
                       aria-labelledby="contained-modal-title-vcenter"
                       centered
                       onHide={handleCloseConfirm}>
                    <Modal.Header closeButton>
                        <Modal.Title>Deleting recipe</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Are you sure you want to delete this recipe?</h4>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseConfirm}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={onDelete}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </Container>
    );
}