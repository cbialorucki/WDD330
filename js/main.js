const pages = [["Week 1: Building a Portfolio", "week1"], ["Week 2: Programming Basics", "week2"], 
["Week 3: Objects, The DOM, and Events", "week3"], ["Week 4: Forms, OOP, and Modular JavaScript", "week4"],
["Week 5: Testing and Debugging", "week5"], ["Week 6: Todo Web App", "week6/todo"],
["Week 7: Further Functions and AJAX", "week7"], ["Week 8: Transforms, Transitions, Canvas, and SVG", "week8"]];

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