# Nuxt 3

Просмотрите [документацию по Nuxt 3](https://nuxt.com/docs/getting-started/introduction) чтобы узнать больше.

## Установка

Установите зависимости, указанные в package.json:

```bash
# npm
npm install
```

## Развернуть проект локально

Проект будет доступен по ссылке `http://localhost:3000`:

```bash
# npm
npm run dev
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

---

# Примечательно

Здесь будут рассмотрены различные нюансы проекта, описанные для того, 
чтобы не поставить разработчика в ступор.

## Командный модуль

```bash
npm run make locale:reset
```
Команда предполагает генерацию файла для упрощения работы с локализацией.
Для того, чтобы разработчику не было в тягость постоянно залазить в файл локализации
и описывать используемые значения по-новой скрипт генерирует структуру файла локализации согласно
templat-у элемента

Например:

```js
<template>
  <div class="header">
    Header {{ $i('title') }} {{ $i('description') }}
    {{ $i('items.a') }} {{ $i('items.b') }}
    <div v-for="item in $i('items.array')">
      {{ item }}
    </div>
  </div>
</template>
```

Получиться:

```json i18n.json
{
  "title": "",
  "description": "",
  "items": {
    "a": "",
    "b": "",
    "array": {}
  }
}
```
---
```bash
npm run make component name=newComponent path=./components
```
Генерирует основу для компонента