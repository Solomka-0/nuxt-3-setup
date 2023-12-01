const runtimeConfig = useRuntimeConfig

const helper = () => {
    console.log('helper is defined!')
    return true
}

const i = (prefix) => {
    return (key: string) => {
        const fullKey = `${prefix}.${key}`
        const value = useI18n().t(fullKey)
        return value !== fullKey ? value : `[ ${key} ]`
    }
}

export default defineNuxtPlugin(() => {
    return {
        provide: {
            helper: helper,
            i: i
        }
    }
})