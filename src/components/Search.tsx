import { useContext } from "react";
import { EditorContext } from "../context/EditorProvider";
import ReactQuill from "react-quill";
import { replaceAll, find, replaceOneByOne } from '../util/helpers';

interface SearchProps {
    handleSearch: () => void;
    quillRef: React.RefObject<ReactQuill>;
}

const Search = ({ handleSearch, quillRef }: SearchProps) => {

    const { searchText, setSearchText, replaceText, setReplaceText, isShowSearchOpts } = useContext(EditorContext);

    const onSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    }

    const onReplaceText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReplaceText(e.target.value);
    }

    const paramsReplace = {
        replaceText,
        quillRef,
        searchText
    }

    return (
        <div>
            <button onClick={handleSearch}>Buscar</button>
            {isShowSearchOpts && (
                <div>
                    <div>
                        <input
                            type="text"
                            value={searchText}
                            placeholder='search'
                            onChange={onSearchText}
                        />
                        <input
                            type="text"
                            value={replaceText}
                            placeholder='replace'
                            onChange={onReplaceText}
                        />
                        <button onClick={() => find(quillRef, searchText)}>find</button>
                    </div>
                    <br />
                    <div>
                        <button onClick={() => replaceOneByOne(paramsReplace)}>replace</button>
                        <button onClick={() => replaceAll(paramsReplace)}>replace all</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Search;
