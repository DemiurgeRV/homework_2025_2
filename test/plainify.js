'use strict';

QUnit.module('Тестируем функцию plainify', () => {
    QUnit.test('Работает правильно с вложенным объектом', (assert) => {
        const originalObject = {
            a: 1,
            b: {
                c: 2,
                d: {
                    e: 3
                }
            },
            f: 4
        };
        const result = plainify(originalObject);

        assert.deepEqual(result, { a: 1, 'b.c': 2, 'b.d.e': 3, f: 4 }, 'Объект должен быть преобразован в plain');
    });

    QUnit.test('Работает правильно с пустым объектом', (assert) => {
        const originalObject = {};
        const result = plainify(originalObject);

        assert.deepEqual(result, {}, 'Пустой объект должен возвращать пустой объект');
    });

    QUnit.test('Работает правильно с объектом, содержащим примитивы', (assert) => {
        const originalObject = {
            x: 'hello',
            y: 42,
            z: { a: 1, b: 2 }
        };
        const result = plainify(originalObject);

        assert.deepEqual(result, { x: 'hello', y: 42, 'z.a': 1, 'z.b': 2 }, 'Примитивы и вложенные объекты должны быть правильно преобразованы');
    });

    QUnit.test('Работает правильно с глубокой вложенностью', (assert) => {
        const originalObject = {
            a: { b: { c: { d: { e: 5 } } } }
        };
        const result = plainify(originalObject);

        assert.deepEqual(
            result,
            { 'a.b.c.d.e': 5 },
            'Функция должна правильно обрабатывать глубокую вложенность'
        );
    });
    
    QUnit.test('Работает правильно с null и undefined', (assert) => {
        const originalObject = {
            a: null,
            b: undefined,
            c: { d: null }
        };
        const result = plainify(originalObject);

        assert.deepEqual(
            result,
            { a: null, b: undefined, 'c.d': null },
            'null и undefined должны корректно сохраняться'
        );
    });
});
