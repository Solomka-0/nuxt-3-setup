import ruMessages from "@/locales/ru.json"

export default defineI18nConfig(() => ({
  legacy: false,
  globalInjection: true,
  locale: "ru",
  messages: {
    ru: ruMessages
  }
}))