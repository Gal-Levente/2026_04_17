/**
 * @typedef Color
 * @param {string} szin
 */
/**
 * @callback RenderCallback
 * @param {Color[]} colorList
 * @returns {void}
 */

class Manager {
    /**@type {Color[]} */
    #list = [];
    /**@type {RenderCallback} */
    #renderCallback;

    /**
     * @param {Color[]} data 
     */
    constructor(data) {
        this.#list = data;
    }

    /**
     * @param {RenderCallback} callback 
     */
    set RenderCallback(callback) {
        this.#renderCallback = callback;
    }

    /**
     * @returns {void}
     */
    getAllElement() {
        if (this.#renderCallback){
            this.#renderCallback(this.#list);
        }
    }

    /**
     * @param {Color} elem 
     */
    addElement(elem) {
        this.#list.push(elem);
    }
}

export {Manager}