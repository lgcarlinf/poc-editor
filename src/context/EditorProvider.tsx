import { createContext, useMemo, useState } from "react";

export type Maybe<T> = T | undefined;

interface EditorContextProps {
    searchText: string;
    setSearchText: (text: string) => void;
    replaceText: string;
    setReplaceText: (text: string) => void;
    isShowSearchOpts: Maybe<boolean>;
    setIsShowSearchOpts: (prev: boolean) => void;
}

export const EditorContext = createContext({
    searchText: "",
    setSearchText: () => { },
    replaceText: "",
    setReplaceText: () => { },
    isShowSearchOpts: undefined,
    setIsShowSearchOpts: () => { }

} as EditorContextProps);

export const EditorProvider = ({ children }: { children: React.ReactNode }) => {

    const [searchText, setSearchText] = useState("");
    const [replaceText, setReplaceText] = useState("");
    const [isShowSearchOpts, setIsShowSearchOpts] = useState<Maybe<boolean>>(undefined);

    const value = useMemo(() => ({
        searchText,
        setSearchText,
        replaceText,
        setReplaceText,
        isShowSearchOpts,
        setIsShowSearchOpts
    }), [searchText,
        setSearchText,
        replaceText,
        setReplaceText,
        isShowSearchOpts,
        setIsShowSearchOpts
    ]);

    return (
        <EditorContext.Provider value={value}>
            {children}
        </EditorContext.Provider>
    );
}