/**
 * @callback RenderCallback
 * @param {Color[]}
 * @returns {void}
 * 
 * @typedef ColorType
 * @param {string} szin
 */

class Manager {
    /**@type {Color[]} */
    #list;
    /**@type {RenderCallback} */
    #renderCallback;

    /**
     * @param {ColorType} data 
     */
    constructor(data) {
        this.#list = [];
    }

    set renderCallback(callback) {
        this.#renderCallback = callback;
    }
    /**
     * @returns {void}
     */
    getAllElement() {
        if (this.#renderCallback) {
            this.#renderCallback(this.#list);
        }
    }

    /**
     * @param {ColorType} elem 
     */
    addElement(elem) {
        const newColor = new Color();
        newColor.color = elem.szin;
        // Logic for ID generation would go here
        this.#list.push(newColor);
        this.getAllElement(); // Refresh UI
    }

    /**
     * @param {number} id 
     * @param {ColorType} elem 
     */
    updateElement(id, elem) {
        const target = this.#list.find(c => c.id === id);
        if (target) {
            target.color = elem.szin;
            this.getAllElement(); // Refresh UI
        }
    }
}

class Color {
    #id;
    #color;

    constructor() {

    }

    get id() {
        return this.#id;
    }
    /**@type {number} */
    set id(value) {
        this.#id = value;
    }
    get color() {
        return this.#color;
    }
    /**@type {string} */
    set color(value) {
        this.#color = value;
    }
}

export {Manager}