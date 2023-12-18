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

const pageContent = (requestParams) => {
    return "<template>\n" +
        "  <div class=\"" + requestParams['computed']['divided'] + "-page\">\n" +
        "    <div class=\"page-content container\">\n" +
        `      [ ${requestParams['computed']['upper_name']}PageContent ]\n` +
        "    </div>\n" +
        "  </div>\n" +
        "</template>\n" +
        "\n" +
        "<script setup=\"ts\">\n" +
        "import {defineI18nRoute} from \"#i18n\";\n" +
        "\n" +
        "// i18\n" +
        "const i18nPrefix = \"pages." + requestParams['computed']['upper_name'] + "\"\n" +
        "const nuxtApp = useNuxtApp()\n" +
        "const $i = nuxtApp.$i(i18nPrefix)\n" +
        "\n" +
        "defineI18nRoute({\n" +
        "  paths: {\n" +
        `    'en': '/${requestParams['computed']['divided']}',\n` +
        `    'de': '/${requestParams['computed']['divided']}',\n` +
        `    'es': '/${requestParams['computed']['divided']}',\n` +
        `    'fr': '/${requestParams['computed']['divided']}',\n` +
        `    'it': '/${requestParams['computed']['divided']}',\n` +
        `    'pt': '/${requestParams['computed']['divided']}',\n` +
        `    'zh': '/${requestParams['computed']['divided']}',\n` +
        `    'ja': '/${requestParams['computed']['divided']}',\n` +
        `    'ko': '/${requestParams['computed']['divided']}',\n` +
        `    'ru': '/${requestParams['computed']['divided']}',\n` +
        `    'hi': '/${requestParams['computed']['divided']}',\n` +
        `    'pl': '/${requestParams['computed']['divided']}',\n` +
        `    'cs': '/${requestParams['computed']['divided']}',\n` +
        "  }\n" +
        "})\n" +
        "\n" +
        "</script>\n" +
        "\n" +
        "<style>\n" +
        "@import \"./style.scss\";\n" +
        "</style>"
}

export default (requestParams, ctx) => {
    let mainDir = `${ctx.dirs['base']}\\pages`

    const dirs = requestParams['computed']['links'].slice(0, -1)

    let tmp = ''
    for (let dir of dirs) {
        fs.mkdir(`${mainDir}\\${tmp}${dir}`, (err) => {})
        tmp += dir + '\\'
    }

    const pageDir = `${mainDir}\\${dirs.join('\\')}\\${requestParams['computed']['upper_name']}`

    console.log(pageDir)

    fs.mkdir(pageDir, () => {})
    createFile(`${pageDir}\\i18n.json`, JSON.stringify({}, null, 2))
    createFile(`${pageDir}\\${requestParams['computed']['upper_name']}.vue`, pageContent(requestParams))
    createFile(`${pageDir}\\style.scss`, `.${requestParams['computed']['divided']}-page {\n` +
        '\n' +
        '}')

    console.log(mainDir, requestParams)
}