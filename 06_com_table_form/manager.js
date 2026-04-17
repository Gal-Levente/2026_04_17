class Manager {
    #list;
    #renderCallback;

    constructor(){
        this.#list = [];
    }

    set renderCallback(callback){
        this.#renderCallback = callback;
    }

    getAllElement(){
        if (this.#renderCallback){
            this.#renderCallback(this.#list)
        } 
    }

    addElement(elem){
        const newColor = new Color(
            this.#list.length,
            elem.szin
        );

        this.#list.push(newColor);

        this.getAllElement();
    }
}

class Color {
    #id;
    #color;

    constructor(id, color){
        this.#id = id;
        this.#color = color;
    }

    get id(){return this.#id;}
    set id(value){this.#id = value;}

    get color(){return this.#color;}
    set color(value){this.#color = value;}
}

export {Manager}