
class HashMap<K, V> {
    private size: number;
    private buckets: Array<Array<[K, V]>>;

    constructor(size: number) {
        this.size = size;
        this.buckets = new Array(size).fill(null).map(() => []);
    }

    private hash(key: K): number {
        const keyStr = key!.toString();
        let hashValue = 0;
        
        for(let i = 0; i < keyStr.length; i++) {
            hashValue += keyStr.charCodeAt(i);
        }
        return hashValue % this.size;
    }

    set(key: K, value: V): void {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        const foundIndex = bucket.findIndex(([k, _]) => k === key);

        if(foundIndex !== -1) {
            bucket[foundIndex] = [key, value];
        } else {
            bucket.push([key, value]);
        }
    }

    delete(key: K): void {
        const index = this.hash(key);
        let bucket = this.buckets[index];

        this.buckets[index] = bucket.filter(([k, _]) => k !== key);
    }

    get(key: K): V | undefined {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        const found = bucket.find(([k]) => k === key);

        if(found) {
            const [_, value] = found;
            return value;
        } else {
            return undefined;
        }
    }

    clear() {
        this.buckets = this.buckets.map(() => []);
    }
}

let weatherMap = new HashMap<string, number>(10);
weatherMap.set('London', 20);
weatherMap.clear();
weatherMap.set('Berlin', 25);
weatherMap.set('London', 22);
weatherMap.set('Liman', 18);

weatherMap.delete('Berlin');

console.log(weatherMap.get('Berlin'));
console.log(weatherMap.get('London'));
console.log(weatherMap.get('Liman'));

let reserveWeatherMap = new HashMap<number, string>(5);
reserveWeatherMap.set(20, 'London');
console.log(reserveWeatherMap.get(20));