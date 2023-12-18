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

const moduleContent = (requestParams) => {
    return "<template>\n  <div class=" + requestParams['computed']['divided'] + "-module>\n    [ " + requestParams['computed']['upper_name'] + " ]\n  </div>\n</template>" +
        "\n\n<script setup lang='ts'>\n" +
        "import { useDefaultState } from './composables/useDefault'\n" +
        "const ctx = useDefaultState()\n\n" +
        "// i18\n" +
        "const i18nPrefix = \"modules." + requestParams['computed']['upper_name'] + "\"\n" +
        "const nuxtApp = useNuxtApp()\n" +
        "const $i = nuxtApp.$i(i18nPrefix)\n" +
        "</script>\n\n" +
        "<style lang=\"scss\">\n" +
        "@import \"./style.scss\";\n" +
        "</style>"
}

const defaultStateContent = (requestParams) => {
    return `export const useDefaultState = () => useState('${requestParams['computed']['divided']}', () => ({\n\n}))`
}

export default (requestParams, ctx) => {
    let mainDir = `${ctx.dirs['src']}\\modules`

    const dirs = requestParams['computed']['links'].slice(0, -1)

    let tmp = ''
    for (let dir of dirs) {
        console.log(dir)
        fs.mkdir(`${mainDir}\\${tmp}${dir}`, (err) => {
        })
        tmp += dir + '\\'
    }

    const dir = `${mainDir}\\${dirs.join('\\')}\\${requestParams['computed']['upper_name']}`


    fs.mkdir(dir, () => {})
    fs.mkdir(`${dir}\\composables`, () => {})

    createFile(`${dir}\\composables\\useDefault.ts`, defaultStateContent(requestParams))
    createFile(`${dir}\\i18n.json`, JSON.stringify({}, null, 2))
    createFile(`${dir}\\${requestParams['computed']['upper_name']}.vue`, moduleContent(requestParams))
    createFile(`${dir}\\style.scss`, `.${requestParams['computed']['divided']}-module {}`)
}