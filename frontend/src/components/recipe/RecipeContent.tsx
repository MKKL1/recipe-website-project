import edjsHTML from "editorjs-html";
import {OutputData} from "@editorjs/editorjs";

export default function RecipeContent({data}: {data: OutputData}) {
    console.log(data);
    const edjsParser = edjsHTML();
    const html = edjsParser.parse(data);
    console.log(data);
    return (
        <div>
            {html.map((block, index) => (
                <div key={index} dangerouslySetInnerHTML={{__html: block}}/>
            ))}
        </div>
    )
}