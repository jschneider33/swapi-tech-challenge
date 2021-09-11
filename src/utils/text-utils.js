// Takes a string and returns the same string in kebab-case
export function toKebabCase(text){
    const newText = text.replace(/([a-z])([A-Z])/g, "$1-$2")
                        .replace(/[\s_]+/g, '-')
                        .toLowerCase();
    return newText;
}