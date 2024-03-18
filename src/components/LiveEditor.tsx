import { useCallback, useEffect, useRef, useState } from 'react'
import ReactQuill from 'react-quill';
import Search from './Search';
import { cleanAllFormat } from '../util/helpers';
import hotkeys from 'hotkeys-js';

type Maybe<T> = T | undefined;
export interface SearchPropsEditor{
    searchText: string;
    setSearchText: (text: string) => void;
    replaceText: string;
    setReplaceText: (text: string) => void;
    isShowSearchOpts: Maybe<boolean>;
}

export const LiveEditor = () => {

    const [searchText, setSearchText] = useState("");
    const [replaceText, setReplaceText] = useState("");
    const [isShowSearchOpts, setIsShowSearchOpts] = useState<Maybe<boolean>>(undefined);

    const searchPropsEditor:SearchPropsEditor = {
        searchText,
        setSearchText,
        replaceText,
        setReplaceText,
        isShowSearchOpts,
    }

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
            <Search 
                handleSearch={handleSearch} 
                quillRef={quillRef} 
                searchPropsEditor={searchPropsEditor}
            />
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