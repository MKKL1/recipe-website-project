import {RecipeOverview} from "../../models/RecipeOverview.ts";
import {environment} from "../../../environment.ts";
import {Badge, Card} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import '../../styles/style.scss'

export default function RecipeElement({recipe}: {recipe: RecipeOverview}){
    const navigate = useNavigate();

    console.log(recipe._id);

    return (

        <Card className="h-100 recipe-element" onClick={() => navigate(`/recipe-details/${recipe._id}`)}>
            <div className="thumbnail">
                <div className="image">
                    <Card.Img variant="top" src={environment.apiUrl + "image/" + recipe.image_id}
                             style={{width: '300px', height: "auto"}} alt={recipe.title}/>
                </div>
            </div>
            <Card.Body>
                <Card.Title>{recipe.title}</Card.Title>
                <Card.Text>
                    <Badge pill bg="secondary" className="me-1">{new Date(recipe.createdAt).toLocaleDateString('pl-PL')}</Badge>
                    <Badge pill>{recipe.category.name}</Badge>
                </Card.Text>
            </Card.Body>
        </Card>
);
}