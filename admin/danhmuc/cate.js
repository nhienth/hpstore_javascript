var createBtn = document.querySelector('button[name="addBtn"]');

handleFormCreate();

function handleFormCreate() {
  formElement = document.querySelector(".form-add--product");
  formElement.onsubmit = function (e) {
    e.preventDefault();
  };
  createBtn.onclick = function () {
    var nameCate = document.querySelector('input[name="nameCate"]').value;
    var formData = {
      name: nameCate,
    };
    createData(categoriesApi, formData);
  };
}
