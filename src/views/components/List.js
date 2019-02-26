import Utils from "../../services/Utils.js";
import { createDeleteButton, removeObject } from "./Home.js";

let listTitle = "";
let names = [];
let friendsDefault = [
  { name: "Alice", shared: false },
  { name: "Bob", shared: false },
  { name: "Carol", shared: false },
  { name: "David", shared: false }
];

let friends = [];

function createListElement(object) {
  let li = document.createElement("li");
  li.setAttribute("id", "listItem");

  // is the item marked as bought or not
  if (object.done) {
    li.classList.add("done");
  } else {
    li.classList.add("li");
  }

  li.appendChild(document.createTextNode(object.name));
  li.appendChild(createDeleteButton("dBtn"));
  return li;
}

function eventHandlerAdd(event) {
  event = event || window.event;

  if (newItem.value.length < 1) return;
  let alreadyExists = names.find(name => {
    return newItem.value.toLowerCase() === name.name.toLowerCase();
  });
  if (alreadyExists) {
    alert("Item is already on the list!");
    newItem.value = "";
    return;
  }
  let nameObject = new Object();
  nameObject = {
    name: newItem.value,
    done: false
  };
  names.push(nameObject);
  let listItem =
    "<li id='listItem' class='li'>" +
    newItem.value +
    "<button class='dBtn'>X</button></li>";
  list.innerHTML = listItem + list.innerHTML;
  localStorage.setItem(listTitle + "items", JSON.stringify(names));
  newItem.value = "";
}

function eventHandler(event) {
  event = event || window.event;
  // mark item as bought/not bought
  let str = event.target.textContent;
  if (event.target.classList.contains("li")) {
    names = editObject("done", names, str);
    event.target.classList.replace("li", "done");
  } else if (event.target.classList.contains("done")) {
    names = editObject("li", names, str);
    event.target.classList.replace("done", "li");
  }
  // delete item
  if (event.target.classList.contains("dBtn")) {
    event.target.parentElement.classList.add("delete");
    let str = event.target.parentElement.textContent;
    str = str.substring(0, str.length - 1);
    removeObject(names, str, true);
  }
  localStorage.setItem(listTitle + "items", JSON.stringify(names));
}

function eventHandlerShare(event) {
  event = event || window.event;
  let str = event.target.textContent;
  if (event.target.classList.contains("share")) {
    let confirmUser = confirm(
      "Do you want to share the list with " + str + "?"
    );
    if (confirmUser) {
      event.target.classList.replace("share", "shared");
      friends = editObject("shared", friends, str);
    }
  } else if (event.target.classList.contains("shared")) {
    let confirmUser = confirm(
      "Do you want to unshare the list with " + str + "?"
    );
    if (confirmUser) {
      event.target.classList.replace("shared", "share");
      friends = editObject("share", friends, str);
    }
  }
  localStorage.setItem(listTitle + "friends", JSON.stringify(friends));
}

function editObject(classString, list, str) {
  let object = {};
  // classes for bought or not bought
  switch (classString) {
    case "li": {
      str = str.substring(0, str.length - 1);
      object = {
        name: str,
        done: false
      };
      break;
    }
    case "done": {
      str = str.substring(0, str.length - 1);
      object = {
        name: str,
        done: true
      };
      break;
    }
    // classes for shared or not shared
    case "share": {
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
  const index = list.findIndex(item => item.name === str);
  list[index] = object;
  return list;
}

function isListShared(friendObject) {
  if (friendObject.shared) return "shared";
  return "share";
}

let List = {
  render: async () => {
    // get the list title
    listTitle = "";
    let request = Utils.parseRequestURL();
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      let value = localStorage[key];
      if (value === request.id) {
        listTitle = key;
      }
    }
    if (listTitle === "") {
      window.location.replace("/#/error");
    }

    // add friends and sharing information
    friends = [];
    console.log(listTitle);
    let retrievedDataFriends = localStorage.getItem(listTitle + "friends");
    console.log(retrievedDataFriends);
    if (retrievedDataFriends === "null" || retrievedDataFriends === null) {
      localStorage.setItem(
        listTitle + "friends",
        JSON.stringify(friendsDefault) // default friends to a new list
      );
      friends = friendsDefault;
    } else {
      friends = JSON.parse(retrievedDataFriends);
    }

    // get list items
    let retrievedDataItems = localStorage.getItem(listTitle + "items");
    if (retrievedDataItems !== null) {
      names = JSON.parse(retrievedDataItems);
    }
    let ol = document.createElement("ol");
    names
      .slice()
      .reverse()
      .map(nameObject => {
        ol.appendChild(createListElement(nameObject));
      });

    let view =
      /*html*/ `
    <section class="section">
    <a class="link" href="/#/"><<</a><br>
        <h1>${listTitle} </h1>
    <form id="add-to-list">
        <input type="text" id="newItem" maxlength="27" placeHolder="Add new item...">
        <button id="addItem" class="button">Add</button>
    </form>
    <ol id="list" class="list">
    ` +
      ol.innerHTML +
      `</ol>  
      <p>Share list</p>
      ` +
      friends
        .map(
          friend =>
            "<button id='share' class=" +
            isListShared(friend) +
            ">" +
            friend.name +
            "</button>"
        )
        .join(" ") +
      `
    </section>
    `;
    return view;
  },
  after_render: async () => {
    // adding items
    document
      .getElementById("addItem")
      .addEventListener("click", eventHandlerAdd, false);
    // marking items as bought/not bought or deleting items
    document.addEventListener("click", eventHandler, false);
    // sharing list with friends
    document.addEventListener("click", eventHandlerShare, false);
  }
};

export default List;
