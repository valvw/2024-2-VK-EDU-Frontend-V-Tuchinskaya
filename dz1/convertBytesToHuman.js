/*
 * В этом задании надо разработать функцию
 * `convertBytesToHuman`. Эта функция  должна принимать
 * аргумент `bytes` только числового типа.
 * На выходе функция должна отдать
 * человекопонятную строку, которая будет
 * отражать размер файла. Примеры использования:
 * `convertBytesToHuman(1024) === '1 KB';`
 * `convertBytesToHuman(123123123) === '117.42 MB';`
 * Необходимо предусмотреть защиту от
 * передачи аргументов неправильного типа
 * и класса (например, отрицательные числа)
 */

export default function convertBytesToHuman(bytes) {
  if (typeof bytes !== 'number' || bytes < 0 || !Number.isFinite(bytes)) {
    return false;
  }

  const dataUnits = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', 'BB'];
  let index = 0;

  while (bytes >= 1024 && index < dataUnits.length - 1) {
      bytes /= 1024;
      index++;
  }
  const formattedBytes = bytes % 1 === 0 ? bytes.toFixed(0) : parseFloat(bytes.toFixed(2));
  return `${formattedBytes} ${dataUnits[index]}`;
}
