$(document).ready(function () {
  $(".image-slider").slick({
    slidesToShow: 1,
    slidesToSrcoll: 1,
    infinite: true,
    arrows: true,
    prevArrow: `<button type='button' class='slick-prev slick-arrow'><ion-icon name="chevron-back-outline"></ion-icon></button>`,
    nextArrow: `<button type='button' class='slick-next slick-arrow'><ion-icon name="chevron-forward-outline"></ion-icon></button>`,
    dots: true,
    autoplay: true,
  });
});
