/**
 * @callback ActivateCallback
 * @returns {void}
 */

import { Manager } from "./manager.js";

class ViewElement {
    /**@type {string} */
    #id;
    /**@type {HTMLDivElement} */
    #div;
    /**@type {ActivateCallback} */
    #activateCallback;

    /**
     * @param {string} id 
     */
    constructor(id) {
        this.#id = id;
        this.#div = document.createElement('div');
        this.#div.id = id;   
    }

    /**
     * @param {HTMLElement} parent 
     */
    appendTo(parent) {
        parent.appendChild(this.#div);
    }

    /**
     * @param {string} value
     * @returns {void} 
     */
    navigate(value) {
        if (this.#activateCallback){
            this.#activateCallback();
        }
    }

    /**
     * @returns {string}
     */
    get id() {
        return this.#id;
    }
    /**
     * @returns {HTMLDivElement}
     */
    get div() {
        return this.#div;
    }

    set activateCallback(callback){
        this.#activateCallback = callback;
    }
}

class Table extends ViewElement {
    /**@type {Manager} */
    #manager;

    constructor(id, manager){
        super(id);
        this.#manager = manager;

        this.#manager.renderCallback = (colorList) => {
            this.render(colorList);
        };
    }

    render(colorList){
        this.div.innerHTML = `
            <table>
                <thead>
                    <tr><th>ID</th><th>Szín</th></tr>
                </thead>
                <tbody>
                    ${colorList.map(c => `
                        <tr>
                            <td>${c.id}</td>
                            <td style="background-color: ${c.color}">${c.color}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }
}

class NavigationBar extends ViewElement {
    /**@type {ViewElement[]} */
    #viewElementList;
    #buttonbar;
    #viewContainer;

    constructor(id) {
        super(id);
        this.#viewElementList = [];

        this.#buttonbar = document.createElement("div");
        this.#viewContainer = document.createElement('div');

        this.div.appendChild(this.#buttonbar);
        this.div.appendChild(this.#viewContainer);
    }

    /**
     * @param {string} value 
     */
    navigate(value) {
        const target = this.#viewElementList.find(t => t.id === value);

        if (target){
            this.#viewContainer.innerHTML = '';
            target.appendTo(this.#viewContainer);
            target.navigate();
        }
    }

    /**
     * @param {string} label 
     * @param {ViewElement} viewElement 
     */
    addViewElement(label, viewElement) {
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
                this.navigate(viewElement.id);
            }
        });
    }
}

class Form extends ViewElement {
    #manager;
    #formInputList;

    constructor(id, formFieldList, manager){
        super(id);
        this.#manager = manager;
        this.#formInputList = [];

        const formElement = document.createElement('form');

        formFieldList.forEach(f => {
            const input = new FormInput(f.id, f.label, f.name, formElement);
            this.#formInputList.push(input);
        });

        const submitBtn = document.createElement('button');
        submitBtn.innerText = 'Submit';
        formElement.appendChild(submitBtn);

        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const colorData = {
                szin: this.#formInputList.find(i => i.getName() === 'color').getValue()
            };

            this.#manager.addElement(colorData);
            alert('Color appendeds! ');
        });
        this.div.appendChild(formElement);
    }
}


class FormInput {
    #inputElement;
    #errordiv;
    #name;

    constructor(id, label, name, parent){
        this.#name = name;

        const container = document.createElement('div');

        const labelElement = document.createElement('label');
        labelElement.innerText = label;
        labelElement.htmlFor = id;

        this.#inputElement = document.createElement('input');
        this.#inputElement.id = id;
        this.#inputElement.name = name;
        this.#inputElement.type = "text";

        this.#errordiv = document.createElement('div');
        this.#errordiv.className = "error-message";
        this.#errordiv.style.color = "red";

        container.appendChild(labelElement);
        container.appendChild(this.#inputElement);
        container.appendChild(this.#errordiv);
        parent.appendChild(container);
    }


    validate(){
        if (this.#inputElement.value.trim() === ""){
            this.#errordiv.innerText = "Ez a mezo kotelezo!"
            return false;
        }
        this.#errordiv.innerText = "";
        return true;
    }

    getName() {
        return this.#name;
    }

    getValue() {
        return this.#inputElement.value;
    }
}



export {Table, NavigationBar, Form}