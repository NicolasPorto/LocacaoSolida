import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'; // Importar a função dynamic do Next.js
import { EditorState, Modifier, convertFromHTML, ContentState, SelectionState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { ContratoHTMLContent } from './ContratoHTML';

// Renderiza o Editor apenas no lado do cliente
const DynamicEditor = dynamic(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), { ssr: false });

const EditorContrato = () => {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    useEffect(() => {
        // Converte o conteúdo HTML para o formato de bloco Draft.js
        const blocksFromHTML = convertFromHTML(ContratoHTMLContent);
        const initialContentState = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap
        );
        // Cria o EditorState inicial com o conteúdo convertido
        const initialEditorState = EditorState.createWithContent(initialContentState);

        // Aplica o plugin de justificação ao EditorState inicial
        const justifiedEditorState = justifyPlugin.setJustify(initialEditorState);

        // Define o EditorState inicial no estado do componente
        setEditorState(justifiedEditorState);
    }, []);

    const handleEditorStateChange = (newEditorState) => {
        setEditorState(newEditorState);
    };

    return (
        <div className='mx-auto w-6/12'>
            <DynamicEditor // Renderiza o editor dinamicamente
                editorState={editorState}
                onEditorStateChange={handleEditorStateChange}
                readOnly={true}
                toolbarHidden={true}
            />
        </div>
    );
};

const justifyPlugin = {
    setJustify(editorState) {
        const contentState = editorState.getCurrentContent();
        const selectionState = editorState.getSelection();

        // Define as chaves de início e fim
        const startKey = selectionState.getStartKey();
        const endKey = selectionState.getEndKey();

        // Define o intervalo de seleção
        const blockMap = contentState.getBlockMap();
        const blocksToJustify = blockMap.skipUntil((_, key) => key === startKey).takeUntil((_, key) => key === endKey).toList();

        // Aplica a justificação a cada bloco no intervalo de seleção
        let newContentState = contentState;
        blocksToJustify.forEach(block => {
            const newBlock = block.set('data', block.getData().merge({ 'text-align': 'justify' }));
            newContentState = Modifier.setBlockData(newContentState, new SelectionState({
                anchorKey: block.getKey(),
                anchorOffset: 0,
                focusKey: block.getKey(),
                focusOffset: block.getLength(),
                isBackward: false,
            }), newBlock.getData());
        });

        return EditorState.push(editorState, newContentState, 'change-block-data');
    },
};

export default EditorContrato;
