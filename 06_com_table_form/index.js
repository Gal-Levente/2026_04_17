import data from './data.json' with {type: 'json'}
import { Manager } from './manager.js'
import { NavigationBar, Table, Form } from './view.js'

const manager = new Manager();
const navbar = new NavigationBar('navbar');
const table = new Table('table', manager);
const form = new Form('form', data.formFieldList, manager);
navbar.addViewElement('Táblázat', table);
navbar.addViewElement('Form', form);

navbar.appendTo(document.getElementById('app'));