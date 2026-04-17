import { ViewElement } from "./view.js";

class NavigationBar extends ViewElement {
    /** @type {ViewElement[]} */
    #viewElementList;
    /** @type {HTMLDivElement} */
    #buttonBar;
    /** @type {HTMLDivElement} */
    #viewContainer;
    constructor() {
        super("navbar");
        this.#viewElementList = [];
        this.#buttonBar = document.createElement("div");
        this.#buttonBar.className = "buttonbar";
        this.div.appendChild(this.#buttonBar);
        this.#viewContainer = document.createElement("div");
        this.div.appendChild(this.#viewContainer);
    }
    /**
     * @param {string} label 
     * @param {ViewElement} viewElement
     * @returns {void} 
     */
    addViewElement(label, viewElement) {
        const button = document.createElement("button");
        button.id = "button_" + viewElement.id;
        button.textContent = label;
        this.#buttonBar.appendChild(button);

        this.#viewElementList.push(viewElement);

        button.addEventListener("click", () => {
            this.navigate(viewElement.id);
        });
    }
    /**
     * @param {string} id 
     */
    navigate(id) {
        let found = false;
        let viewElement;
        for(const element of this.#viewElementList) {
            if (element.id === id) {
                found = true;
                viewElement = element;
            }
        }
        if(!found) {
            return;
        }

        this.#viewContainer.innerHTML = "";
        viewElement.appendTo(this.#viewContainer);

        for (const button of this.#buttonBar.querySelectorAll("button")) {
            if (button.id === "button_" + id) {
                button.classList.add("active");
            } else {
                button.classList.remove("active");
            }
        }
    }

    activate(id) {
        this.navigate(id);
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