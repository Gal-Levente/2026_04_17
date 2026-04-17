import data from "./data.json" with {type: 'json'}
import { NavigationBar, Table, Form } from "./view.js";
import { Manager } from "./manager.js";

const manager = new Manager(data.arr);
const navbar = new NavigationBar('navbar');
const table = new Table('table', manager, navbar);
const form = new Form('form');

navbar.appendTo(document.body);

navbar.addViewElement('Táblázat', table);
navbar.addViewElement('Form', form);