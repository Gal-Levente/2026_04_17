/**
 * @typedef ParamType
 * @param {number?} id
 * 
 * @typedef EditColorType
 * @param {number} id
 * @param {string} szin
 */

class ViewElement{
    /**@type {string}*/
    #id;
    /**@type {HTMLDivElement}*/
    #div;
    #activateCallback;

    /**@param {string}*/
    constructor(id){
        this.#id = id;
        this.#div = document.createElement('div');
        this.#div.id = id;
    }
    
    appendTo(parent){
        parent.appendChild(this.#div);
    }

    activate(value, param){
        this.#div.classList.add(value);
        if (this.#activateCallback){
            this.#activateCallback(param)
        }
    }

    set activateCallback(callback){
        this.#activateCallback = callback;
    }

    get id(){return this.#id;}
    get div(){return this.#div}
}

class NavigationBar extends ViewElement {
    /**@type {ViewElement[]} */
    #viewElementList;

    /**
     * @param {string} id 
     */
    constructor(id) {
        super(id);
        this.#viewElementList = [];
        this.div.classList.add("navbar");
    }

    /**
     * @param {string} value 
     * @param {ParamType} param 
     */
    activate(value, param) {
        for (const viewElement of this.#viewElementList) {
            if (viewElement.id === value) {
                viewElement.div.style.display = 'block';
                viewElement.activate(param);
            } else {
                viewElement.div.style.display = 'none';
            }
        }
    }

    /**
     * @param {string} label 
     * @param {ViewElement} viewElement 
     */
    addViewElement(label, viewElement) {
        this.#viewElementList.push(viewElement);

        const div = document.createElement('div');
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
                this.activate(viewElement.id, {id: null});
            }
        });
    }
}


class Table extends ViewElement{
    #manager;

    constructor(id, manager) {
        super(id);
        this.#manager = manager;

        const table = document.createElement('table');
        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>Szín megnevezése</th>
                <th>Műveletek</th>
            </tr>`;
        const tbody = document.createElement('tbody');
        
        table.appendChild(thead);
        table.appendChild(tbody);
        this.div.appendChild(table);

        this.#manager.renderCallback = (colorList) => {
            tbody.innerHTML = '';

            colorList.forEach(colorObj => {
                const tr = document.createElement('tr');
                
                const tdName = document.createElement('td');
                tdName.innerText = colorObj.color; 
                tr.appendChild(tdName);

                const tdActions = document.createElement('td');
                const editBtn = document.createElement('button');
                editBtn.innerText = "Szerkesztés";
                
                editBtn.onclick = () => {
                    const param = {
                        id: colorObj.id,
                        szin: colorObj.color
                    };
                    
                    const event = new CustomEvent('edit-color', { 
                        detail: { viewId: 'colorForm', param: param },
                        bubbles: true 
                    });
                    this.div.dispatchEvent(event);
                };

                tdActions.appendChild(editBtn);
                tr.appendChild(tdActions);
                tbody.appendChild(tr);
            });
        };
    }

    
}

class Form extends ViewElement {
    /**@type {Manager} */
    #manager;
    /**@type {FormInput[]} */
    #formInputList;
    /**@type {EditColorType} */
    #szinparam;


}


export {NavigationBar, Table, Form}