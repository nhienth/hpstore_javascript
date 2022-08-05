var createBtn = document.querySelector('button[name="btn-add"]');

function handleFormCreate() {
  createBtn.onclick = function () {
    var user_name = document.querySelector('input[name="user"]').value;
    var password = document.querySelector('input[name="pass"]').value;
    var phone = document.querySelector('input[name="phone"]').value;
    var full_name = document.querySelector('input[name="name"]').value;
    var email = document.querySelector('input[name="email"]').value;
    var address = document.querySelector('input[name="address"]').value;
    var image = document.querySelector('input[name="avatar"]').value;

    var avatar = image.slice(12);
    var formData = {
      user_name: user_name,
      password: password,
      full_name: full_name,
      avatar: avatar,
      phone: phone,
      email: email,
      address: address,
      role: 0,
    };

    createData(customerApi, formData, () => {
      window.location.href = "list.html";
    });
  };
}

handleFormCreate();
