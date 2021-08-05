(function () {
  "use strict"

  let form = document.querySelector('#form');

  $(window).on("load", () =>  $(".content").mCustomScrollbar({
    axis: "x",
    theme: "dark"
}));

  pullComments();

  $('.form__btn').on('click', handelCommentAddition)

  function handelCommentAddition(e) {
    e.preventDefault();

    if (!form.checkValidity()) {
      $(form).addClass('was-validated');
      return;
    };

    let commentData = handelForm(form);

    addNewComment(commentData);
    $(form).removeClass('was-validated');
    $(form).trigger('reset');
  };

})();
