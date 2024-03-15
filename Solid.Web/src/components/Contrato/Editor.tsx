import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ContratoHTMLContent } from './ContratoHTML'; // Importa o conteúdo do contrato HTML

const Editor: React.FC<{ onChange: (value: string) => void }> = ({ onChange }) => {
    const [editorData, setEditorData] = useState<string>('');

    useEffect(() => {
        // Define o conteúdo do arquivo HTML como o conteúdo inicial do editor
        setEditorData(ContratoHTMLContent);
        onChange(ContratoHTMLContent);
    }, [onChange]);

    const handleEditorChange = (event: any, editor: any) => {
        const data = editor.getData();
        setEditorData(data);
        onChange(data);
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
