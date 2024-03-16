import { createContext, useMemo, useState } from "react";

interface EditorContextProps {
    searchText: string;
    setSearchText: (text: string) => void;
    replaceText: string;
    setReplaceText: (text: string) => void;
}

export const EditorContext = createContext({
    searchText: "",
    setSearchText: () => { },
    replaceText: "",
    setReplaceText: () => { }

} as EditorContextProps);

export const EditorProvider = ({ children }: { children: React.ReactNode }) => {

    const [searchText, setSearchText] = useState("");
    const [replaceText, setReplaceText] = useState("");

    const value = useMemo(() => ({
        searchText,
        setSearchText,
        replaceText,
        setReplaceText
    }), [searchText, setSearchText, replaceText, setReplaceText]);

    return (
        <EditorContext.Provider value={value}>
            {children}
        </EditorContext.Provider>
    );
}