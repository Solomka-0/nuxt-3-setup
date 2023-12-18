import path from 'path'
import fs from 'fs'

const Colors = {
    RESEST: "\x1b[0m",
    BRIGHT: "\x1b[1m",
    DIM: "\x1b[2m",
    UNDERSCORE: "\x1b[4m",
    BLINK: "\x1b[5m",
    REVERSE: "\x1b[7m",
    HIDDEN: "\x1b[8m",

    FG__BLACK: "\x1b[30m",
    FG_RED: "\x1b[31m",
    FG_GREEN: "\x1b[32m",
    FG_YELLOW: "\x1b[33m",
    FG_BLUE: "\x1b[34m",
    FG_MAGENTA: "\x1b[35m",
    FG_CYAN: "\x1b[36m",
    FG_WHITE: "\x1b[37m",
    FG_GRAY: "\x1b[90m",

    BG_BLACK: "\x1b[40m",
    BG_RED: "\x1b[41m",
    BG_GREEN: "\x1b[42m",
    BG_YELLOW: "\x1b[43m",
    BG_BLUE: "\x1b[44m",
    BG_MAGENTA: "\x1b[45m",
    BG_CYAN: "\x1b[46m",
    BG_WHITE: "\x1b[47m",
    BG_GRAY: "\x1b[100m",
}

// const path = import("path")
// const fs = import("fs")

const withColors = (str, ...args) => {
    return `${args.join('')}${str}${Colors.RESEST}`
}

/**
 *
 * @type {string}
 */
const commands = [
    // {
    //     command: "ui",
    //     description: "Генерирует основу для ui-компонента",
    //     params: ['name'],
    //     method: () => import('./commands/ui.js')
    // },
    {
        command: "component",
        description: "Создает базовый компонент",
        params: ['name', 'path'],
        method: () => import('./commands/component.js')
    },
    // {
    //     command: "shared",
    //     description: "???",
    //     params: ['name'],
    //     method: () => import('./commands/shared')
    // },
    {
        command: "module",
        description: "Генерирует основу модуля",
        params: ['name'],
        method: () => import('./commands/module.js')
    },
    {
        command: "locale",
        description: "Обноаляет языковую модель",
        params: ['lang'],
        method: () => import('./commands/locale.js')
    },
    {
        command: "locale:reset",
        description: "Сбрасывает локальную языковую модель на основе содержания элемента",
        params: ['type', 'name'],
        method: () => import('./commands/localeReset.js')
    },
    {
        command: "page",
        description: "Генерирует основу модуля",
        params: ['name'],
        method: () => import('./commands/page.js')
    }
]

function description() {
    return '\tДоступные команды:\n\n' +
        commands.map((item) => {
            return `${withColors('\tnpm run make', Colors.FG_GREEN)} ${withColors(item.command, Colors.FG_YELLOW)} [${withColors(item.params.join(','), Colors.FG_BLUE)}] - ${item.description}\n`
        }).join('')
}

function setupCommand(command, params) {
    const setup = commands.filter((item) => item.command === command)[0]

    function getParam(str, index) {
        const matches = str.match(/([A-Za-z]+)=(.+)/)
        const param = {}

        if (!!matches) {
            param[matches[1]] = matches[2]
            return param
        }

        param[setup.params[index]] = str

        return param
    }

    let resultParams = {}

    for (let i = 0; i < params.length; i++) {
        let tmp = getParam(params[i], i)
        resultParams[Object.keys(tmp).pop()] = tmp[Object.keys(tmp).pop()]
    }

    return {
        command: command,
        params: resultParams,
        method: setup.method
    }
}

const args = process.argv
const [command, ...params] = args.slice(2, args.length)

const dirs = {
    '.hack': args[1],
    // 'base': path.join(.hack, "./../..")
}


dirs['base'] = path.join(dirs['.hack'], "./../..")
dirs['src'] = path.join(dirs['base'], "./src")

try {
    const requestParams = setupCommand(command, params)
    requestParams['args'] = args

    if (!!requestParams['params']['name']) {
        let name = [...requestParams['params']['name'].replaceAll(/[\\/]/g, '/')].join('')

        requestParams['computed'] = {}
        requestParams['computed']['links'] = name.split('/')

        while (/\//.test(name)) {
            console.log(name)
            name = name.substr(name.indexOf('/') + 1)
        }

        name = requestParams['computed']['links'][requestParams['computed']['links'].length - 1]

        requestParams['computed']['upper_name'] = name.charAt(0).toUpperCase() + name.slice(1)
        requestParams['computed']['lower_name'] = name.charAt(0).toLowerCase() + name.slice(1)

        requestParams['computed']['divided'] = ''
        for (let i = 0; i < requestParams['computed']['lower_name'].length; i++) {
            let char = requestParams['computed']['lower_name'].charAt(i)

            if (char === char.toUpperCase()) {
                requestParams['computed']['divided'] += '-' + char.toLowerCase()
            } else {
                requestParams['computed']['divided'] += char
            }
        }
    }

    // Вызов метода команды
    const method = requestParams.method().then((module) => {
        module.default(requestParams, {dirs: dirs})
    })
} catch (e) {
    console.log(description())
    console.log(e)
}
