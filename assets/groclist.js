// JavaScript for groclist.html specific elements
// VARIABLES
const grocList = $('#groc-list');
const listItem = $('.list-item');
let inputField = $('.input-field');
let textInputEl = inputField.children('type:text');
let grocItems = JSON.parse(localStorage.getItem("grocItems")) || [];
console.log(grocItems);
// WHEN THE PAGE LOADS
updateWithStoredItems();
function updateWithStoredItems() {
  if (grocItems.length > 0) {
    grocList.empty()
    grocItems.forEach(function(item) {
      addListItem(item);
    });
  }
}
// BUTTON FUNCTIONS
// add a list element
function addListItem(item) {
  const listItem = 
  $(`<div class="row list-item">
      <div class="input-field">
        <input type="checkbox" ${item.isChecked ? "checked" : ""}/>
        <input placeholder="Grocery Item" type="text" class="validate" value="${item.grocText}">
      </div>
    </div>`);
  $('#groc-list').append(listItem);
}
// save list changes
function saveList() {
  inputField = $(".input-field");
  inputField.each(function () {
    let isChecked = $(this).children("input[type='checkbox']").is(':checked');
    let grocText = $(this).children("input[type='text']").val();
    if (grocText) {
      grocItems.push({
        isChecked: isChecked, grocText: grocText,
      });
    }
  });
  console.log(grocItems)
  localStorage.setItem("grocItems", JSON.stringify(grocItems))
}
// remove checked items (and trigger save)
function clearChecks() {
  inputField = $(".input-field");
  let checkboxes = inputField.children('input:checked');
  checkboxes.each (function () {
    $(this).parent().parent().remove();
  });
}