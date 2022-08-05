var categoriesApi = "http://localhost:3000/categories";
var customerApi = "http://localhost:3000/customer";
var saveBtn = document.querySelector('button[name="update"]');

function start() {
  getCategories(renderCategories, categoriesApi);
  // handleFormCreate();
}

start();

function getCategories(callback, api) {
  fetch(api)
    .then((response) => response.json())
    .then(callback);
}

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
    createCate(formData);
  };
}

function createCate(data, callback) {
  var options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(categoriesApi, options)
    .then((response) => response.json())
    .then(callback);
}

function renderCategories(data) {
  var renderBlock = document.querySelector("#outerBlock");
  var htmls = data.map((value) => {
    return `
        <tr class="cate-item-${value.id}">
            <td>${value.id}</td>
            <td>${value.name}</td>
            <td>
                <button onclick=handleEdit(${value.id}) class="a-edit"><i class="fas fa-edit"></i></button>
            </td>
            <td>
                <button onclick=handleDelete(${value.id}) class="a-delete"><i class="fas fa-trash-alt"></i></button>
            </td>
        </tr>
      `;
  });

  renderBlock.outerHTML = htmls.join("");
}

function handleDelete(id) {
  var options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(categoriesApi + "/" + id, options)
    .then((response) => response.json())
    .then(() => {
      var cateItem = document.querySeecltor(".cate-item-" + id);
      console.log(cateItem);
      cateItem.remove();
    });
}

function handleEdit(id) {
  renderFormEdit(id);
}

function updateBtnClick(id) {
  document.querySelector(".form-add--product").onsubmit = (e) => {
    e.preventDefault();
  };
  var name = document.querySelector('input[name="tenloai"]').value;
  var formData = {
    name: name,
  };

  updateCate(id, formData, () => {
    getCategories(renderCategories);
  });
}

function updateCate(id, data, callbackfn) {
  var options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  fetch(categoriesApi + "/" + id, options)
    .then((response) => response.json())
    .then(callbackfn);
}

function renderFormEdit(id) {
  var layoutFunction = document.querySelector(".layout-function");
  fetch(categoriesApi + "/" + id)
    .then((response) => response.json())
    .then((cate) => {
      var html = `
      <div class="function-title">Cập nhật danh mục</div>
      <div class="function-table">
      <div class="form-funtcion">
        <form action="" method="post" class="form-add--product">
            <label for="">Mã danh mục</label>
            <input type="text" disabled value="${cate.id}" >
            <label for="">Tên danh mục</label>
            <input type="text" name="tenloai" value="${cate.name}"><br>
 
            <button onclick=updateBtnClick(${cate.id}) type=submit name="update">Cập nhật</button>
            <button><a href="./list.html">DANH SÁCH<a></button>
            
        </form>
      </div>
      </div>
      `;

      layoutFunction.innerHTML = html;
    });
}

function getCategoriesApi() {}
