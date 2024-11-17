
interface IItem {
    id: number;
    date: string;
    title: string;
}

enum Mode { 
    id,
    date
}

class IteratorArray {
    private items: IItem[];
    private mode: Mode;
    private index: number;

    constructor(items: IItem[], mode: Mode = Mode.id) {
        this.items = [...items];
        this.mode = mode;
        this.index = 0;

        this.sortItems();
    }

    private sortById() {
        this.items.sort((a, b) => a.id - b.id);
    }

    private sortByDate() {
        this.items.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateA.getTime() - dateB.getTime();
          });
    }

    private sortItems() {
        if(this.mode === Mode.id) {
            this.sortById();
        }
        if(this.mode === Mode.date) {
            this.sortByDate();
        }
    }

    public switchMode(mode: Mode) {
        if(this.mode !== mode) {
            this.mode = mode;
            this.index = 0;
            this.sortItems();
        }
    }

    public next(): IItem | null {
        if(this.index < this.items.length) {
            return this.items[this.index++];
        }
        return null;
    }

    public hasNext(): boolean {
        return this.index < this.items.length;
    }

    public reset() {
        this.index = 0;
    }
}


const items: IItem[] = [
    { id: 1, date: '01-01-2023', title: 'Тест 1' },
    { id: 2, date: '03-01-2023', title: 'Тест 2' },
    { id: 3, date: '02-01-2023', title: 'Тест 3' },
];

const iteratorById = new IteratorArray(items, Mode.id);
while (iteratorById.hasNext()) {
    console.log(iteratorById.next());
}

iteratorById.switchMode(Mode.date);
while (iteratorById.hasNext()) {
    console.log(iteratorById.next());
}