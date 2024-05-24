function chooseBook(event) {
  var i, active_book, my_books;
  active_book = event.currentTarget.parentElement.parentElement.parentElement;
  my_books = document.getElementsByClassName('book_information');
  for (i = 0; i < my_books.length; i++) {
    my_books[i].className = my_books[i].className.replace(' active', '');
  }
  active_book.className += ' active';
}

function saveExchange(event) {
  active_book_info = document.getElementsByClassName(
    'book_information active',
  )[0].children[0].nextElementSibling;
  let userId = active_book_info.getElementsByClassName(
    'book_information__button',
  )[0].previousElementSibling.previousElementSibling.value;
  let bookId = active_book_info.getElementsByClassName(
    'book_information__button',
  )[0].previousElementSibling.value;
  const exchangeId = event.currentTarget.previousElementSibling.value;
  let info_dict = {
    bookForOwnerId: bookId,
    ownerId: userId,
    exchangeId: exchangeId,
  };
  fetch('/exchanges/' + exchangeId, {
    method: 'PUT',
    params: info_dict,
  });
}

function cancelExchange(event) {
  const exchangeId = event.currentTarget.previousElementSibling.value;
  fetch('/exchanges/' + exchangeId, {
    method: 'DELETE',
  });
}
