
interface IA {
    a: number;
    b: string;
}

interface IB {
    a: number;
    c: boolean;
}

let a: IA = { a: 5, b: '' };
let b: IB = { a: 10, c: true };

type IDifference = Pick<IA, Exclude<keyof IA, keyof IB>>;

function difference(objA: IA, objB: IB): IDifference {
    const res = {} as IDifference;

    const keysToKeep = Object.keys(objA).filter(key => !(key in objB)) as (Exclude<keyof IA, keyof IB>)[];
    
    keysToKeep.forEach(key => {
        res[key] = objA[key] as any;
})
    return res;
}

let v0: IDifference = difference(a, b);

console.log(v0);