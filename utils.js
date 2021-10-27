export const getRandom = (border) => {
    return Math.ceil(Math.random() * border);
}


export const createElement = (tag, className) => {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.className = className;
    }
    return $tag;
}