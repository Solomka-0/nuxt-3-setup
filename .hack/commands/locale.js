import path from "path";
import fs from "fs";

export default (requestParams, ctx) => {
    const pagesDir = path.join(ctx.dirs['base'], "./pages")
    const componentsDir = path.join(ctx.dirs['src'], "./components")
    const localesDir = path.join(ctx.dirs['base'], "./locales")
    const _locale = requestParams['args'][3] ? requestParams['args'][3].toLowerCase() : "ru"
    const localePath = path.join(localesDir, `./${_locale}.json`)

    const i18nPathes = [
        path.join(ctx.dirs['base'], "./assets/i18n_common.json"),
        ...getI18nPaths(componentsDir),
        ...getI18nPaths(pagesDir),
    ]

    const localeObject = fillLocalization(i18nPathes, ctx.dirs['base'])

    fs.openSync(localePath, "w")
    fs.writeFileSync(localePath, JSON.stringify(localeObject))

    console.log(`Locale ${_locale} has been created!`)
}

const setValue = (object, path, value) => {
    let last = path.pop();
    path.reduce((o, k) => o[k] = o[k] || {}, object)[last] = value;
}

const fillLocalization = (paths, baseDir) => {
    const obj = {}

    for (let index in paths) {
        const keys = paths[index].replace(`${baseDir}\\`, "").split("\\").slice(0, -1)
        const data = JSON.parse(fs.readFileSync(paths[index]))

        if (keys[0] === "assets") {
            keys[0] = "common"
        }

        setValue(obj, keys.slice(1, keys.length), data)
    }

    return obj;
}

const getI18nPaths = (rootPath) => {
    const paths = []
    const files = fs.readdirSync(rootPath)

    for (let item in files) {
        if (files[item] === "i18n.json") {
            paths.push(path.join(rootPath, `./${files[item]}`))
        } else if (!/\.[a-zA-Z0-9]+/.test(files[item])) {
            paths.push(...getI18nPaths(path.join(rootPath, `./${files[item]}`)))
        }
    }

    return paths
}