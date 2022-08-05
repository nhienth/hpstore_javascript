showCate();

var createBtn = document.querySelector('button[name="btn-add"]');

function handleFormCreate() {
  createBtn.onclick = function () {
    var name = document.querySelector('input[name="tensp"]').value;
    var cate_id = document.querySelector('select[name="danhmuc"]').value;
    var price = document.querySelector('input[name="dongia"]').value;
    var sale_off = document.querySelector('input[name="giamgia"]').value;
    var date = new Date();
    var image_upload = document.querySelector('input[name="anhsp"]').value;
    var description = document.querySelector('textarea[name="mota"]').value;

    var image = image_upload.slice(12);

    var date_add = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;

    var formData = {
      name: name,
      cate_id: Number(cate_id),
      price: price,
      sale_off: sale_off,
      image: image,
      date_add: date_add,
      description: description,
    };

    createData(productApi, formData, () => {
      window.location.href = "list.html";
    });
  };
}

handleFormCreate();
