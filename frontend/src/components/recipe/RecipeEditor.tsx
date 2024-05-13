import {default as React, useCallback, useEffect, useRef} from 'react';
// @ts-ignore
import Header from '@editorjs/header';
// @ts-ignore
import List from '@editorjs/list';
import {createReactEditorJS} from "react-editor-js";

export default function Editor({ data, setData }) {
    const editorCore = useRef(null);
    const ReactEditorJS = createReactEditorJS();

    const handleInitialize = useCallback((instance: any) => {
        // await instance._editorJS.isReady;
        instance._editorJS.isReady
            .then(() => {
                editorCore.current = instance;
            })
            .catch((err: any) => {
                console.log("An error occured", err)
            });
    }, []);

    const handleSave = useCallback(async () => {
        // @ts-ignore
        const savedData = await editorCore.current.save();
        setData(savedData);
    }, [setData]);

    const EDITOR_JS_TOOLS = {
        list: List,
        header: Header,
    };

    return (
        <div className="editor-container">
            <h4 className="edit-mode-alert">! Edit Mode Enabled</h4>
            <ReactEditorJS
                onInitialize={handleInitialize}
                tools={EDITOR_JS_TOOLS}
                onChange={handleSave}
                defaultValue={data}
            />
        </div>
    );
}