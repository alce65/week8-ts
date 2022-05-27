import { iComponent } from '../interfaces/component.js';
import { Component } from './component.js';

export class TodoList extends Component implements iComponent {
    template: string;
    constructor(public selector: string) {
        super();
        this.template = this.createTemplate();
        this.render(this.selector);
    }
    createTemplate() {
        return `
        <main><h2>Tareas</h2></main>
        `;
    }
}
