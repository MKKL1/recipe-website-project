import {default as React, useCallback, useEffect, useRef} from 'react';
// @ts-ignore
import Header from '@editorjs/header';
// @ts-ignore
import List from '@editorjs/list';
import EditorJS, {EditorConfig, OutputData} from "@editorjs/editorjs";
import {Button} from "react-bootstrap";

// TODO fixed issues with editor instance state
// after saving data for some reason two new instances of editor are created
export default function Editor({onSave}: any){
    const editor = new EditorJS({
        holder: 'editorjs',
        tools: {
            header: Header,
            list: List
        },
        onReady: () => {
            console.log('Editor.js is ready to work!')
        }
    });

    function saveText(){
        editor.save().then((outputData) => {
            console.log('Article data: ', outputData)
            onSave(outputData);
        }).catch((error) => {
            console.log('Saving failed: ', error)
        });
    }

    return (
        <div>
            <div id="editorjs"></div>
            <Button onClick={saveText}>Save text</Button>
        </div>
    );
}

// editor.isReady
//     .then(() => {
//         console.log('Editor.js is ready to work!')
//         /** Do anything you need after editor initialization */
//     })
//     .catch((reason) => {
//         console.log(`Editor.js initialization failed because of ${reason}`)
//     });