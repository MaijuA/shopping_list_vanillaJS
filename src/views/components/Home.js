export let listNames = [];
import { updatedLists } from "./List.js";

function createListItem(listObject) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.setAttribute("href", "/#/p/" + listObject.id);
  a.appendChild(document.createTextNode(listObject.name));
  li.appendChild(a);
  li.classList.add("homeli");
  li.appendChild(createDeleteButton("dBtnHome"));

  // list of friends with whom the list is shared with
  const shared = [];
  const friends = listObject.friends;
  if (friends !== null) {
    friends.map(friend => {
      if (friend.shared) {
        shared.push(friend.name);
      }
    });
  }
  const p = document.createElement("p");
  p.classList.add("listParagraph");
  p.setAttribute("tabindex", "0");
  if (shared.length > 0) {
    p.appendChild(document.createTextNode(shared.join(", ")));
    li.appendChild(p);
  }
  return li;
}

// create delete buttons for deleting lists or list items
export function createDeleteButton(className) {
  const dBtn = document.createElement("button");
  dBtn.appendChild(document.createTextNode("X"));
  dBtn.classList.add(className);
  dBtn.setAttribute("alt", "Delete");
  return dBtn;
}

// add new list
function eventHandlerAdd(event) {
  event = event || window.event;
  if (event.target.classList.contains("addList")) {
    if (newItem.value.length < 1) return;
    const alreadyExists = listNames.find(list => {
      return newItem.value.toLowerCase() === list.name.toLowerCase();
    });
    if (alreadyExists) {
      alert("List with the same name already exists!");
      newItem.value = "";
      return;
    }

    // id for the list
    let counter = localStorage.getItem("counter");
    if (counter === null) {
      counter = "1";
    }

    // save listObject
    const listObject = {
      name: newItem.value,
      id: counter,
      items: [],
      friends: []
    };
    listNames.push(listObject);
    localStorage.setItem("home", JSON.stringify(listNames));

    // list element (not needed if a new list view is opened)
    const li = document.createElement("li");
    li.classList.add("home");
    const a = document.createElement("a");
    a.setAttribute("href", "/#/p/:" + counter);
    const aText = document.createTextNode(newItem.value);
    a.appendChild(aText);
    li.appendChild(a);
    const button = document.createElement("button");
    button.classList.add("dBtnHome");
    button.setAttribute("alt", "Delete");
    const dBtnText = document.createTextNode("X");
    button.appendChild(dBtnText);
    li.appendChild(button);
    const div = document.createElement("div");
    div.appendChild(li);
    list.innerHTML = div.innerHTML + list.innerHTML;

    // update and save id counter
    counter++;
    localStorage.setItem("counter", counter);

    // empty the input field
    newItem.value = "";

    // open list view
    window.location.replace("/#/p/" + listObject.id);
  }
}

// delete list
function eventHandlerDelete(event) {
  event = event || window.event;
  if (event.target.classList.contains("dBtnHome")) {
    const confirmUser = confirm("Do you want to delete the list?");
    if (confirmUser) {
      event.target.parentElement.classList.add("delete");
      const a = event.target.parentElement.querySelector("a");
      const str = a.textContent;
      listNames = removeObject(listNames, str);
      localStorage.setItem("home", JSON.stringify(listNames)); // updated listnames
    }
  }
}

// open list view
function eventHandlerOpenList(event) {
  event = event || window.event;
  if (event.target.classList.contains("homeli")) {
    window.location.replace(
      event.target.querySelector("a").getAttribute("href")
    );
  }
}

// remove object from a list
export function removeObject(list, str) {
  let index = null;
  index = list.findIndex(item => item.name === str);
  list.splice(index, 1);
  return list;
}

function createView(ol) {
  const div = document.createElement("div");
  const section = document.createElement("section");
  section.classList.add("home");
  const h1 = document.createElement("h1");
  h1.setAttribute("tabindex", "0");
  const textH1 = document.createTextNode("Shopping lists");
  h1.appendChild(textH1);
  const form = document.createElement("form");
  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("id", "newItem");
  input.setAttribute("maxlength", "27");
  input.setAttribute("placeholder", "Add new list...");
  input.setAttribute("alt", "Add new list");
  form.appendChild(input);
  const button = document.createElement("button");
  button.classList.add("addList");
  const textButton = document.createTextNode("Add");
  button.appendChild(textButton);
  form.appendChild(button);
  section.appendChild(form);
  section.appendChild(ol);
  div.appendChild(section);
  return div;
}

const Home = {
  render: async () => {
    // get lists (latest on top)
    const ol = document.createElement("ol");
    ol.setAttribute("id", "list");
    if (updatedLists.length > 0) {
      listNames = updatedLists;
    } else {
      const retrievedData = localStorage.getItem("home");
      if (retrievedData !== null) {
        listNames = JSON.parse(retrievedData);
      }
    }
    listNames
      .slice()
      .reverse()
      .map(list => {
        ol.appendChild(createListItem(list));
      });
    const view = createView(ol).innerHTML;
    return view;
  },
  after_render: async () => {
    // eventListeners
    // add list
    document.addEventListener("click", eventHandlerAdd, false);
    // open list view
    document.addEventListener("click", eventHandlerOpenList, false);
    // delete list
    document.addEventListener("click", eventHandlerDelete, false);
  }
};

export default Home;
