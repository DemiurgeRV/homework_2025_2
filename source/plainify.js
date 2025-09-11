'use strict';

/**
 * Преобразует вложенный объект в plain-объект с ключами в формате "a.b.c".
 *
 * @param {Object} obj - Исходный объект с вложенными свойствами
 * @returns {Object} plain-объект, где ключи представляют путь к значению
 * @throws {TypeError} Если аргумент не является объектом или является массивом/null
 *
 * @example
 * plainify({ a: 1, b: { c: 2 } });
 * // returns { a: 1, 'b.c': 2 }
 */
const plainify = (obj) => {    
    // если obj == null || undefined
    if (obj == null) { 
        throw new TypeError('Argument "obj" must not be null or undefined');
    }
    if (Object.prototype.toString.call(obj) !== '[object Object]') {
        throw new TypeError('Argument "obj" must be an object');
    }

    const result = {};
    const stack = [{ value: obj, path: '' }];

    while (stack.length > 0) {
        const { value, path } = stack.pop();

        for (const key in value) {
            if (!Object.prototype.hasOwnProperty.call(value, key)) continue;

            const newKey = path ? `${path}.${key}` : key;
            const currentValue = value[key];

            if (currentValue !== null && 
                Object.prototype.toString.call(currentValue) === '[object Object]'
            ) {
                stack.push({ value: currentValue, path: newKey });
            } else {
                result[newKey] = currentValue;
            }
        }
    }

    return result;
}
