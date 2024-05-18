import "../../styles/Home.css";
import {Button, Image} from "react-bootstrap";
import {Link} from "react-router-dom";
export default function Home(){

    // make something better
    return (
        <div className="home">
            <div className="content-container">
                <div className="left">
                    <h1>Big text</h1>
                    <p>some description</p>
                    <Button as={Link} to="/recipes">Get started</Button>
                </div>
            </div>
            <div className="content-container">
                <div className="right"><Image className="landing-image" src="public/bread.jpg" rounded/></div>
            </div>
        </div>
    );
}