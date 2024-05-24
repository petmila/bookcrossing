let current_page = document.location.pathname;
let menu_items = document.getElementsByClassName('bookmark_menu__bookmark');
for (let i = 0; i < menu_items.length; i++) {
  menu_items[i].classList.remove('active');
}
for (let i = 0; i < menu_items.length; i++) {
  if (current_page.match(menu_items[i].attributes.href.value)) {
    menu_items[i].classList.add('active');
  }
}