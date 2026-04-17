class ParentViewElementClass {
    /**@type {string} */
    #id;
    /**@type {HTMLDivElement} */
    #div;
    /**
     * @param {string} id 
     */
    constructor(id) {
        this.#id = id;
        this.#div = document.createElement("div");
        this.#div.classList.add("card");
    }
    get div() {
        return this.#div;
    }
    /**
     * @param {HTMLElement} parent 
     */
    appendTo(parent) {
        parent.appendChild(this.#div);
    }
}

class ClassA extends ParentViewElementClass {
    constructor(id) {
        super(id);
        const cardId = document.createElement("div");
        cardId.classList.add("head");
        cardId.textContent = `id: ${id}`;
        this.div.appendChild(cardId);
        const cardA = document.createElement("div");
        cardA.textContent = "ChildA";
        this.div.appendChild(cardA);
    }

}

class ClassB extends ParentViewElementClass {
    constructor(id) {
        super(id);
        const cardId = document.createElement("div");
        cardId.classList.add("head");
        cardId.textContent = `id: ${id}`;
        this.div.appendChild(cardId);
        const cardA = document.createElement("div");
        cardA.textContent = "ChildB";
        this.div.appendChild(cardA);
    }
}

export {ClassA, ClassB}