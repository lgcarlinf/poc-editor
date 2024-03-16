import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import ReactQuill from 'react-quill';
import Search from './Search';
import { EditorContext } from '../context/EditorProvider';
import { cleanAllFormat } from '../util/helpers';
import hotkeys from 'hotkeys-js';

export const LiveEditor = () => {

    const { isShowSearchOpts, setIsShowSearchOpts, setSearchText, setReplaceText } = useContext(EditorContext);
    const [value, setValue] = useState('');
    const quillRef = useRef<ReactQuill>(null);


    const handleSearch = useCallback(() => {
        setIsShowSearchOpts(!isShowSearchOpts);
    }, [isShowSearchOpts, setIsShowSearchOpts]);

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'f' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            handleSearch();
        }
    }

    useEffect(() => {
        hotkeys('ctrl+f, command+f', (e) => {
            e.preventDefault();
            handleSearch();
        });
        return () => {
            hotkeys.unbind('ctrl+f, command+f');
        };
    }, [setIsShowSearchOpts, handleSearch]);

    useEffect(() => {
        if (isShowSearchOpts !== undefined && !isShowSearchOpts) {
            setSearchText("");
            setReplaceText("");
            cleanAllFormat(quillRef);
        }
    }, [isShowSearchOpts]);


    return (
        <>
            <Search handleSearch={handleSearch} quillRef={quillRef} />
            <ReactQuill
                theme="snow"
                value={value}
                ref={quillRef}
                onChange={setValue}
                onKeyDown={handleKeyDown}
            />
        </>
    )
}