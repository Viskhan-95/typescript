
const obj: Record<string, number> = {
    a: 1,
    b: 2,
    c: 5
}

function swapKeysAndValues<T extends Record<string, number>>(obj: T): Record<number, string> {
    const swapped: Record<number, string> = {};

    for(const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];

            if(typeof value === 'string' || typeof value === 'number') {
                swapped[value] = key;
            }
            console.log(key, value)
        }
    }

    return swapped;
}

const res = swapKeysAndValues(obj);
console.log(res)