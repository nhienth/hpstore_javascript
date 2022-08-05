var createBtn = document.querySelector('button[name="addBtn"]');

handleFormCreate();

function handleFormCreate() {
  formElement = document.querySelector(".form-add--product");
  formElement.onsubmit = function (e) {
    e.preventDefault();
  };
  createBtn.onclick = function () {
    var title = document.querySelector('input[name="tieude"]').value;
    var content = document.querySelector('textarea[name="noidung"]').value;
    var image_upload = document.querySelector('input[name="file"]').value;
    var summary = document.querySelector('input[name="tomtat"]').value;
    var date = new Date();
    var date_post = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    var image = image_upload.slice(12);
    var formData = {
      title: title,
      content: content,
      image: image,
      summary: summary,
      date_post: date_post,
    };
    createData("http://localhost:3000/news", formData);
  };
}
