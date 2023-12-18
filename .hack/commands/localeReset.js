import path from 'path'
import fs from 'fs'

function setValue(obj, keys, isMultiple) {
    // Больше ли ключей чем 0? Условие для прекращения рекурсивного вызова
    if (keys.length > 0) {
        // Берем последний оставщийся
        let key = keys.pop()
        // Если поле не определено, смотрим на оставшийся список ключей и флаг и формируем
        if (typeof obj[key] === 'undefined') {
            if (keys.length > 0 || isMultiple) {
                obj[key] = {}
            } else {
                obj[key] = ""
            }
        }
        setValue(obj[key], keys, isMultiple)
    }
}


export default (requestParams, ctx) => {
    let mainDir

    switch (requestParams['params']['type']) {
        case 'page':
            mainDir = path.join(ctx.dirs['pages'], requestParams['computed']['upper_name'])
            break
        case 'component':
            mainDir = path.join(ctx.dirs['src'] + '\\components', requestParams['computed']['upper_name'])
            break
        case 'module':
            mainDir = path.join(ctx.dirs['src'] + '\\modules', requestParams['computed']['upper_name'])
            break
        default:
            mainDir = path.join(ctx.dirs['src'], requestParams['computed']['upper_name'])
    }

    // Читеем vue-файл
    fs.readFile(`${mainDir}\\${requestParams['computed']['upper_name']}.vue`, {encoding: 'utf-8'}, function (err, data) {
        if (!err) {
            // Под шаблон попадают выражения вида $t('name') | $i("name") | in $i("name")
            const regExp = /(in\s)?\$[ti]\(['"]([A-Za-z0-9.]+)['"]\)/g

            // Определяем (по префиксу in) является ли значение многомерным или нет, собираем все значения, полученые через regExp
            let values = [...data.matchAll(regExp)].map((item) => ({
                isMultiple: !!item[1],
                value: item[2]
            }))

            // Определяем объект для вывода
            let locale = {}

            // Присваеваем значения согласно имеющимся ключам и параметрам в переменную вывода
            for (let item of values) {
                setValue(locale, item.value.split('.').reverse(), item.isMultiple)
            }

            // Записываем в i18.json
            fs.writeFile(`${mainDir}\\i18n.json`, JSON.stringify(locale, null, 2), (err) => {
                if (!!err) {
                    console.log('Ошибка при записи файла:', err)
                }
            })
        } else {
            console.log(err)
        }
    })
}