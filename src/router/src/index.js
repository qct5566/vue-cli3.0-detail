export const requireRoutesArray = (r, exinclude) => {
    let contents = []
    const paths = r.keys().filter(p => {
        return exinclude.indexOf(p) === -1
    })
    for (const p of paths) {
        const fn = r(p).default ? r(p).default : r(p)
        if (fn instanceof Array) {
            contents = [...contents, ...fn]
        } else if (fn instanceof Object) {
            contents.push(fn)
        }
    }
    return contents
}

const content = requireRoutesArray(require.context('./', true, /^\.\/[\s\S]+\/*\.js$/), ['./index.js'])

export default content
