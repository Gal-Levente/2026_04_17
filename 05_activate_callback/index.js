import data from './data.json' with {type: 'json'}
import { Manager } from './manager.js'
import { NavigationBar, Table, Gomb } from './view.js'

const manager = new Manager(data.arr);
const navbar = new NavigationBar('navbar');

const table = new Table('table', manager);
manager.RenderCallback = (list) => table.render(list);
const gomb = new Gomb('gomb', manager);

navbar.addViewElement("Táblázat", table);
navbar.addViewElement("Elem hozzáadó gomb", gomb); 

navbar.appendTo(document.getElementById('app'));
navbar.navigate('table');