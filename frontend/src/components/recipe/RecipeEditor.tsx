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
import {useRecipeContext} from "../../contexts/RecipeContext.tsx";

// TODO Add new interesting plugins to editor
// cant load initData into component
export default function Editor({onSave, initData, readOnly}){
    const editorRef = useRef<EditorJS | null>(null);
    const {recipe} = useRecipeContext();

    useEffect(() => {
        if(!editorRef.current){
            editorRef.current = new EditorJS({
                holder: 'editorjs',
                readOnly: readOnly,
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
                    console.log('Editor.js is ready to work!');
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

    // 💀💀💀💀💀
    useEffect(() => {
        if(editorRef.current && editorRef.current?.render){
            editorRef.current?.render({blocks: initData.blocks});
        }
    }, [initData]);

    return (
        <div>
            <div id="editorjs" className="editor"></div>
            { !readOnly && <Button onClick={saveText}>Save text</Button>}
        </div>
    );
}