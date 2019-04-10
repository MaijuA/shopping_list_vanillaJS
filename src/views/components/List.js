import Utils from "../../services/Utils.js";
import { createDeleteButton, removeObject, listNames } from "./Home.js";

let listObject = {};

export let updatedLists = [];

function createListElement(object) {
  const li = document.createElement("li");
  li.setAttribute("tabIndex", "0");

  // mark the bought items as bought
  if (object.bought) {
    li.classList.add("bought");
  } else {
    li.classList.add("notBought");
  }

  li.appendChild(document.createTextNode(object.name));
  li.appendChild(createDeleteButton("dBtn"));
  return li;
}

// add new item to the list
function eventHandlerAdd(event) {
  event = event || window.event;
  if (event.target.classList.contains("add")) {
    if (newItem.value.length < 1) return;
    // check if item already exists
    const alreadyExists = listObject.items.find(item => {
      return newItem.value.toLowerCase() === item.name.toLowerCase();
    });
    if (alreadyExists) {
      alert("Item is already on the list!");
      newItem.value = "";
      return;
    }

    const itemObject = {
      name: newItem.value,
      bought: false
    };

    listObject.items.push(itemObject);

    const li = document.createElement("li");
    li.classList.add("notBought");
    const liText = document.createTextNode(newItem.value);
    li.appendChild(liText);
    const button = document.createElement("button");
    button.classList.add("dBtn");
    button.setAttribute("alt", "Delete");
    const dBtnText = document.createTextNode("X");
    button.appendChild(dBtnText);
    li.appendChild(button);
    const div = document.createElement("div");
    div.appendChild(li);

    list.innerHTML = div.innerHTML + list.innerHTML;
    newItem.value = "";

    // save changes
    updatedLists = updateList(updatedLists, listObject);
    localStorage.setItem("home", JSON.stringify(updatedLists));
  }
}

// mark item as bought/not bought or delete item
function eventHandler(event) {
  event = event || window.event;
  // mark item as bought/not bought
  let str = event.target.textContent;
  if (event.target.classList.contains("notBought")) {
    listObject.items = editObject("bought", listObject.items, str);
    event.target.classList.replace("notBought", "bought");
  } else if (event.target.classList.contains("bought")) {
    listObject.items = editObject("notBought", listObject.items, str);
    event.target.classList.replace("bought", "notBought");
  }
  // delete item
  if (event.target.classList.contains("dBtn")) {
    event.target.parentElement.classList.add("delete");
    str = event.target.parentElement.textContent;
    str = str.substring(0, str.length - 1);
    listObject.items = removeObject(listObject.items, str);
  }
  // save changes
  updatedLists = updateList(updatedLists, listObject);
  localStorage.setItem("home", JSON.stringify(updatedLists));
}

// share or unshare list
function eventHandlerShare(event) {
  event = event || window.event;
  const str = event.target.textContent;

  if (event.target.classList.contains("unshared")) {
    const confirmUser = confirm(
      "Do you want to share the list with " + str + "?"
    );
    if (confirmUser) {
      event.target.classList.replace("unshared", "shared");
      listObject.friends = editObject("shared", listObject.friends, str);
    }
  } else if (event.target.classList.contains("shared")) {
    const confirmUser = confirm(
      "Do you want to unshare the list with " + str + "?"
    );
    if (confirmUser) {
      event.target.classList.replace("shared", "unshared");
      listObject.friends = editObject("unshared", listObject.friends, str);
    }
  }

  // save changes
  updatedLists = updateList(updatedLists, listObject);
  localStorage.setItem("home", JSON.stringify(updatedLists));
}

// change items as bought/not bought or lists as shared/unshared
function editObject(classString, list, str) {
  let object = {};
  // bought or not bought
  switch (classString) {
    case "notBought": {
      str = str.substring(0, str.length - 1);
      object = {
        name: str,
        bought: false
      };
      break;
    }
    case "bought": {
      str = str.substring(0, str.length - 1);
      object = {
        name: str,
        bought: true
      };
      break;
    }
    // shared or not shared
    case "unshared": {
      object = {
        name: str,
        shared: false
      };
      break;
    }
    case "shared": {
      object = {
        name: str,
        shared: true
      };
      break;
    }
  }
  const index = list.findIndex(obj => obj.name === str);
  list[index] = object;
  return list;
}

// check if the list is shared and return a suitable class
function isListShared(friendObject) {
  if (friendObject.shared) return "shared";
  return "unshared";
}

// update list with a changed object
function updateList(list, listObject) {
  const index = list.findIndex(list => list.id === listObject.id);
  list[index] = listObject;
  return list;
}

function createView(listObject, ol) {
  const div = document.createElement("div");
  const section = document.createElement("section");
  section.classList.add("section");
  const a = document.createElement("a");
  a.classList.add("link");
  a.setAttribute("href", "/#/");
  const aText = document.createTextNode("<<");
  a.appendChild(aText);
  section.appendChild(a);
  const h1 = document.createElement("h1");
  const h1Text = document.createTextNode(listObject.name);
  h1.appendChild(h1Text);
  h1.setAttribute("tabindex", "0");
  section.appendChild(h1);
  const form = document.createElement("form");
  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("id", "newItem");
  input.setAttribute("maxlength", "24");
  input.setAttribute("placeholder", "Add new item...");
  input.setAttribute("alt", "Add new item");
  form.appendChild(input);
  const button = document.createElement("button");
  button.classList.add("add");
  const textButton = document.createTextNode("Add");
  button.appendChild(textButton);
  form.appendChild(button);
  section.appendChild(form);
  section.appendChild(ol);
  const p = document.createElement("p");
  p.setAttribute("tabindex", "0");
  const pText = document.createTextNode("Share list");
  p.appendChild(pText);
  section.appendChild(p);
  listObject.friends.map(friend => {
    const button = document.createElement("button");
    button.classList.add(isListShared(friend));
    const btnText = document.createTextNode(friend.name);
    button.appendChild(btnText);
    section.appendChild(button);
  });
  div.appendChild(section);
  return div;
}

const List = {
  render: async () => {
    // default friends for a new list
    const friendsDefault = [
      { name: "Alice", shared: false },
      { name: "Bob", shared: false },
      { name: "Carol", shared: false },
      { name: "David", shared: false }
    ];

    listObject = {};
    updatedLists = [];

    // get id from url
    const request = Utils.parseRequestURL();

    // get list from localStorage
    const retrievedData = localStorage.getItem("home");
    updatedLists = JSON.parse(retrievedData);
    listObject = updatedLists.find(object => object.id === request.id);

    // trying to solve an issue with firefox
    if (listObject === undefined) {
      updatedLists = listNames;
      listObject = updatedLists.find(object => object.id === request.id);
    }

    // show error page if the list is not found
    if (listObject === undefined) {
      window.location.replace("/#/error");
    }

    // show friends and sharing information
    if (listObject.friends.length < 1) {
      listObject.friends = friendsDefault;
      const index = updatedLists.findIndex(list => list.id === listObject.id);
      updatedLists[index] = listObject;
      localStorage.setItem("home", JSON.stringify(updatedLists));
    }

    const ol = document.createElement("ol");
    ol.classList.add("list");
    ol.setAttribute("id", "list");

    // get list items
    if (listObject.items !== null) {
      listObject.items
        .slice()
        .reverse()
        .map(item => {
          ol.appendChild(createListElement(item));
        });
    }

    const view = createView(listObject, ol).innerHTML;
    console.log(view);
    return view;
  },
  after_render: async () => {
    // eventListeners
    // adding items
    document.addEventListener("click", eventHandlerAdd, false);
    // marking items as bought/not bought or deleting items
    document.addEventListener("click", eventHandler, false);
    // sharing list with friends
    document.addEventListener("click", eventHandlerShare, false);
  }
};

export default List;
