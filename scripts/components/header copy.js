import { Component } from './component';
export class Header extends Component {
    selector;
    template;
    constructor(selector) {
        super();
        this.selector = selector;
        this.template = this.createTemplate();
        this.render(this.selector);
    }
    createTemplate() {
        return ``;
    }
}
//# sourceMappingURL=header%20copy.js.map