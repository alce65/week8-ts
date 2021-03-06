import { iComponent } from '../interfaces/component.js';
import { iTaskModel } from '../models/task.js';
import { TaskStore } from '../services/task-store.js';
import { Component } from './component.js';
import { TodoAdd } from './todo-add.js';
import { TodoItem } from './todo-item.js';

export class TodoList extends Component implements iComponent {
    template: string = '';
    tasksState: Array<iTaskModel>;

    storeService: TaskStore;
    constructor(public selector: string) {
        super();
        this.storeService = new TaskStore();
        this.tasksState = this.storeService.getTask();
        this.render();
    }
    createTemplate() {
        let htmlItems = '';
        this.tasksState.forEach((item) => {
            htmlItems += new TodoItem('', item).template;
        });

        return `
        <main class="tasks"><h2>Tareas</h2>
            <slot class="todo-add"></slot>
            <ul>${htmlItems}</ul>
        </main>
        `;
    }

    render() {
        this.storeService.setTak(this.tasksState);
        this.template = this.createTemplate();
        super.render(this.selector);
        this.manageComponent();
        new TodoAdd('slot.todo-add', this.addTasks.bind(this));
    }

    manageComponent() {
        document
            .querySelectorAll('span.button')
            .forEach((item) =>
                item.addEventListener('click', this.handlerButton.bind(this))
            );
        document
            .querySelectorAll('[type="checkbox"]')
            .forEach((item) =>
                item.addEventListener('change', this.handlerCheck.bind(this))
            );
    }

    handlerButton(ev: Event) {
        const selectId = (<HTMLElement>ev.target).dataset.id as string;
        console.log('click', selectId);
        this.tasksState = this.tasksState.filter(
            (item) => item.id !== +selectId
        );
        this.render();
    }

    handlerCheck(ev: Event) {
        const selectId = (<HTMLElement>ev.target).dataset.id as string;
        console.log('check', selectId);
        this.tasksState = this.tasksState.map((item) => ({
            ...item,
            isCompleted:
                item.id === +selectId ? !item.isCompleted : item.isCompleted,
        }));
        this.render();
    }

    addTasks(task: iTaskModel) {
        // this.tasksState.push(task)
        this.tasksState = [...this.tasksState, task];
        this.render();
    }
}

// Create
// Read
// Update
// Delete
