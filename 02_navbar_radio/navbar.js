import { ViewElement } from "./view.js";

class NavigationBar extends ViewElement {
    /** @type {ViewElement[]} */
    #viewElementList;
    constructor() {
        super("navbar");
        this.#viewElementList = [];
    }
    /**
     * @param {string} label 
     * @param {ViewElement} viewElement 
     * @returns {void}
     */
    addViewElement(label, viewElement) {
        viewElement.appendTo(document.body);
        this.#viewElementList.push(viewElement);

        const div = document.createElement("div");
        this.div.appendChild(div);
        const radio = document.createElement("input");
        div.appendChild(radio);
        radio.type = "radio";
        radio.name = "radiobutton";
        radio.id = viewElement.id;

        const radioLabel = document.createElement("label");
        radioLabel.htmlFor = radio.id;
        radioLabel.textContent = label;
        div.appendChild(radioLabel);

        radio.addEventListener("change", () => {
            if (radio.checked) {
                this.activate(viewElement.id);
            }
        });
    }
    /**
     * @param {string} id 
     */
    activate(id) {
        this.div.querySelector(`#${id}`).checked = true;
        for(const viewElement of this.#viewElementList) {
            viewElement.activate(id);
        }
    }
}

class ClassA extends ViewElement {
    constructor(id) {
        super(id);
        this.div.textContent = `ClassADiv`;
    }
}

class ClassB extends ViewElement {
    constructor(id) {
        super(id);
        this.div.textContent = `ClassBDiv`;
    }
}

export {NavigationBar, ClassA, ClassB}