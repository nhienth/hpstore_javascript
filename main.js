var caregoriesApi = "http://localhost:3000/categories?_sort=id&_order=desc";
var productApi = "http://localhost:3000/products";

// FORMAT NUMBER
function numberWithCommas(x) {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
  return x;
}

function loadListCate() {
  var cateElement = document.querySelector("#cate-list");

  fetch(caregoriesApi)
    .then((response) => response.json())
    .then((data) => {
      var htmls = "";
      data.forEach((cate) => {
        htmls += `
        <li>
        <a href="related.html?id=${cate.id}"
          >${cate.name}<span></span><span></span><span></span
          ><span></span
        ></a>
      </li>
            `;
      });
      htmls += `
      <li>
        <a href="#"
            >Blog bóng chuyền <span></span><span></span><span></span
            ><span></span
        ></a>
        </li>
        <li>
        <a href="#"
            >Tin tức - sự kiện <span></span><span></span><span></span
            ><span></span
        ></a>
        </li>
        <li>
        <a href="#"
            >Đánh giá sản phẩm <span></span><span></span><span></span
            ><span></span
        ></a>
        </li>
        <li>
        <a href="#"
            >Flash Sale 2020 <span> </span><span></span><span></span
            ><span></span
        ></a>
    </li>`;
      cateElement.innerHTML = htmls;
    });
}

//Load 6 sp mới nhất

function loadNewPro() {
  var proBlock = document.querySelector("#pro-new-6");

  fetch("http://localhost:3000/products?_sort=id&_order=desc&_limit=6")
    .then((response) => response.json())
    .then((data) => {
      var htmls = "";
      data.forEach((pro) => {
        htmls += `
            <div class="product">
                <div class="product-option"><a href="details.html?id=${
                  pro.id
                }" style="color:white">Chi tiết</a></div>
                <div class="product-image">
                <a href="details.html?id=${pro.id}"><img src="./uploads/${
          pro.image
        }" /></a>
                </div>
                <div class="product-name"><span>${pro.name}<span></div>
                <div class="product-price">${numberWithCommas(pro.price)}đ</div>
            </div>
            `;
      });
      proBlock.innerHTML = htmls;
    });
}

function loadNewProCate(cate_id, selector) {
  var proBlock = document.querySelector(selector);

  fetch(
    `http://localhost:3000/products?_sort=id&_order=desc&_limit=6&cate_id=${cate_id}`
  )
    .then((response) => response.json())
    .then((data) => {
      var htmls = "";
      data.forEach((pro) => {
        htmls += `
            <div class="product">
                <div class="product-option"><a href="" style="color:white">Chi tiết</a></div>
                <div class="product-image">
                <a href="details.html?id=${pro.id}"><img src="./uploads/${
          pro.image
        }" /></a>
                </div>
                <div class="product-name"><span>${pro.name}<span></div>
                <div class="product-price">${numberWithCommas(pro.price)}đ</div>
            </div>
            `;
      });
      proBlock.innerHTML = htmls;
    });
}

// Load related product

function loadRelatedProduct() {
  const urlParams = new URLSearchParams(window.location.search);
  id = urlParams.get("id");

  fetch("http://localhost:3000/products?_sort=id&_order=desc&cate_id=" + id)
    .then((response) => response.json())
    .then((data) => {
      var htmls = "";
      data.forEach((pro) => {
        htmls += `
            <div class="product-box">
                <div class="item-option">
                    <a style="color: white" href="details.html?id=${
                      pro.id
                    }">Chi tiết</a>
                </div>
                <div class="item-image">
                    <a href="details.html?id=${
                      pro.id
                    }"> <img style="object-fit:cover" src="./uploads/${
          pro.image
        }" /></a>
                </div>
                <div class="item-name"><a href="details.html?id=${pro.id}">${
          pro.name
        }</a></div>
            
                <div class="item-price">
                    <span class="price-off">${numberWithCommas(
                      pro.price
                    )}đ</span>
                </div>
            </div>
            `;
      });

      document.querySelector("#related").innerHTML = htmls;
    });
}

// DETAILS PRODUCT

function loadDetailsProduct() {
  const urlParams = new URLSearchParams(window.location.search);
  id = urlParams.get("id");

  fetch("http://localhost:3000/products/" + id)
    .then((response) => response.json())
    .then((data) => {
      loadNameCateTop(data.cate_id, "#nameCate-top");
      document.querySelector("#namePro-top").innerHTML = data.name;
      document.querySelector("#dpro-name").innerHTML =
        data.name + `<a href="#cmt">Viết đánh giá</a>`;
      document.querySelector("#dpro-img").src = `./uploads/${data.image}`;
      document.querySelector("#dpro-price").innerHTML = `${numberWithCommas(
        data.price
      )}đ`;
      document.querySelector("#dpro-des").innerHTML = data.description;
      // document.querySelector("#add-cart").addEventListener("click", addCart());
      document.querySelector("#add-cart").onclick = function () {
        addCart(data.id);
      };
    });
}

function loadNameCateTop(cate_id, selector) {
  fetch("http://localhost:3000/categories/" + cate_id)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector(selector).innerHTML = data.name;
      document.querySelector(selector).href = `related.html?id=${data.id}`;
    });
}

function loadSuggPro(cate_id) {
  const urlParams = new URLSearchParams(window.location.search);
  id = urlParams.get("id");

  fetch("http://localhost:3000/products?cate_id=" + cate_id)
    .then((response) => response.json())
    .then((data) => {
      var htmls = `<div class="details-suggestions--title">Sản phẩm gợi ý</div>`;
      data.forEach((pro) => {
        if (pro.sale_off > 0) {
          var pro_off = pro.price - pro.price * pro.sale_off * 0.01;
          htmls += `
          <div class="details-suggestions--product">
            <div class="suggestions--product--img">
              <a href="details.html?id=${pro.id}"><img src="./uploads/${
            pro.image
          }" /></a>
            </div>
            <div class="suggestions--product--info">
              <div class="suggestions--name">${pro.name}</div>
              <div class="suggestions--name--price">
                <span class="suggestions--price--off">${numberWithCommas(
                  pro_off
                )} đ</span>
                <span class="suggestions--price--sale">${numberWithCommas(
                  pro.price
                )}đ</span>
              </div>
            </div>
          </div>
          `;
        }
      });

      document.querySelector("#suggPro-list").innerHTML = htmls;
    });
}

//SEARCH PRODUCTS

function searchProduct() {
  var searchBtn = document.querySelector('button[name="search-btn"]');

  searchBtn.onclick = function () {
    var keywords = document.querySelector('input[name="keywords"]').value;

    if (keywords !== "") {
      window.location.href = `related.html?keywords=${keywords}`;
    }
  };
}

function loadSearchProduct() {
  const urlParams = new URLSearchParams(window.location.search);
  keywords = urlParams.get("keywords");

  if (keywords !== null) {
    var urlSearch = "http://localhost:3000/products?name_like=" + keywords;

    fetch(urlSearch)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.length == 0) {
          alert("Không tìm được sản phẩm phù hợp");
        }
        var htmls = "";
        data.forEach((pro) => {
          htmls += `
            <div class="product-box">
                <div class="item-option">
                    <a style="color: white" href="details.html?id=${
                      pro.id
                    }">Chi tiết</a>
                </div>
                <div class="item-image">
                    <a href="details.html?id=${pro.id}"> <img src="./uploads/${
            pro.image
          }" /></a>
                </div>
                <div class="item-name"><a href="details.html?id=${pro.id}">${
            pro.name
          }</a></div>
            
                <div class="item-price">
                    <span class="price-off">${numberWithCommas(
                      pro.price
                    )}đ</span>
                </div>
            </div>
            `;
        });

        document.querySelector("#related").innerHTML = htmls;
      });
  }
}

function loadNews() {
  fetch("http://localhost:3000/news?&_limit=4")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      var htmls = "";
      data.forEach((news) => {
        htmls += `
        <div class="news-content">
          <div class="news-title">
          ${news.title}
          </div>
          <div class="news-image">
            <img src="./content/images/news/${news.image}">
          </div>
          <div class="news-description">
            ${news.summary}
          </div>
        </div>`;
      });
      document.querySelector("#news-block").innerHTML = htmls;
    });
}

//SHOPPING CART---------------------------------------------------------

// -------------ADD CART--------------
async function addCart(id_product) {
  // Lay du lieu cart
  var cart = localStorage.getItem("cart");
  if (cart == null) {
    cart = [];
  } else {
    // chuyen cart ve file json
    cart = JSON.parse(cart);
  }

  //Check id da ton tai trong local storage
  var existed = cart.map((pro) => pro.id).indexOf(id_product);

  if (existed == -1) {
    var product = await fetch(`${productApi}/${id_product}`).then((response) =>
      response.json()
    );

    var quantity = document.querySelector('input[name="quantity"]');

    product.quantity = Number(quantity.value);
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
  } else {
    quantity = quantity ? quantity.value : 1;
    cart[existed].quantity += Number(quantity);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  window.location.href = "cart.html";
}

function showCart() {
  var cart = localStorage.getItem("cart");

  var total = 0;
  var totalNumber = 0;
  var strContent = "";
  var strTotal = "";

  if (cart == null) {
    cart = [];
  } else {
    cart = JSON.parse(cart);
  }

  cart.forEach((pro) => {
    total += pro.price * pro.quantity;
    pro.quantity = Number(pro.quantity);
    totalNumber += pro.quantity;
    strContent += `
    <div class="list-cart">
          <div class="list-cart--img">
            <a href="details.html?id=${pro.id}">
              <img src="./content/images/product/${pro.image}"/></a>
          </div>
          <div class="list-cart--name">
            <a href="details.html?id=${pro.id}">${pro.name} - size</a>
            <button onclick=deleteCart(${
              pro.id
            }) class="list-cart--delete">Xóa</button>
          </div>
          <div class="list-cart--price">${numberWithCommas(pro.price)}đ</div>
          <div class="list-cart--quantity">
            <div class="quantity buttons_added" style="margin-top: 0px">
              <input type="button" value="-" class="minus minus2" /><input
                type="number"
                step="1"
                min="1"
                max=""
                name="quantity"
                id="quantity-${pro.id}"
                onchange=updateCart(${pro.id})
                value="${pro.quantity}"
                title="Qty"
                class="input-text qty text input-text2"
                size="4"
                pattern=""
                inputmode=""
              /><input type="button" value="+" class="plus plus2" />
            </div>
          </div>
    </div>
    `;
  });

  strTotal += `
  <div class="list-cart--money">
    <div class="money--tmp tmp-first">
      <div class="money-txt">Tạm tính :</div>
      <div class="money-number">${numberWithCommas(total)}đ</div>
    </div>
    <div class="money--tmp">
      <div class="money-txt transform-y">Thành tiền :</div>
      <div class="money-number--into">${numberWithCommas(total)}đ</div>
    </div>
    <div class="money-button margin-top">
      <button class="btn-pay">
        <a href="checkout.html" class="white">Thanh toán ngay</a>
      </button>

      <a href="index.html" class="btn-ctn">Tiếp tục mua hàng</a>
    </div>
  </div>
  `;

  if (cart.length == 0) {
    var strContent = `
    <div class="container">
     
        <div class="cart-img">
          <img src="./content/images/home/empty-bags.jpg" alt="" />
        </div>
        <div class="btn-continue">
          <a href="index.html">Tiếp tục mua sắm</a>
        </div>
    
    </div>
    `;
    strTotal = "";
  }

  document.querySelector("#cart-products").innerHTML = strContent + strTotal;
  document.querySelector(
    "#total-number"
  ).innerHTML = `(${totalNumber} sản phẩm)`;
}

// UPDATE CART
function updateCart(id) {
  var number = document.querySelector("#quantity-" + id).value;
  let cart = localStorage.getItem("cart");
  if (cart == null) {
    cart = [];
  } else {
    // Chuyển cart về file Json
    cart = JSON.parse(cart);
  }

  let existed = cart.map((pro) => pro.id).indexOf(id);
  cart[existed].quantity = Number(number);
  localStorage.setItem("cart", JSON.stringify(cart));

  showCart();
  showToTalCart();
}

// DELETE CART
function deleteCart(id) {
  var cart = localStorage.getItem("cart");
  if (cart == null) {
    cart = [];
  } else {
    // Chuyển cart về file Json
    cart = JSON.parse(cart);
  }

  var existed = cart.map((pro) => pro.id).indexOf(id);
  cart = cart.filter((item) => item !== cart[existed]);
  localStorage.setItem("cart", JSON.stringify(cart));
  showCart();
}

//SHOW TOTAL CART
function showToTalCart() {
  var cart = localStorage.getItem("cart");
  if (cart == null) {
    cart = [];
  } else {
    // Chuyển cart về file Json
    cart = JSON.parse(cart);
  }
  var totalNumber = 0;
  cart.forEach((data) => {
    data.quantity = Number(data.quantity);
    totalNumber += data.quantity;
  });

  document.querySelector(".cart-count").innerHTML = totalNumber;
}

// CHECKOUT

function showCheckOut() {
  var cart = localStorage.getItem("cart");

  var total = 0;
  var totalPro = 0;
  var strContent = "";

  if (cart == null) {
    cart = [];
  } else {
    cart = JSON.parse(cart);
  }

  cart.forEach((pro) => {
    totalPro += pro.quantity;
    total += pro.price * pro.quantity;
    strContent += `
    <div class="product-order">
      <div class="order-img">
        <div class="order-count">${pro.quantity}</div>
        <img src="./uploads/${pro.image}" />
      </div>
      <div class="order-name">
      ${pro.name}
        <br />
        <span class="order-size">size</span>
      </div>
      <div class="order-price">${numberWithCommas(pro.price)}đ</div>
    </div>
    <input type="hidden" id="tmp-in" value="" />
    `;
  });

  document.querySelector("#list-proC").innerHTML = strContent;
  document.querySelector("#count-proC").innerHTML = totalPro;
  document.querySelector("#tmp-in").value = total;
  document.querySelector("#tpm-priceC").innerHTML = `${numberWithCommas(
    total
  )}đ`;

  var user = localStorage.getItem("user");
  if (user == null) {
    user = [];
  } else {
    user = JSON.parse(user);
  }

  var htmlUser = `
  <input type="hidden" id="userId" value="${user.id}" />
  <div class="form-field">
    <input type="text" id="name" placeholder=" " value="${user.full_name}" />
    <label for="name">Họ và tên</label>
  </div>
  <div class="form-field">
    <input type="text" id="phone" placeholder=" " value="${user.phone}" />
    <label for="phone">Số điện thoại</label>
  </div>
  <div class="form-field">
    <input type="email" id="email" placeholder=" " value="${user.email}" />
    <label for="email">Email</label>
  </div>
  <div class="form-field">
    <input type="text" id="address" placeholder=" " value="${user.address}" />
    <label for="address">Địa chỉ</label>
  </div>
  <div class="form-field">
    <textarea id="note" rows="2" placeholder=" "></textarea>
    <label for="note">Ghi chú</label>
  </div>
  `;

  document.querySelector("#userC-info").innerHTML = htmlUser;
}

// ----------------------------------------------------------

function handleOrder() {
  var cart = localStorage.getItem("cart");
  if (cart == null) {
    cart = [];
  } else {
    cart = JSON.parse(cart);
  }
  // add infomation
  var customer_id = document.querySelector("#userId").value;
  var customer_name = document.querySelector("#name").value;
  var customer_phone = document.querySelector("#phone").value;
  var customer_address = document.querySelector("#address").value;
  var customer_email = document.querySelector("#email").value;
  var transport = document.querySelector(
    "input[name='transport']:checked"
  ).value;
  var payment = document.querySelector("input[name='payment']:checked").value;
  var total_money = document.querySelector("#tmp-in").value;
  var note = document.querySelector("#note").value;
  var date = new Date();

  var created_date = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  var data = {
    customerId: Number(customer_id),
    customer_name: customer_name,
    customer_phone: customer_phone,
    customer_address: customer_address,
    customer_email: customer_email,
    created_date: created_date,
    transport: Number(transport),
    payment: Number(payment),
    total_money: Number(total_money),
    note: note,
    status: 0,
    oder_detail: cart,
  };

  fetch("http://localhost:3000/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then(() => {
      localStorage.removeItem("cart");
      window.location.href = "accMana.html";
      alert("Đặt hàng thành công");
    });
}

// LOGIN

function login() {
  var user = localStorage.getItem("user");

  if (user == null) {
    user = [];
  } else {
    user = JSON.parse(user);
  }

  var user_name = document.querySelector("#user").value;
  var password = document.querySelector("#pass").value;

  fetch("http://localhost:3000/customer")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((account) => {
        if (user_name == account.user_name && password == account.password) {
          fetch("http://localhost:3000/customer/" + account.id)
            .then((response) => response.json())
            .then((data) => {
              localStorage.setItem("user", JSON.stringify(data));
            });
          window.location.href = "index.html";
        }
        document.querySelector(
          "#noti-login"
        ).innerHTML = `<i class="fas fa-bell"></i>Thông tin đăng nhập không chính xác`;
      });
    });
}

function logOut() {
  localStorage.removeItem("user");
  window.location.href = "index.html";
}

function checkLogin() {
  var user = localStorage.getItem("user");
  var htmls = "";
  if (user == null) {
    htmls = `
    <div class="account-hover">
      <ul>
        <li><a href="login.html">Đăng nhập</a></li>
        <li><a href="register.html">Đăng ký</a></li>
        <li>
          <a href="forget_pass.html">Quên mật khẩu</a>
        </li>
      </ul>
    </div>

    <div class="account-icon"><i class="fas fa-user"></i></div>
      <div class="account-content">
        <h4 class="account-title">Tài khoản</h4>
        <p class="account-hello">Xin chào</p>
    </div>
    `;
  } else {
    user = JSON.parse(user);

    if (user.role == 1) {
      htmls = `
      <div class="account-hover">
        <ul>
          <li><a href="accMana.html">Quản lý tài khoản</a></li>
          <li><a href="">Đổi mật khẩu</a></li>
          <li>
            <a onclick="logOut()">Đăng xuất</a>
          </li>
          <li><a href="./admin/index.html">Quản trị website</a></li>
        </ul>
      </div>

      <div class="account-icon"><i class="fas fa-user"></i></div>
        <div class="account-content">
          <h4 class="account-title">${user.user_name}</h4>
          <p class="account-hello">Xin chào</p>
      </div>
      `;
    } else {
      htmls = `
      <div class="account-hover">
        <ul>
          <li><a href="accMana.html">Quản lý tài khoản</a></li>
          <li><a href="">Đổi mật khẩu</a></li>
          <li>
            <a onclick="logOut()">Đăng xuất</a>
          </li>
        </ul>
      </div>

      <div class="account-icon"><i class="fas fa-user"></i></div>
        <div class="account-content">
          <h4 class="account-title">${user.user_name}</h4>
          <p class="account-hello">Xin chào</p>
      </div>
      `;
    }
  }
  document.querySelector(".header-top-account").innerHTML = htmls;
}

// COMMENT

function loadCommentForm() {
  user = localStorage.getItem("user");
  const urlParams = new URLSearchParams(window.location.search);
  id = Number(urlParams.get("id"));

  var htmls = "";
  if (user == null) {
    htmls = `
    <div class="login-to--comment">
      <a href="login.html"><i class="fas fa-sign-in-alt"></i> Đăng nhập</a>
      để bình luận về sản phẩm này.
    </div>
    `;
    document.querySelector(".comment-boxed-add").innerHTML = htmls;
  } else {
    user = JSON.parse(user);
    htmls = `
    <div class="form-add--comment">
      <input type="hidden" id="productId" value="${id}" />
      <input type="hidden" id="userId" value="${user.id}" />
      <input type="hidden" id="userName" value="${user.user_name}" />
      <input type="hidden" id="userFullName" value="${user.full_name}" />
      <input type="hidden" id="user_avatar" value="${user.avatar}" />
      
      <div class="add-comment--img">
        <img src="./content/images/user/${user.avatar}" />
      </div>
      <div class="add-comment--submit">
        <input
          type="text"
          id="cmt-content"
          placeholder="Thêm bình luận..."
        />
        <div class="boxed-hidden">
          <button onclick="addComment()" name="btn-send">
            Gửi bình luận
          </button>
        </div>
      </div>
    </div>
    `;
    document.querySelector(".comment-boxed-add").innerHTML = htmls;
  }
}

function addComment() {
  var content = document.querySelector("#cmt-content").value;
  var productId = document.querySelector("#productId").value;
  var userId = document.querySelector("#userId").value;
  var userName = document.querySelector("#userName").value;
  var userFullName = document.querySelector("#userFullName").value;
  var user_avatar = document.querySelector("#user_avatar").value;
  var date = new Date();

  var day_comment = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  var formData = {
    content: content,
    productId: Number(productId),
    userId: Number(userId),
    userName: userName,
    userFullName: userFullName,
    user_avatar: user_avatar,
    day_comment: day_comment,
  };

  var options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  };
  fetch("http://localhost:3000/comment", options)
    .then((response) => response.json())
    .then(() => {
      console.log("add succsess");
    });
}

function loadComment() {
  const urlParams = new URLSearchParams(window.location.search);
  id = Number(urlParams.get("id"));

  fetch(`http://localhost:3000/products/${id}/comment`)
    .then((response) => response.json())
    .then((data) => {
      var htmls = "";
      data.forEach((comment) => {
        htmls += `
        <div class="comment-content">
          <div class="conment-img">
            <img src="./content/images/user/${comment.user_avatar}" />
          </div>
          <div class="conment-txt">
            <div class="comment-user">${comment.userFullName}</div>
            <div class="comment-text">${comment.content}</div>
          </div>
          <div class="comment-day">${comment.day_comment}</div>
        </div>
        `;
      });
      htmls += `<div class="comment-boxed-add"></div>`;
      document.querySelector(
        ".comment-count"
      ).innerHTML = `${data.length} bình luận`;
      document.querySelector(".comment-layout").innerHTML = htmls;
      loadCommentForm();
    });
}

function showInfoCus() {
  var user = localStorage.getItem("user");
  user = JSON.parse(user);
  console.log(user);

  document.querySelector("#name-Cus").innerHTML = user.full_name;
  var htmlI = `
  <div class="account-info--details">
  <div class="info-boxed--title">Thông tin khách hàng</div>
    <div class="account-details--boxed">
      <div class="account-details--img">
        <img src="./content/images/user/${user.avatar}" alt="" />
      </div>
      <div class="account-details--element">
        <i class="fas fa-user"></i> ${user.full_name}
      </div>
      <div class="account-details--element">
        <i class="fas fa-map-marker-alt"></i> ${user.address}
      </div>
      <div class="account-details--element">
        <i class="fas fa-phone-alt"></i> ${user.phone}
      </div>

      <a href="" class="btn-update inline">Cập nhật thông tin</a>
  </div>
  </div>
  `;

  var htmlP = `
  <div class="account-info--order">
    <div class="info-boxed--title">Đơn hàng gần nhất</div>
    <div class="account-order--list">
      <table class="order-table">
        

      </table>
    </div>
  </div>

  `;

  fetch(`http://localhost:3000/customer/${user.id}/orders?_sort=id&_order=desc`)
    .then((response) => response.json())
    .then((data) => {
      var htmls = `
    <tr>
      <th>Mã HĐ</th>
      <th>Ngày mua</th>
      <th>Chuyển đến</th>
      <th>Tổng tiền</th>
      <th>Tình trạng đơn hàng</th>
      <th>Chi tiết</th>
      <th>Khác</th>
    </tr>`;
      if (data.length == 0) {
        htmls += `<td colspan="7">Chưa có đơn hàng nào</td>`;
      }
      data.forEach((bill) => {
        var status = "";
        var ortherF = "";
        if (bill.status == 0) {
          status = "Đơn hàng mới";
          ortherF = `<button onclick="calcelOrder(${bill.id})" class="a-fc">Hủy đơn hàng</button>`;
        } else if (bill.status == 1) {
          status = "Đã xác nhận";
        } else if (bill.status == 2) {
          status = "Đang giao hàng";
        } else if (bill.status == 3) {
          status = "Đã hoàn thành";
          ortherF = `<a href="" class="a-fc">Đặt lại</a>`;
        } else {
          status = "Đã hủy";
          ortherF = `<button class="a-fc">Đặt lại</button>`;
        }
        htmls += `
        <tr>
          <td>${bill.id}</td>
          <td>${bill.created_date}</td>
          <td>${bill.customer_address}</td>
          <td>${numberWithCommas(bill.total_money)}đ</td>
          <td>${status}</td>
          <td><a href="detailsBill.html?id=${bill.id}" class="a-fc">Xem</a></td>
          <td>${ortherF}</td>
        </tr>
        `;
      });
      document.querySelector("#manaAcc-content").innerHTML = htmlI + htmlP;
      document.querySelector(".order-table").innerHTML = htmls;
    });
}

function calcelOrder(id) {
  fetch("http://localhost:3000/orders/" + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    body: JSON.stringify({ status: 4 }),
  }).then((response) => response.json());
}
