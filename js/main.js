const pages = [["Week 1: Building a Portfolio", "week1"], ["Week 2: Programming Basics", "week2"]];
let list = document.getElementsByTagName("ol")[0];
pages.forEach(addPageToList);

function addPageToList(item){
    let newItem = document.createElement("li");
    let newItemLink = document.createElement("a");
    newItemLink.href = item[1];
    newItemLink.innerText = item[0];
    newItem.appendChild(newItemLink);
    list.appendChild(newItem);
}