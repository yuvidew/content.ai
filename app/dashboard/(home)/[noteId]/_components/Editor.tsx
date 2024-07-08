import React, { useEffect, useRef } from 'react'
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

interface props {
    content : string,
}

export const EditorComp: React.FC<props> = ({content}) => {
    const editorRef:any = useRef();

    useEffect(() => {
        const editorInstance = editorRef.current.getInstance();
        editorInstance.setMarkdown(content)
        // onCopy(navigator.clipboard.writeText(content))
    } , [content])

    return (
        <div className=' '>
            <Editor
                ref={editorRef}
                initialValue={'Your result well be appear here..'}
                initialEditType="wysiwyg"
                height="590px"
                useCommandShortcut={true}
            />
        </div>
    )
}
