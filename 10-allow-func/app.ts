
function AllowFunc(validatorFn: (value: number) => boolean) {
    return function (
        target: Object,
        propertyKey: string | symbol
     ){
        let value: number;

        const setter = function (newValue: number) {
            if(validatorFn(newValue)) {
                value = newValue;
            } else {
                return;
            }
        }

        const getter = function () {
            return value;
        }

        Object.defineProperty(target, propertyKey, {
            set: setter,
            get: getter
        });
    }
}

class User {
    @AllowFunc((a: number) => a > 0)
    age: number = 30;
}

const person = new User();
console.log(person.age);

person.age = 0;
console.log(person.age);

person.age = 20;
console.log(person.age);
  