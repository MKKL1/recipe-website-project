import {RecipeOverview} from "../../models/RecipeOverview.ts";
import {environment} from "../../../environment.ts";
import {Card} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import '../../styles/style.scss'

export default function RecipeElement({recipe}: {recipe: RecipeOverview}){
    const navigate = useNavigate();

    return (

        <Card className="h-100 recipe-element" onClick={() => navigate(`/recipe-details/${recipe.id}`)}>
            <div className="thumbnail">
                <div className="image">
                    <Card.Img variant="top" src={environment.apiUrl + "image/" + recipe.image_id} alt={recipe.title}
                              className=" img-responsive full-width"/>
                </div>
            </div>

            {/* add more info*/}
            <Card.Body>
                <Card.Title>{recipe.title}</Card.Title>
                {/* description doesn't exist*/}
                <Card.Text>{recipe.description}</Card.Text>
            </Card.Body>
        </Card>
);
}