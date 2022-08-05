const numberFormat = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});
function changetrans(intrans) {
  var intransValue = numberFormat.format(intrans.value);
  document.querySelector("#trans-price").innerHTML = intransValue;
  var tmp_tong = document.querySelector("#tmp-in");
  console.log(tmp_tong);
  console.log(Number(tmp_tong.value));
  var tong_tien = Number(tmp_tong.value) + Number(intrans.value);
  document.getElementById("tong_tien").innerHTML =
    numberFormat.format(tong_tien);
}
