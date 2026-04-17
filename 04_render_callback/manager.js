/**
 * @callback RenderCallback
 * @param {Color[]}
 * @returns {void}
 */

class Manager {
    /** @type {Color[]} */
    #list;
    /** @type {RenderCallback} */
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
    setRenderCallback(callback) {
        this.#renderCallback = callback;
    }
    /**
     * @returns {void}
     */
    getEmptyList() {
        this.#list = [];
        this.#renderCallback(this.#list);
    }
    getAllElement() {
        this.#renderCallback(this.#list);
        return this.#list;
    }
}

export { Manager }