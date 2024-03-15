export const getAllIndex = (originalText:string, searchText:string) => {
    const size = searchText.length;
    let startIndex = 0, index;
    const indices = [];
    while ((index = originalText.toLowerCase().indexOf(searchText.toLowerCase(), startIndex)) > -1) {
        indices.push(index);
        startIndex = index + size;
    }
    return indices;
};

export const cleanAllFormat = (editor, searchText:string) => {
    const totalText = editor.getText();
    const indexes = getAllIndex(totalText, searchText);
    indexes.forEach((index) => {
        const length = searchText.length;
        editor.formatText(index, length, 'background', false);
    });
};