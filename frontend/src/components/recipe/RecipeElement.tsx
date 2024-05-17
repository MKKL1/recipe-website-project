import {RecipeOverview} from "../../models/RecipeOverview.ts";
import {environment} from "../../../environment.ts";
import {Card} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export default function RecipeElement({recipe}: {recipe: RecipeOverview}){
    // image_id is same as id
    // image cant be loaded
    const navigate = useNavigate();

    return (
        // <>
        //     <h1>Recipe</h1>
        //     <img src={environment.apiUrl + "image/" + recipe.image_id} alt={recipe.title}
        //     style={{width: 200, height: 200}}/>
        //     <p>Title {recipe.title}</p>
        //     <p>Author {recipe.author_id}</p>
        //     <p>Image {recipe.image_id}</p>
        //     <p>Id {recipe.id}</p>
        // </>

    <Card className="h-100" onClick={() =>  navigate(`/recipe-details/${recipe.id}`) }>
        <Card.Img variant="top" src={environment.apiUrl + "image/" + recipe.image_id} alt={recipe.title} className=" img-responsive full-width"/>
        <Card.Body>
            <Card.Title>{recipe.title}</Card.Title>

            <Card.Text>
                {recipe.description}
            </Card.Text>
            {/*<Button variant="primary">Go somewhere</Button>*/}
        </Card.Body>
    </Card>
    );
}