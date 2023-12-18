# Командная строка
[На главную](../README.md)
## Создание элемента

### Команда
```
npm run make [type] [name] [path]
```
### Параметры:
* type - тип элемента: component | page | module
* name - название компонента
* path - путь относительно директории src

<br/>

### Использование

```bash
npm run make component TestComponent
```
Генерирует основу для элемента. В зависимости от типа формируется подходящая
структура, инициализируется содержимое

<br>
<br>
<br>
<br>

---


## Определение ключей локализации

### Команда
```
npm run make locale:reset [type] [name]
```
### Параметры:
* type - тип элемента (для определения пути): component | page | module
* name - название элемента

<br/>

### Использование

```bash
npm run make locale:reset component Header
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