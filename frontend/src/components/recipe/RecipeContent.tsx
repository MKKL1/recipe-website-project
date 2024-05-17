import edjsHTML from "editorjs-html";
import {OutputData} from "@editorjs/editorjs";
import '../../styles/style.scss'

const edjsParser = edjsHTML();
export default function RecipeContent({data}: {data: OutputData}) {
    if (data === undefined)
        return <div>No data</div>
    let html;
    try {
        html = edjsParser.parse(data);
    } catch (e) {
        return <div>Invalid</div>
    }
    if (!html) return <div>Invalid</div>
    return (
        <div className="recipe-content img-fluid">
            {html.map((block, index) => (
                <div key={index} dangerouslySetInnerHTML={{__html: block}}/>
            ))}
        </div>
    )
}