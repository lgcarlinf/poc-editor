import ReactQuill from 'react-quill';

export interface ReplaceParams {
    replaceText: string;
    quillRef: React.RefObject<ReactQuill>;
    searchText: string
}

export const getAllIndex = (originalText: string, searchText: string) => {
    const size = searchText.length;
    let startIndex = 0, index;
    const indexes = [];
    while ((index = originalText.toLowerCase().indexOf(searchText.toLowerCase(), startIndex)) > -1) {
        indexes?.push(index);
        startIndex = index + size;
    }
    return indexes;
};


export const cleanAllFormat = (quillRef: React.RefObject<ReactQuill>) => {
    const editor = quillRef.current?.getEditor();
    const totalText = editor?.getText();
    const size = totalText?.length;
    size && editor?.formatText(0, size, 'background', false);
};

export const replaceOneByOne = ({ replaceText, quillRef, searchText }: ReplaceParams) => {
    if (!quillRef.current) return;

    const editor = quillRef.current.getEditor();
    const totalText = editor.getText();
    const regularExpression = new RegExp(searchText, "gi");
    const index = totalText.toLowerCase().indexOf(searchText.toLowerCase());

    if (searchText && regularExpression.test(totalText) && index !== -1) {
        const length = searchText.length;
        editor.deleteText(index, length);
        editor.insertText(index, replaceText);

        editor.formatText(index, 1, 'background', false);
    }
};

export const replaceAll = ({ replaceText, quillRef, searchText }: ReplaceParams) => {
    if (!quillRef.current) return;

    const editor = quillRef.current.getEditor();
    const totalText = editor.getText();
    const regularExpression = new RegExp(searchText, "gi");
    cleanAllFormat(quillRef);
    if (searchText && regularExpression.test(totalText)) {
        const indexes = getAllIndex(totalText, searchText);

        for (let i = indexes.length - 1; i >= 0; i--) {
            const index = indexes[i];
            const length = searchText.length;

            editor.deleteText(index, length);
            editor.insertText(index, replaceText);
        }
    }
};

export const find = (quillRef: React.RefObject<ReactQuill>, searchText: string) => {
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