import {default as React, useEffect, useRef} from 'react';
// @ts-ignore
import Header from '@editorjs/header';
// @ts-ignore
import List from '@editorjs/list';
// @ts-ignore
import ImageTool from '@editorjs/image';
import EditorJS, {EditorConfig, OutputData} from "@editorjs/editorjs";
import {Button} from "react-bootstrap";
import '../../styles/Edtior.css';
import {environment} from "../../../environment.ts";

// TODO Add new interesting plugins to editor
export default function Editor({onSave}: any){
    const editorRef = useRef<EditorJS | null>(null);
    //const ImageTool = window.ImageTool;

    useEffect(() => {
        if(!editorRef.current){
            editorRef.current = new EditorJS({
                holder: 'editorjs',
                tools: {
                    header: Header,
                    list: List,
                    image: {
                        class: ImageTool,
                        config: {
                            endpoints: {
                                byFile: environment.apiUrl + "image",
                                byUrl: environment.apiUrl + "image"
                            }
                        }
                    }
                },
                onReady: () => {
                    console.log('Editor.js is ready to work!')
                }
            });
        }
    }, []);

    function saveText(){
        if(editorRef.current){
            editorRef.current.save().then((outputData) => {
                onSave(outputData);
            }).catch((error) => {
                console.log('Saving failed: ', error)
            });
        }
    }

    return (
        <div>
            <div id="editorjs" className="editor"></div>
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