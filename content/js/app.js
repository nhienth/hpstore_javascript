//Get the button:
mybutton = document.getElementById("myBtn");
mynavigation = document.querySelector(".main-navagation");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.opacity = "1";
    mybutton.style.visibility = "visible";
    mybutton.style.transition = "all 0.2s ease";
    mynavigation.style.position = "fixed";
    mynavigation.style.top = "0";
    mynavigation.style.left = "0";
    mynavigation.style.zIndex = "99";
  } else {
    mybutton.style.opacity = "0";
    mybutton.style.visibility = "hidden";
    mybutton.style.transition = "all 0.2s ease";
    mynavigation.style.position = "relative";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
// -----------------------------------------------------------------------------

function changeSize(inSize) {
  var quantily = inSize.nextElementSibling.nextElementSibling;
  console.log(quantily.value);
  var statusElement = document.querySelector("#status-pro");
  // var buttonBuy = document.getElementsByName("add-cart");
  var buttonBuy = document.getElementById("add-cart");
  var buttonBuyFC = buttonBuy.firstElementChild;
  var buttonBuyLC = buttonBuy.lastElementChild;
  if (quantily.value == 0) {
    statusElement.innerHTML = "Hết hàng";
    buttonBuy.style.backgroundColor = "#65779f";
    buttonBuy.style.userSelect = "none";
    buttonBuy.style.cursor = "default";
    buttonBuyFC.innerHTML = "Hết hàng";
    buttonBuyLC.innerHTML = "Liên hệ 0866100339";
    buttonBuy.removeAttribute("name");
    console.log(buttonBuy);
  } else {
    statusElement.innerHTML = "Còn " + quantily.value + " sản phẩm";
    buttonBuy.style.backgroundColor = "";
    buttonBuyFC.innerHTML = "Mua ngay";
    buttonBuyLC.innerHTML = "Giao hàng tận nơi";
    buttonBuy.style.cursor = "pointer";
    buttonBuy.setAttribute("name", "add-cart");
    console.log(buttonBuy);
  }
}
// var sizeElement = document.querySelector(".size-checked");
// var labelText = sizeElement.firstElementChild.nextElementSibling.innerHTML;
// if (labelText.length >= 3) {
//   sizeElement.style.marginRight = "30px";
// }
