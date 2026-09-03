# Основы веб-технологий — лабораторные работы

Финальная версия работы: **https://ewtizzz.github.io/web-basics-labs/lab9/**

## Состав

Каждая папка — полная версия сайта на момент сдачи соответствующей работы.

| Папка | Работа | Страница |
|---|---|---|
| `lab1` | ЛР №1 | [открыть](https://ewtizzz.github.io/web-basics-labs/lab1/) |
| `lab2` | ЛР №2 | [открыть](https://ewtizzz.github.io/web-basics-labs/lab2/) |
| `lab3` | ЛР №3 | [открыть](https://ewtizzz.github.io/web-basics-labs/lab3/) |
| `lab4` | ЛР №4 | [открыть](https://ewtizzz.github.io/web-basics-labs/lab4/) |
| `lab5` | ЛР №5 | [открыть](https://ewtizzz.github.io/web-basics-labs/lab5/) |
| `lab6` | ЛР №6 | [открыть](https://ewtizzz.github.io/web-basics-labs/lab6/) |
| `lab7` | ЛР №7 | [открыть](https://ewtizzz.github.io/web-basics-labs/lab7/) |
| `lab8` | ЛР №8 | [открыть](https://ewtizzz.github.io/web-basics-labs/lab8/) |
| `lab9` | ЛР №9 | [открыть](https://ewtizzz.github.io/web-basics-labs/lab9/) |

## Про API

Сервера указанные в заданиях к ЛР №7–9 не работают:

- `http://lab7-api.std-900.ist.mospolytech.ru/api/dishes` — 502 Bad Gateway
- `http://lab8-api.std-900.ist.mospolytech.ru` — 502 Bad Gateway
- `https://edu.std-900.ist.mospolytech.ru` — 502 Bad Gateway, просроченный сертификат

Поэтому в `lab7`–`lab9` данные меню и заказов хранятся в `localStorage`. Вся работа с ними вынесена в `js/api.js`, формат полей заказа совпадает с описанным в задании.

## Как открыть

Любую работу можно открыть по интерактивным кнопкам выше. Изображения блюд лежат рядом, в `images/`.

Вёрстка всех страниц проходит проверку на `https://validator.w3.org` без ошибок и предупреждений.
