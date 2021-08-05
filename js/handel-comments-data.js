async function pullComments() {
  let request = await fetch("data.json");

  if (!request.ok) return console.log('Error: ' + request.status);

  let dataJson = await request.json();
  let comments = dataJson.comments;

  comments = checkLocalStorage(comments);

  for (let comment of comments) {
    addNewComment(comment);
  }
}

function addNewComment(comment) {
  let localStore = [];
  if (localStorage.getItem('comments')) {
    localStore = JSON.parse(localStorage.getItem('comments'));
  }
  localStore.push(comment);
  localStorage.setItem('comments', JSON.stringify(localStore))

  let newComment = `<li class="col">
    <article class="article card text-center rounded-0">
      <h3 class="article__name card-title text-light py-3 px-lg-2 px-1">${comment.name}</h3>
      <span class="article__email card-text py-3 px-lg-5 px-1">${comment.email}</span>
      <p class="article__comment card-text pt-5 px-lg-5 px-1" data-mcs-theme="dark">${comment.comment}</p>
      </article>
    </li>`

  $('#comment-list').append(newComment);
}

function handelForm(form) {
  let id = parseInt(Math.random() * 10 ** 5);
  let formData = new FormData(form);
  formData.append('id', id);

  let keys = formData.keys();
  let comment = {};

  for (let key of keys) {
    comment[key] = formData.get(key);
  }

  return comment;
}

function checkLocalStorage(data) {
  let localStore = JSON.parse(localStorage.getItem('comments'));
  let comments = data;

  if (!localStore) return comments;

  localStore.forEach(el => {
    let isForAdding = true;

    for (let comment of comments) {
      if (comment.id === el.id) isForAdding = false;
    }

    if (isForAdding) comments.push(el);
  });

  return comments;
}
