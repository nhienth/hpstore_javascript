var categoriesApi = "http://localhost:3000/categories";
var customerApi = "http://localhost:3000/customer";
var productApi = "http://localhost:3000/products?_sort=id&_order=desc";
var newsApi = "http://localhost:3000/news";

function numberWithCommas(x) {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
  return x;
}

function start() {
  getData(categoriesApi, "#outerBlock", cateHtml);

  getData(customerApi, "#user-html", userHtml);

  getData(productApi, "#product-html", productHtml);

  getData(newsApi, "#news-html", newsHtml);
}

// start();

function getData(api, selector, html) {
  fetch(api)
    .then((response) => response.json())
    .then((data) => {
      renderData(data, selector, html);
    });
}

function cateHtml(value) {
  return `
  <tr class="cate-item-${value.id}">
    <td>${value.id}</td>
    <td>${value.name}</td>
    <td>
        <button onclick=handleEdit("http://localhost:3000/categories",${
          value.id
        },${`editFormCate`}) class="a-edit"><i class="fas fa-edit"></i></button>
    </td> 
    <td>
        <button onclick=handleDelete("http://localhost:3000/categories",${
          value.id
        }) class="a-delete"><i class="fas fa-trash-alt"></i></button>
    </td>
  </tr>
  `;
}

function userHtml(value) {
  if (value.role == 1) {
    var roles = "Nhân viên";
  } else {
    var roles = "Khách hàng";
  }
  return `
    <tr>
        <td>${value.id}</td>
        <td>${value.user_name}</td>
        <td>${value.full_name}</td>
        <td>
            <img src="../../content/images/user/${value.avatar}" alt="" />
        </td>
        <td>${value.phone}</td>
        <td>${value.email}</td>
        <td>${value.address}</td>
        <td>${roles}</td>
        <td>
        <button onclick=handleEdit("http://localhost:3000/customer",${
          value.id
        },${`editFormUser`}) class="a-edit"><i class="fas fa-edit"></i></button>
        </td>
        <td>
        <button onclick=handleDelete("http://localhost:3000/customer",${
          value.id
        }) class="a-delete"
            ><i class="fas fa-trash-alt"></i
        ></button>
        </td>
    </tr>
    `;
}

function nameCate() {
  fetch(productApi)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((pro) => {
        var resultBlock = document.querySelector("#cate-name-" + pro.id);

        fetch(categoriesApi)
          .then((response) => response.json())
          .then((data) => {
            data.forEach((cate) => {
              if (cate.id === pro.cate_id) {
                resultBlock.innerHTML = cate.name;
              }
            });
          });
      });
    });
}

function productHtml(value) {
  nameCate();
  return `
    <tr>
    <td>${value.id}</td>
    <td><span>${value.name}<span></td>
    <td>
      <img
        src="../../content/images/product/${value.image}"
      />
    </td>
    <td id="cate-name-${value.id}">Giày bóng chuyền</td>
    <td>${value.price}đ</td>
    <td>${value.sale_off}%</td>
    <td>${value.date_add}</td>
    <td><span>${value.description}</span></td>
    <td>
      <button onclick=handleEditPro("http://localhost:3000/products",${
        value.id
      },${
    value.cate_id
  },${`editFormProduct`}) class="a-edit"><i class="fas fa-edit"></i></button>
    </td>
    <td>
      <button onclick=handleDelete("http://localhost:3000/products",${
        value.id
      }) class="a-delete"
        ><i class="fas fa-trash-alt"></i
      ></button>
    </td>
    </tr>

    `;
}

function newsHtml(value) {
  return `
  <tr>
    <td>${value.id}</td>
    <td>${value.title}</td>
    <td><span>${value.summary}</span></td>
    <td>
      <span>${value.content}</span>
    </td>
    <td>
      <img src="../../content/images/product/${value.image}"/>
    </td>
    <td>${value.date_post}</td>
    <td>
      <button class="a-edit"><i class="fas fa-edit"></i></button>
    </td>
    <td>
      <button onclick=onclick=handleDelete("http://localhost:3000/news",${value.id}) class="a-delete"><i class="fas fa-trash-alt"></i></button>
    </td>
  </tr>
  `;
}

function renderData(data, selector, callback) {
  var renderBlock = document.querySelector(selector);
  var htmls = data.map((value) => {
    return callback(value);
  });

  renderBlock.outerHTML = htmls.join("");
}

function handleDelete(api, id) {
  var options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(api + "/" + id, options)
    .then((response) => response.json())
    .then(() => {
      location.reload();
    });
}

function editFormCate(data) {
  return `
  <div class="function-title">Cập nhật danh mục</div>
  <div class="function-table">
  <div class="form-funtcion">
    <form action="" method="post" class="form-add--product">
        <label for="">Mã danh mục</label>
        <input type="text" disabled value="${data.id}" >
        <label for="">Tên danh mục</label>
        <input type="text" name="tenloai" value="${data.name}"><br>

        <button onclick=updateBtnClick("http://localhost:3000/categories",${data.id},".form-add--product") type=submit name="update">Cập nhật</button>
        <button><a href="./list.html">DANH SÁCH<a></button>
        
    </form>
  </div>
  </div>
  `;
}

function editFormUser(data) {
  var rolesHtml = "";
  if (data.role === 0) {
    rolesHtml = `
    <label for="kh" class="role-label">Khách hàng</label>
    <input type="radio" value="0" name="vaitro" id="kh" class="role-input" checked>
    <label for="nv" class="role-label">Nhân viên</label>
    <input type="radio" value="1" name="vaitro" id="nv" class="role-input">
    `;
  } else {
    rolesHtml = `
    <label for="kh" class="role-label">Khách hàng</label>
    <input type="radio" value="0" name="vaitro" id="kh" class="role-input">
    <label for="nv" class="role-label">Nhân viên</label>
    <input type="radio" value="1" name="vaitro" id="nv" class="role-input" checked>
    `;
  }
  return `
  <div class="function-title">Cập nhật tài khoản</div>
              
  <div class="form-funtcion">
      <form action="" method="post" class="form-add--product" enctype="multipart/form-data">
          <input type="hidden" name="ma_khachhang" value="${data.id}">
          <label for="tendn">Tên đăng nhập</label>
          <input type="text" name="user" id="tendn" value="${data.user_name}">
          <label for="pass">Mật khẩu</label>
          <input type="password" name="pass" id="pass" value="${data.password}">
          <label for="name">Họ tên</label>
          <input type="text" name="name" id="name" value="${data.full_name}">
          <label for="hinh">Hình đại diện</label>
          <div class="edit-pro--img">
              <img src="../../content/images/user/${data.avatar}">
          </div>
          <input type="hidden" name="avatar_old" value="${data.avatar}">
          <input type="file" name="avatar_new" id="hinh">
          <label for="email">Email</label>
          <input type="email" name="email" id="email" value="${data.email}">
          <label for="phone">Số điện thoại</label>
          <input type="text" name="phone" id="phone" value="${data.phone}">
          <label for="address">Địa chỉ</label>
          <input type="text" name="address" id="address" value="${data.address}">
          <label for="">Vai trò</label>
          <div class="role-boxed">
              ${rolesHtml}
          </div>
          <button type="submit" onclick=btnUpdateUser("http://localhost:3000/customer",${data.id},".form-add--product") name="btn-update">Cập nhật</button>
          <button type="reset">Nhập lại</button>
          <button> <a href="list.html">Danh sách </a></button>
      </form>
    </div>
  `;
}

function editFormProduct(data) {
  return `
  <div class="function-title">Cập nhật sản phẩm</div>
              
  <div class="form-funtcion">
      <form action="" method="post" class="form-add--product" enctype="multipart/form-data">
          <input type="hidden" name="ma_hanghoa" value="${data.id}">
          <label for="tensp">Tên sản phẩm</label>
          <input type="text" name="tensp" id="tensp" value="${data.name}">
          <label for="danhmuc">Danh mục sản phẩm</label>
          <select name="danhmuc" id="danhmuc">
          </select>
          <label for="hinh">Hình sản phẩm</label>
          <div class="edit-pro--img">
              <img src="../../content/images/product/${data.image}">
          </div>
          <input type="hidden" name="image_old" id="hinh" value="${data.image}">
          <input type="hidden" name="date_add" value="${data.date_add}">
          <input type="file" name="image_new" id="hinh">
          <label for="dongia">Giá sản phẩm</label>
          <input type="text" name="dongia" id="dongia" value="${data.price}">
          <label for="giamgia">Giảm giá ( tính theo % )</label>
          <input type="text" name="giamgia" id="giamgia" value="${data.sale_off}">
          <label for="mota">Mô tả</label>
          <textarea name="mota" id="mota" cols="30" rows="8">${data.description}</textarea>
    
          <button type="submit" onclick=btnUpdatePro("http://localhost:3000/products",${data.id},".form-add--product") name="btn-update">Cập nhật</button>
          <button type="reset">Nhập lại</button>
          <button> <a href="./list.html"> Danh sách </a></button>
      </form>
  </div>
  `;
}

function showCate() {
  var selectCate = document.querySelector("#danhmuc");
  fetch(categoriesApi)
    .then((response) => response.json())
    .then((data) => {
      data.map((cate) => {
        selectCate.innerHTML += `
            <option value="${cate.id}" name="cate" id="cate-${cate.id}">${cate.name}</option>
          `;
      });
    });
}

function handleEdit(api, id, editFormCate) {
  renderFormEdit(api, id, editFormCate);
}

function handleEditPro(api, id, cate_id, editFormCate) {
  renderFormEdit(api, id, editFormCate);
  setTimeout(() => {
    showCate();
  }, 1500);

  setTimeout(() => {
    document.querySelector("#cate-" + cate_id).selected = true;
  }, 6000);
}

function renderFormEdit(api, id, editFormHtml) {
  var editContainer = document.querySelector(".layout-function");

  fetch(api + "/" + id)
    .then((response) => response.json())
    .then((data) => {
      editContainer.innerHTML = editFormHtml(data);
    });
}

function updateBtnClick(api, id, selector) {
  document.querySelector(selector).onsubmit = (e) => {
    e.preventDefault();
  };

  var name = document.querySelector('input[name="tenloai"]').value;
  var formData = {
    name: name,
  };

  updateData(api, id, formData, () => {
    // getData(customerApi, "#user-html", userHtml);
  });
}

function btnUpdateUser(api, id, selector) {
  document.querySelector(selector).onsubmit = (e) => {
    e.preventDefault();
  };

  var user_name = document.querySelector('input[name="user"]').value;
  var password = document.querySelector('input[name="pass"]').value;
  var phone = document.querySelector('input[name="phone"]').value;
  var full_name = document.querySelector('input[name="name"]').value;
  var email = document.querySelector('input[name="email"]').value;
  var address = document.querySelector('input[name="address"]').value;
  var image_old = document.querySelector('input[name="avatar_old"]').value;
  var image_new = document.querySelector('input[name="avatar_new"]').value;
  var role = document.querySelector('input[name="vaitro"]:checked').value;

  var avatar = "";

  if (!image_new) {
    avatar = image_old;
  } else {
    avatar = image_new.slice(12);
  }

  var formData = {
    user_name: user_name,
    password: password,
    full_name: full_name,
    avatar: avatar,
    phone: phone,
    email: email,
    address: address,
    role: Number(role),
  };

  updateData(api, id, formData, () => {
    window.location.href = "list.html";
  });
}

function btnUpdatePro(api, id, selector) {
  document.querySelector(selector).onsubmit = (e) => {
    e.preventDefault();
  };

  var name = document.querySelector('input[name="tensp"]').value;
  var cate_id = document.querySelector('select[name="danhmuc"]').value;
  var price = document.querySelector('input[name="dongia"]').value;
  var sale_off = document.querySelector('input[name="giamgia"]').value;
  var date_add = document.querySelector('input[name="date_add"]').value;
  var image_old = document.querySelector('input[name="image_old"]').value;
  var image_new = document.querySelector('input[name="image_new"]').value;
  var description = document.querySelector('textarea[name="mota"]').value;
  console.log(cate_id);
  var image = "";

  if (!image_new) {
    image = image_old;
  } else {
    image = image_new.slice(12);
  }

  var formData = {
    name: name,
    cate_id: Number(cate_id),
    price: Number(price),
    sale_off: Number(sale_off),
    image: image,
    date_add: date_add,
    description: description,
  };

  updateData(api, id, formData, () => {
    window.location.href = "list.html";
  });
}

function updateData(api, id, data, callbackfn) {
  var options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  fetch(api + "/" + id, options)
    .then((response) => response.json())
    .then(callbackfn);
}

//FUNCTION ADD

function createData(api, data, callback) {
  var options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(api, options)
    .then((response) => response.json())
    .then(callback);
}
