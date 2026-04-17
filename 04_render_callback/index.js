import data from "./data.json" with { type: "json" };
import { Manager } from "./manager.js";
import { ButtonElement, EmptyButtonElement, TableElement } from "./view.js";

const manager = new Manager(data.arr);
const table = new TableElement(manager);
const buttonElement = new ButtonElement(manager, table);
const emptyButtonElement = new EmptyButtonElement(manager, table);

manager.setRenderCallback((list) => table.render(list));

buttonElement.appendTo(document.body);
emptyButtonElement.appendTo(document.body);
table.appendTo(document.body);