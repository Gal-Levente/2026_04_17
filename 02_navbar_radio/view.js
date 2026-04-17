class ViewElement {
    /** @type {string} */
    #id;
    /** @type {HTMLDivElement} */
    #div;
    /**
     * @param {string} id 
     */
    constructor(id) {
        this.#id = id;
        this.#div = document.createElement("div");
        this.#div.id = id;
    }
    /**
     * @param {HTMLElement} parent 
     */
    appendTo(parent) {
        parent.appendChild(this.#div);
    }
    /**
     * @param {string} id 
     */
    activate(id) {
        if(this.#id === id) {
            this.#div.classList.remove("hidden");
        } else {
            this.#div.classList.add("hidden");
        }
    }
    /** @returns {string} */
    get id() {
        return this.#id;
    }
    /** @returns {HTMLDivElement} */
    get div() {
        return this.#div;
    }
}

export {ViewElement}