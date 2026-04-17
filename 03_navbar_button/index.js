import { NavigationBar, ClassA, ClassB } from "./navbar.js";

const navigationBar = new NavigationBar();
navigationBar.appendTo(document.body);
navigationBar.addViewElement("ClassA oldala", new ClassA("a"));
navigationBar.addViewElement("ClassB oldala", new ClassB("b"));