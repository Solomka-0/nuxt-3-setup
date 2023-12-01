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
        "      [ HomePageContent ]\n" +
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
        "    'en': '/',\n" +
        "    'de': '/',\n" +
        "    'es': '/',\n" +
        "    'fr': '/',\n" +
        "    'it': '/',\n" +
        "    'pt': '/',\n" +
        "    'zh': '/',\n" +
        "    'ja': '/',\n" +
        "    'ko': '/',\n" +
        "    'ru': '/',\n" +
        "    'hi': '/',\n" +
        "    'pl': '/',\n" +
        "    'cs': '/',\n" +
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
    createFile(`${pageDir}\\style.scss`, '')

    console.log(mainDir, requestParams)
}