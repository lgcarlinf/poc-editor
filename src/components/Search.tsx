import hotkeys from "hotkeys-js";
import { useContext, useEffect, useState } from "react";
import { from } from "rxjs";
import { filter } from "rxjs/operators";
import { EditorContext } from "../context/EditorProvider";

interface SearchProps {
    find: () => void;
    replaceAll: (textReplace:string) => void;
    replaceOneByOne: (textReplace:string) => void;
}

const Search = ({find,replaceAll,replaceOneByOne}:SearchProps) => {
    const [isShowSearchOpts, setIsShowSearchOpts] = useState(false);
    const { searchText, setSearchText, replaceText, setReplaceText } = useContext(EditorContext);

    useEffect(() => {
        hotkeys('shift+f', handleSearch);
        return () => {
            hotkeys.unbind('shift+f');
        };
    }, []);

    const handleSearch = () => {
        setIsShowSearchOpts(prev => !prev);
    };

    useEffect(() => {
        const isShowSearchOpts$ = from([isShowSearchOpts]);
        const subscription = isShowSearchOpts$
            .pipe(filter(value => value === true))
            .subscribe(() => console.log('Opciones de búsqueda mostradas'));

        return () => {
            subscription.unsubscribe();
        };
    }, [isShowSearchOpts]);

    const onSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    }

    const onReplaceText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReplaceText(e.target.value);
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
                            onChange={onSearchText} />
                        <input 
                            type="text" 
                            value={replaceText}
                            placeholder='replace'
                            onChange={onReplaceText}
                        />
                        <button onClick={find}>find</button>
                    </div>
                    <br/>
                    <div>
                        <button  onClick={()=>replaceOneByOne(replaceText)}>replace</button>
                        <button  onClick={()=>replaceAll(replaceText)}>replace all</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Search;
