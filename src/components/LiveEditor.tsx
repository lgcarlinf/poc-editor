import  { useContext, useRef, useState } from 'react'
import ReactQuill from 'react-quill';
import Search from './Search';
import { EditorContext } from '../context/EditorProvider';
import { cleanAllFormat, getAllIndex } from '../util';

export const LiveEditor = () => {

    const { searchText } = useContext(EditorContext);
    const [value, setValue] = useState('');
    const quillRef = useRef<ReactQuill>(null); 

    const find = ()=>{
        if (!quillRef.current) return;

        const editor = quillRef.current.getEditor();
        const totalText = editor.getText();
        const regularExpression = new RegExp(searchText, "gi");

        if (searchText && regularExpression.test(totalText)) {
            const indexes = getAllIndex(totalText, searchText);
            indexes.forEach((index) => {
                const length = searchText.length;
                editor.formatText(index, length, 'background', 'yellow');
            });
        }
    }

    const replaceOneByOne = (textReplace:string) => {
        if (!quillRef.current) return;

        const editor = quillRef.current.getEditor();
        const totalText = editor.getText();
        const regularExpression = new RegExp(searchText, "gi");
        const index = totalText.toLowerCase().indexOf(searchText.toLowerCase());

        if (searchText && regularExpression.test(totalText) && index !== -1) {
            const length = searchText.length;
            editor.deleteText(index, length);
            editor.insertText(index, textReplace);

            editor.formatText(index, 1, 'background', false);
        }
    };


    const replaceAll = (textReplace:string) => {
        if (!quillRef.current) return;

        const editor = quillRef.current.getEditor();
        const totalText = editor.getText();
        const regularExpression = new RegExp(searchText, "gi");
        cleanAllFormat(editor, searchText);
        if (searchText && regularExpression.test(totalText)) {
            const indexes = getAllIndex(totalText, searchText);

            for (let i = indexes.length - 1; i >= 0; i--) {
                const index = indexes[i];
                const length = searchText.length;
                editor.deleteText(index, length);
                editor.insertText(index, textReplace);
            }
        }
    };

    return (
        <>
        <Search find={find} replaceAll = {replaceAll} replaceOneByOne={replaceOneByOne}/>
        <ReactQuill theme="snow" value={value} onChange={setValue} ref={quillRef}/>
        </>
    )
}