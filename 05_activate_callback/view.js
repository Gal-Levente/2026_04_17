class ViewElement{
    /**@type {string} */
    #id;

    /**@type {HTMLDivElement} */
    #div;

    /**@type {AcitivateCallback} */
    #activateCallback;

    constructor(id){
        this.#id = id;
        this.#div = document.createElement('div');
        this.#div.classList.add('buttonbar')
        this.#div.id = id;
    }

    appendTo(parent){
        parent.appendChild(this.#div); //(❁´◡`❁)
    }

    navigate(){
        if(this.#activateCallback){
            this.#activateCallback();
        }
    }

    /**@returns {string} */
    get id(){
        return this.#id;
    }

    /**@returns {HTMLDivElement} */
    get div(){
        return this.#div;
    }

    /**@param {AcitivateCallback} callback */
    set activateCallback(callback){
        this.#activateCallback = callback;
    }
}



class Table extends ViewElement{
    /**@type {Manager}*/
    #manager;
    /**@type {HTMLTableSectionElement}*/
    #tbody;

    constructor(id, manager){
        super(id);
        this.#manager = manager;

        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const th = document.createElement('th');
        th.innerText = 'Elemek';
        headerRow.appendChild(th);
        thead.appendChild(headerRow);
        table.appendChild(thead);

        this.#tbody = document.createElement('tbody');
        table.appendChild(this.#tbody);
        this.div.appendChild(table);

        this.activateCallback = () => {
            this.#manager.getAllElement();
        }
    }

    render(list){
        this.#tbody.innerHTML = '';

        if (!list || list.length === 0){
            const row = document.createElement('tr');
            const td = document.createElement('td');
            td.innerText = 'Nincs adat';
            row.appendChild(td);
            this.#tbody.appendChild(row);
            return;
        }

        list.forEach(element => {
            const row = document.createElement('tr');
            const td = document.createElement('td');
            td.innerText = element.szin;
            row.appendChild(td);
            this.#tbody.appendChild(row);
        });
    }
}

class Gomb extends ViewElement{
    /**@type {Manager}*/
    #manager;

    constructor(id, manager){
        super(id);
        this.#manager = manager;

        const button = document.createElement('button');
        button.innerText = 'Új elem hozzáadása';
        button.addEventListener('click', (e) => {
            e.preventDefault();
            this.#manager.addElement({ szin: 'új elem' });
            this.#manager.getAllElement();
        });
        this.div.appendChild(button);
    }
}

class NavigationBar extends ViewElement{
    #viewElementList;
    #buttonbar;
    #viewContainer;

    constructor(id){
        super(id);
        this.#viewElementList = [];

        this.#buttonbar = document.createElement('div');
        this.#buttonbar.className = 'navbar-buttons';
        this.#viewContainer = document.createElement('div');
        this.#viewContainer.className = 'navbar-view-container';

        this.div.appendChild(this.#buttonbar);
        this.div.appendChild(this.#viewContainer);
    }

    addViewElement(label, viewElement){
        this.#viewElementList.push(viewElement);
        
        const menuBtn = document.createElement('button');
        menuBtn.innerText = label;
        menuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.navigate(viewElement.id);
        });
        
        this.#buttonbar.appendChild(menuBtn);
    }

    /**
     * @param {string} id
     * @returns {void} 
     */
    navigate(id) {
        const target = this.#viewElementList.find(t => t.id === id);

        if (target){
            this.#viewContainer.innerHTML = '';
            target.appendTo(this.#viewContainer);
            target.navigate();
        }
    }
}


export {NavigationBar, Table, Gomb}