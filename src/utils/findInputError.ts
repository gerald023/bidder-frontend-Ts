
export function findInputError(errors:any, name:any) {
    const filtered = Object.keys(errors)
        .filter(Key => Key.includes(name))
        .reduce((cur, key) =>{
            return Object.assign(cur, {error: errors[key]})
        }, {})
        return filtered;
}