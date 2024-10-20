
interface IUser {
    name: string;
    age: number;
    skills: string[];
};

const user: IUser = {
    name: 'Vasiliy',
    age: 8,
    skills: ['typescript', 'javascript'],
};


function pickObjectKeys<T extends object, S extends keyof T>(obj: T, keys: S[]): Pick<T, S> {
    const result = {} as Pick<T, S>;

    keys.forEach((key) => {
        if(key in obj) {
            result[key] = obj[key]
        }
    });
    return result;
}

const res = pickObjectKeys(user, ['age', 'skills']);
console.log(res);