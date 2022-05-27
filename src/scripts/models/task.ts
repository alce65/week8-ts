interface iTaskModel {
    id: number | string;
    name: string;
    responsible: string;
    isCompleted: boolean;
}

class TaskModel implements iTaskModel {
    id: number;
    isCompleted: boolean;
    static generateId() {
        return Math.floor(Math.random() * 100_000);
    }
    constructor(public name: string, public responsible: string) {
        this.id = TaskModel.generateId();
        this.isCompleted = false;
    }
}
