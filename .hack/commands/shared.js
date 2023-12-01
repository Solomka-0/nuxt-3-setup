import path from "path";
import fs from "fs";

function createFile(path, content) {
    fs.writeFile(path, content,
        (err) => {
            if (!!err) {
                console.log('Ошибка при записи файла:', err)
            }
        })
}

const uiContent = (requestParams) => {
    return "<template>\n" +
        "  <div class=\"" + requestParams['computed']['divided'] + "\">\n" +
        "    <slot/>\n" +
        "  </div>\n" +
        "</template>\n" +
        "\n" +
        "<script setup lang=\"ts\">\n" +
        "\n" +
        "</script>\n" +
        "\n" +
        "<style>\n" +
        "@import \"./style.scss\";\n" +
        "</style>"
}

export default (requestParams, ctx) => {
    let mainDir = `${ctx.dirs['src']}\\shared`

    const dirs = requestParams['computed']['links'].slice(0, -1)

    let tmp = ''
    for (let dir of dirs) {
        console.log(dir)
        fs.mkdir(`${mainDir}\\${tmp}${dir}`, (err) => {
        })
        tmp += dir + '\\'
    }

    const dir = `${mainDir}\\${dirs.join('\\')}\\${requestParams['computed']['upper_name']}`

    fs.mkdir(dir, () => {
    })
    createFile(`${dir}\\${requestParams['computed']['upper_name']}.vue`, uiContent(requestParams))
    createFile(`${dir}\\style.scss`, `.${requestParams['computed']['divided']} {}`)
}