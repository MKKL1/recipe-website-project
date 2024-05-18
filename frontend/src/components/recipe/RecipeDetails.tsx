import {Recipe} from "../../models/Recipe.ts";
import {Button, Container, Image, Modal, Row, Stack} from "react-bootstrap";
import {useAuthContext} from "../../contexts/AuthContext.tsx";
import Comments from "../comment/Comments.tsx";
import {environment} from "../../../environment.ts";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import RecipeContent from "./RecipeContent.tsx";
import '../../styles/style.scss'
import {useNotificationContext} from "../../contexts/NotificationContext.tsx";
import {Variant} from "../../models/Variant.ts";

export default function RecipeDetails(){
    let {id} = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const {user, isAuth, token} = useAuthContext();
    const {pushNotification} = useNotificationContext();

    const [recipe, setRecipe] = useState(new Recipe('','','','',[], '', Date.prototype));
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showConfirm, setShowConfirm] = useState(false);

    const handleCloseConfirm = () => setShowConfirm(false);
    const handleShowConfirm = () => setShowConfirm(true);

    useEffect(() => {
        axios.get(`${environment.apiUrl}recipe/${id}`) // Use environment variables for API URL
            .then(res => {
                console.log("recipe: ");
                console.log(res);
                setRecipe(res.data);
                console.log(res.data);
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
        <Container className="px-4 px-lg-5 my-5 w-50">
            <Row>
                <Image src={environment.apiUrl + "image/" + recipe.image_id} className="img-fluid"/>
            </Row>

            <Row>
                <div className="col-12 col-md-8">
                    <div className="recipe-headline my-5">
                        {/*<span>{recipe.updatedAt.toDateString()}</span>*/}
                        <h2>{recipe.title}</h2>
                    </div>
                    {   isAuth && user.roles.includes("admin") && user.id === recipe.author_id &&
                        <Button onClick={handleShowConfirm} variant="danger">Delete recipe</Button>
                    }
                </div>
            </Row>
            <div>
                {/* Display content */}
                <RecipeContent data={recipe.content}/>
                {/*  Comments section  */}
                <Comments commentsProp={recipe.comments} recipeId={recipe._id}/>
                {/* Modal for delete confirmation*/}
                <Modal show={showConfirm} onHide={handleCloseConfirm} animation={false}>
                    <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h1>Are you sure you want to delete this recipe?</h1>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseConfirm}>
                                Close
                            </Button>
                            <Button variant="danger" onClick={onDelete}>
                                Delete recipe
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
        </Container>
    );
}