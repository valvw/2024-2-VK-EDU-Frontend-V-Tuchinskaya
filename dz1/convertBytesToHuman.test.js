/*
 * Необходимо покрыть все возможные
 * и невозможные кейсы. Например,
 * convertBytesToHuman(-1) === false,
 * convertBytesToHuman(-1) !== '1 B',
 * convertBytesToHuman('string') === false
 * convertBytesToHuman(5) === '5 B'
 */

import convertBytesToHuman from './convertBytesToHuman';


test('Возвращает false для неправильного типа данных', () => {
  expect(convertBytesToHuman(-1)).toBe(false); // Отрицательное число
  expect(convertBytesToHuman('string')).toBe(false); // Строка
  expect(convertBytesToHuman(undefined)).toBe(false); // Undefined
  expect(convertBytesToHuman(NaN)).toBe(false); // NaN
  expect(convertBytesToHuman(null)).toBe(false); // Null
  expect(convertBytesToHuman(true)).toBe(false); // Булево значение
  expect(convertBytesToHuman([])).toBe(false); // Пустой массив
  expect(convertBytesToHuman({})).toBe(false); // Объект
});

test('Возвращает корректное значение для случайных чисел', () => {
  expect(convertBytesToHuman(0)).toBe('0 B');
  expect(convertBytesToHuman(0.05)).toBe('0.05 B')
  expect(convertBytesToHuman(Math.pow(2, 0))).toBe('1 B')
  expect(convertBytesToHuman(Math.pow(2, 10))).toBe('1 KB')
  expect(convertBytesToHuman(Math.pow(2, 20))).toBe('1 MB')
  expect(convertBytesToHuman(Math.pow(2, 30))).toBe('1 GB')
  expect(convertBytesToHuman(Math.pow(2, 40))).toBe('1 TB')
  expect(convertBytesToHuman(Math.pow(2, 50))).toBe('1 PB')
  expect(convertBytesToHuman(Math.pow(2, 60))).toBe('1 EB')
  expect(convertBytesToHuman(Math.pow(2, 70))).toBe('1 ZB')
  expect(convertBytesToHuman(Math.pow(2, 80))).toBe('1 YB')
  expect(convertBytesToHuman(Math.pow(2, 10) + Math.pow(10, 1))).toBe('1.01 KB'); // 1024 + 10 B
  expect(convertBytesToHuman(Math.pow(2, 20) + Math.pow(2, 18))).toBe('1.25 MB'); // 1 MB + 0.25 MB
  expect(convertBytesToHuman(Math.pow(2, 30) + Math.pow(2, 28))).toBe('1.25 GB'); // 1 GB + 0.25 GB
  expect(convertBytesToHuman(Math.pow(2, 40) + Math.pow(2, 37))).toBe('1.13 TB'); // 1 TB + 0.13 TB
  expect(convertBytesToHuman(Math.pow(2, 50) + Math.pow(2, 47))).toBe('1.13 PB'); // 1 PB + 0.13 PB
  expect(convertBytesToHuman(Math.pow(2, 60) + Math.pow(2, 59))).toBe('1.5 EB'); // 1 EB + 0.5 EB
  expect(convertBytesToHuman(Math.pow(2, 70) + Math.pow(2, 68))).toBe('1.25 ZB'); // 1 ZB + 0.25 ZB
});

test('Не возвращает результаты для отрицательных и граничных значений', () => {
  expect(convertBytesToHuman(-1)).not.toBe('1 MB');
  expect(convertBytesToHuman(1024)).not.toBe('1024 B');
});
