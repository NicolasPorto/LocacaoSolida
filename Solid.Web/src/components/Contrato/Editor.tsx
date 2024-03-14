import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

interface EditorProps {
    initialValue: string;
    onChange: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ initialValue, onChange }) => {
    const [editorData, setEditorData] = useState<string>(initialValue);

    const handleEditorChange = (event: any, editor: any) => {
        const data = editor.getData();
        setEditorData(data);
        onChange(data);
        console.log(editorData)
    };

    return (
        <div>
            <CKEditor
                editor={ClassicEditor}
                data={editorData}
                onChange={handleEditorChange}
            />
        </div>
    );
};

export default Editor;
