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

const componentContent = (requestParams) => {
    return "<template>\n  <div class=" + requestParams['computed']['divided'] + ">\n    [ " + requestParams['computed']['upper_name'] + " ]\n  </div>\n</template>" +
        "\n\n<script setup lang='ts'>\n" +
        "import { useDefaultState } from './composables/useDefault'\n" +
        "const ctx = useDefaultState()\n\n" +
        "// i18\n" +
        "const i18nPrefix = \"components." + requestParams['computed']['upper_name'] + "\"\n" +
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
    let mainDir = `${ctx.dirs['src']}\\components`
    if (!!requestParams['params']['path']) {
        try {
            mainDir = path.join(ctx.dirs['src'], requestParams['params']['path'])
        } catch (err) {
            console.log('Неверно указанный путь. Указана корневая директория')
        }
    }

    console.log(`${mainDir}\\${requestParams['computed']['upper_name']}\\i18n.json`)
    fs.mkdir(`${mainDir}\\${requestParams['computed']['upper_name']}`, () => {})
    fs.mkdir(`${mainDir}\\${requestParams['computed']['upper_name']}\\ui`, () => {})
    fs.mkdir(`${mainDir}\\${requestParams['computed']['upper_name']}\\composables`, () => {})
    createFile(`${mainDir}\\${requestParams['computed']['upper_name']}\\composables\\useDefault.ts`, defaultStateContent(requestParams))
    createFile(`${mainDir}\\${requestParams['computed']['upper_name']}\\i18n.json`, JSON.stringify({}, null, 2))
    createFile(`${mainDir}\\${requestParams['computed']['upper_name']}\\${requestParams['computed']['upper_name']}.vue`, componentContent(requestParams))
    createFile(`${mainDir}\\${requestParams['computed']['upper_name']}\\style.scss`, `.${requestParams['computed']['divided']} {}`)

    console.log(mainDir, requestParams)
}