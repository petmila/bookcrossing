function openProfile(event, content_id) {
  var i, profile_blocks, buttons;

  profile_blocks = document.getElementsByClassName('profile_block');
  for (i = 0; i < profile_blocks.length; i++) {
    profile_blocks[i].style.display = 'none';
  }

  buttons = document.getElementsByClassName('profile_horisontal_menu__button');
  for (i = 0; i < buttons.length; i++) {
    buttons[i].className = buttons[i].className.replace(' active', '');
  }

  document.getElementById(content_id).style.display = 'block';
  event.currentTarget.className += ' active';
}

function addBookToProfile(event) {
  var add_button_form = event.currentTarget.parentElement;
  const texts = {
    title: 'Название:',
    author: 'Автор:',
    year: 'Год издания:',
    condition: 'Состояние:',
    description: 'Описание:',
  };
  let book_info = createBookInfo(texts, true);
  add_button_form.parentElement.insertBefore(book_info, add_button_form);
  Dropzone.discover();
}

function deleteBook(event) {
  var deleted_book =
    event.currentTarget.parentElement.parentElement.parentElement.parentElement;
  var deleted_book_info = deleted_book.getElementsByClassName(
    'book_information__book_info_line',
  );
  if (localStorage.length != 0) {
    for (let i = 0; i < localStorage.length; i++) {
      let id = localStorage.key(i);
      let info = JSON.parse(localStorage.getItem(id));
      let name_document = deleted_book_info[0].innerText.replaceAll(' ', '');
      let name_local_storage = info['title'].replaceAll(' ', '');
      if (name_document === name_local_storage) {
        localStorage.removeItem(id);
      }
    }
  }
  let bookId = event.currentTarget.parentElement.firstElementChild.value;
  deleted_book.remove();
  fetch('/books/' + bookId, {
    method: 'DELETE',
  });
}

function handleBookInfoInputForm(event) {
  event.preventDefault();
  var i, texts, text_content;
  let input_value = event.currentTarget.querySelector('input').value;
  texts = event.currentTarget.parentElement.getElementsByClassName(
    'book_information__book_info_line',
  );
  let dropzone_image_existance =
    document.getElementsByClassName('dz-image').length;
  for (i = 0; i < texts.length; i++) {
    text_content = texts[i].innerText.split([':']);
    if (text_content[1] === '') {
      texts[i].innerHTML += ' ' + input_value;
      if ((text_content[0] === 'Описание') & (dropzone_image_existance != 0)) {
        saveNewBookInProfile(event.currentTarget.parentElement);
      }
      break;
    } else if (
      (dropzone_image_existance != 0) &
      (text_content[0] === 'Описание')
    ) {
      saveNewBookInProfile(event.currentTarget.parentElement);
      break;
    }
  }
}

function saveNewBookInProfile(book_info) {
  book_info.querySelector('form').remove();
  let div_buttons = document.createElement('div');
  let form_buttons = document.createElement('form');
  let delete_button = document.createElement('input');
  delete_button.className = 'profile_block__button';
  delete_button.value = 'Удалить';
  delete_button.type = 'button';
  delete_button.onclick = deleteBook;
  form_buttons.appendChild(delete_button);
  div_buttons.className = 'book_information__buttons_line';
  div_buttons.appendChild(form_buttons);
  book_info.appendChild(div_buttons);
  let dropzone_image =
    document.getElementsByClassName('dz-image')[0].firstChild.src;
  document.getElementById('new-book-image-dropzone').remove();
  let book_image = document.createElement('img');
  book_image.className = 'book_information__book_image';
  book_image.src = dropzone_image;
  book_info.parentElement.insertBefore(book_image, book_info);

  let info_lines = book_info.getElementsByClassName(
    'book_information__book_info_line',
  );
  let new_book_dict = {
    title: info_lines[0].textContent,
    author: info_lines[1].textContent,
    year: info_lines[2].textContent,
    condition: info_lines[3].textContent,
    description: info_lines[4].textContent,
    image: dropzone_image,
  };
  localStorage.setItem(localStorage.length + 1, JSON.stringify(new_book_dict));
  let post_data_info = {
    title: new_book_dict['title'].split([':'])[1].trim(),
    author: new_book_dict['author'].split([':'])[1].trim(),
    year: new_book_dict['year'].split([':'])[1].trim(),
    condition: new_book_dict['condition'].split([':'])[1].trim(),
    description: new_book_dict['description'].split([':'])[1].trim(),
    userId: '1',
  };

  postRequest('/books/', post_data_info, 'post');
}

function createBookInfoLine(name) {
  let line = document.createElement('p');
  line.className = 'book_information__book_info_line';
  let b_name = document.createElement('b');
  let name_content = name.split([':']);
  b_name.textContent = name_content[0] + ':';
  line.appendChild(b_name);
  line.innerHTML += ' ' + name_content[1];
  return line;
}

function createBookInfo(texts, required_input_flag) {
  let book_div = document.createElement('div');
  book_div.className = 'book_information';
  let book_text = document.createElement('div');
  book_text.className = 'book_information__book_info_text';
  book_text.appendChild(createBookInfoLine(texts['title']));
  book_text.appendChild(createBookInfoLine(texts['author']));
  book_text.appendChild(createBookInfoLine(texts['year']));
  book_text.appendChild(createBookInfoLine(texts['condition']));
  book_text.appendChild(createBookInfoLine(texts['description']));
  if (required_input_flag) {
    let form_input = document.createElement('form');
    form_input.id = 'book_info_input_form';
    let input = document.createElement('input');
    form_input.addEventListener('submit', handleBookInfoInputForm);
    form_input.appendChild(input);
    book_text.appendChild(form_input);

    // dropzone form for image uploading
    let book_image = document.createElement('form');
    book_image.className = 'dropzone dz-clickable';
    book_image.id = 'new-book-image-dropzone';
    book_image.action = '/file-upload';
    let image_div = document.createElement('div');
    image_div.className = 'dz-default dz-message';
    let image_button = document.createElement('button');
    image_button.className = 'dz-button';
    image_button.type = 'button';
    image_button.textContent = 'Выберите картинку для загрузки';
    image_div.appendChild(image_button);
    book_image.appendChild(image_div);
    book_div.appendChild(book_image);
  } else {
    let book_image = document.createElement('img');
    book_image.className = 'book_information__book_image';
    book_image.src = texts['image'];
    book_div.appendChild(book_image);
    let div_buttons = document.createElement('div');
    let form_buttons = document.createElement('form');
    let delete_button = document.createElement('input');
    delete_button.className = 'profile_block__button';
    delete_button.value = 'Удалить';
    delete_button.type = 'button';
    delete_button.onclick = deleteBook;
    form_buttons.appendChild(delete_button);
    div_buttons.className = 'book_information__buttons_line';
    div_buttons.appendChild(form_buttons);
    book_text.appendChild(div_buttons);
  }

  book_div.appendChild(book_text);
  return book_div;
}

function postRequest(path, params, method) {
  const hidden_form = document.createElement('form');
  hidden_form.method = method || 'post';
  hidden_form.action = path;
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const hidden_input = document.createElement('input');
      hidden_input.type = 'hidden';
      hidden_input.name = key;
      if (key !== 'image') {
        hidden_input.value = params[key].trim();
      } else {
        hidden_input.value = params[key];
      }
      hidden_form.appendChild(hidden_input);
    }
  }
  document.body.appendChild(hidden_form);
  hidden_form.submit();
  localStorage.clear();
}

(function loadProfileFromLocalStorage() {
  let add_button_form = document.getElementById(
    'book_to_profile_add_button',
  ).parentElement;
  if (localStorage.length != 0) {
    for (let i = 0; i < localStorage.length; i++) {
      let id = localStorage.key(i);
      let info = JSON.parse(localStorage.getItem(id));
      let book = createBookInfo(info, false);
      add_button_form.parentElement.insertBefore(book, add_button_form);
    }
  }
})();

document.getElementById('my_books').style.display = 'block';
