let listNames = [];

function createListItem(name) {
  let li = document.createElement("li");
  let a = document.createElement("a");
  a.setAttribute("href", "/#/p/" + localStorage.getItem(name));
  a.appendChild(document.createTextNode(name));
  li.appendChild(a);
  li.classList.add("homeli");
  li.appendChild(createDeleteButton("dBtnHome"));

  // list of friends with whom the list is shared with
  let shared = [];
  let friends = localStorage.getItem(name + "friends");
  if (friends !== "null" && friends !== null) {
    friends = JSON.parse(friends);
    friends.map(friend => {
      if (friend.shared) {
        shared.push(friend.name);
      }
    });
  }
  let p = document.createElement("p");
  p.classList.add("listParagraph");
  if (shared.length > 0) {
    p.appendChild(document.createTextNode(shared.join(", ")));
    li.appendChild(p);
  }

  return li;
}

export function createDeleteButton(className) {
  let dBtn = document.createElement("button");
  dBtn.appendChild(document.createTextNode("X"));
  dBtn.classList.add(className);
  return dBtn;
}

function eventHandlerAdd(event) {
  event = event || window.event;
  if (newItem.value.length < 1) return;
  let alreadyExists = listNames.find(name => {
    return newItem.value.toLowerCase() === name.toLowerCase();
  });
  if (alreadyExists) {
    alert("List with the same name already exists!");
    newItem.value = "";
    return;
  }

  listNames.push(newItem.value);

  // id for the list that is used for routing
  let counter = localStorage.getItem("counter");
  console.log(counter);
  if (counter !== null) {
    counter = counter.substring(0, counter.length - 1);
  } else {
    counter = 1;
  }
  localStorage.setItem(newItem.value, counter);

  let listItem =
    "<li class='home'><a href='/#/p/:" +
    counter +
    "'>" +
    newItem.value +
    "</a></li>";
  console.log(counter);
  list.innerHTML = listItem + list.innerHTML;
  counter++;
  localStorage.setItem("counter", counter + "c");

  // save list of all the listnames
  localStorage.setItem("home", JSON.stringify(listNames));

  // empty the input field
  newItem.value = "";

  // open new list
  window.location.replace("/#/p/" + (counter - 1));
}

function eventHandlerDelete(event) {
  event = event || window.event;
  if (event.target.classList.contains("dBtnHome")) {
    let confirmUser = confirm("Do you want to delete the list?");
    if (confirmUser) {
      event.target.parentElement.classList.add("delete");
      let a = event.target.parentElement.querySelector("a");
      let str = a.textContent;
      removeObject(listNames, str, false);
      localStorage.removeItem(str + "friends"); // remove sharing information
      localStorage.removeItem(str + "items"); // remove items added to the list
      localStorage.removeItem(str);
      localStorage.setItem("home", JSON.stringify(listNames)); // updated list of lists
    }
  }
}

function eventHandlerOpenList(event) {
  event = event || window.event;
  if (event.target.classList.contains("homeli")) {
    window.location.replace(
      event.target.querySelector("a").getAttribute("href")
    );
  }
}

export function removeObject(list, str, listItem) {
  let index = null;
  if (listItem) {
    index = list.findIndex(item => item.name === str);
  } else {
    index = list.findIndex(item => item === str);
  }
  list.splice(index, 1);
}

let Home = {
  render: async () => {
    // get lists (latest on top)
    let ol = document.createElement("ol");
    let retrievedData = localStorage.getItem("home");
    if (retrievedData !== null) {
      listNames = JSON.parse(retrievedData);
    }
    listNames
      .slice()
      .reverse()
      .map(name => {
        ol.appendChild(createListItem(name));
      });
    let view =
      `
            <section class="home">
                <h1> Shopping lists </h1>
                <form id="add-to-list">
                      <input type="text" id="newItem" maxlength="27" placeHolder="Add new list..." onClick=this.form.reset()>
                      <button id="addItem" class="button">Add</button>
                </form>
                <ol id="list"> ` +
      ol.innerHTML +
      `
                </ol>    
            </section>
        `;

    return view;
  },
  after_render: async () => {
    // add list
    document
      .getElementById("addItem")
      .addEventListener("click", eventHandlerAdd, false);
    // open list
    document.addEventListener("click", eventHandlerOpenList, false);
    // delete list
    document.addEventListener("click", eventHandlerDelete, false);
  }
};

export default Home;
