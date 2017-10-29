# Тестовое задание для ГК "Инжиниринговые технологии"

Приложение, которое отображает набор данных тремя способами:
 1. таблицей
 2. на карте
 3. на графике

Таблица интерактивна. По клику на строку данных, эти данные подсвечиваются в таблице, на карте и на графике.
В приложении присутствует фильтр. Данные, не удовлетворяющие фильтру, должны быть скрыты.
Формат данных - массив объектов: [{lat, lng, x, y}], где lat - широта, lng - долгота, x и y - положительные числа.

Логика работы приложения:
 - данные отображаются в таблице. столбцы таблицы - lat, lng, x, y
 - данные отображаются на карте. координаты точек - lat, lng. x, y - не используются
 - данные отображаются на графике. график - barchart зависимости y от x. lat, lng - не используются
 - по клику на строку таблицы, строка подсвечивается. “выбранные” данные также подсвечиваются на карте и на графике. Одновременно может быть выбрана лишь одна строка.
  - в приложении присутствует фильтр “Y больше либо равен” (input). Фильтр находится перед таблицей. при применении фильтра, данные, не удовлетворяющие фильтру, скрываются в таблице, на карте и на графике. Предусмотрена возможность “очистки” фильтра.

Использованные технологии и инструменты:
- JavaScript
- график на D3.js
- карта на Leaflet
- верстка HTML5 + CSS3, без фреймворков
- препроцессор Less
- методология БЭМ
- стайлгайд для Javascript - Airbnb (https://github.com/airbnb/javascript)
- стайлгайд для HTML, CSS - @mdo (http://codeguide.co/)
- Webpack для D3.js и ES6
- Gulp для Less, LessAutoprefix, BrowserSync
- npm для пакетов
