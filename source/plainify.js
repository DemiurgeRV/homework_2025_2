'use strict';

/**
 * Преобразует вложенный объект в plain-объект с ключами в формате "a.b.c".
 *
 * @param {Object} obj - Исходный объект с вложенными свойствами
 * @returns {Object} plain-объект, где ключи представляют путь к значению
 *
 * @example
 * plainify({ a: 1, b: { c: 2 } });
 * // returns { a: 1, 'b.c': 2 }
 */
function plainify(obj) {
    const result = {};
    const stack = [{ value: obj, path: [] }];

    while (stack.length > 0) {
        const { value, path } = stack.pop();

        for (const key in value) {
            if (!Object.prototype.hasOwnProperty.call(value, key)) continue;

            const newPath = [...path, key];
            const newKey = newPath.join('.');
            const currentValue = value[key];

            if (currentValue !== null && typeof currentValue === 'object' && !Array.isArray(currentValue)) {
                stack.push({ value: currentValue, path: newPath });
            } else {
                result[newKey] = currentValue;
            }
        }
    }

    return result;
}
