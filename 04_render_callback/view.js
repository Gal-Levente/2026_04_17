import { Manager } from "./manager.js";

class ViewElement {
    /** @type {HTMLDivElement} */
    #div;
    /** @type {Manager} */
    #manager;
    constructor(manager) {
        this.#manager = manager;
        this.#div = document.createElement("div");
    }
    /**
     * @param {HTMLElement} parentElement
     * @return {void}
     */
    appendTo(parentElement) {
        parentElement.appendChild(this.#div);
    }
    /**
     * @returns {Manager}
     */
    get manager() {
        return this.#manager;
    }
    /**
     * @returns {HTMLDivElement}
     */
    get div() {
        return this.#div;
        
    }
}

class ButtonElement extends ViewElement {
    constructor(manager, table) {
        super(manager);
        const button = document.createElement("button");
        button.textContent = "Lista lekérés";
        this.div.appendChild(button);
        button.addEventListener("click", (e) => {
            e.preventDefault();
            this.manager.getAllElement();
        });
    }
}

class EmptyButtonElement extends ViewElement {
    constructor(manager, table) {
        super(manager);
        const button = document.createElement("button");
        button.textContent = "Üres Lista lekérés";
        this.div.appendChild(button);
        button.addEventListener("click", (e) => {
            e.preventDefault();
            this.manager.getEmptyList();
            table.changeText('Üres lista');
        });
    }
}

class TableElement extends ViewElement {
    /** @type {HTMLTableSectionElement} */
    #tbody;
    constructor(manager) {
        super(manager);
        const table = document.createElement('table');
        this.div.appendChild(table);
        //head
        const thead = document.createElement('thead');
        table.appendChild(thead);
        const th = document.createElement('th');
        th.innerText = "Elemek";
        thead.appendChild(th);
        //body
        this.#tbody = document.createElement('tbody');
        this.#tbody.innerText = 'Még nem történt callback hívás';
        table.appendChild(this.#tbody);
    }
    
    changeText(text){
        this.#tbody.innerText = text;
    }

    /**
     * @returns {HTMLTableSectionElement}
     */
    get tbody() {
        return this.#tbody;
    }

    render(list){
        this.tbody.innerText = "";
        list.forEach(element => {
            const row = document.createElement('tr');
            const td = document.createElement('td');
            td.innerText = element.szin;
            row.appendChild(td);
            this.tbody.appendChild(row);
        });
    }
}

export { ViewElement, ButtonElement, EmptyButtonElement, TableElement }