<div class="bottom-nav">
      <div class="bottom-nav--title width-normal">
        <a href="index.php">Trang chủ</a>
        <i class="fas fa-chevron-right"></i>
        <a href="">Giỏ hàng</a>
      </div>
</div>

<?php

    if(isset($_SESSION['cart']) && ($_SESSION['cart'] != [])) {
        $tong_sl = 0;
        foreach ($_SESSION['cart'] as $cart) {
            $tong_sl+= $cart[5];
        }
        echo '
        <div class="container">
        <div class="cart-layout width-normal">
            <div class="cart-title">
                <span class="cart-title--txt">Giỏ hàng</span>
                <span class="cart-title--count">('.$tong_sl.' sản phẩm)</span>
            </div>
        </div>
        </div>
        ';
        echo '
        <div class="container">
        <form action="" class="form-list-cart" method="post" enctype="multipart/form-data">
        ';
        $tong_tien = 0;
        $i = 0;
        foreach ($_SESSION['cart'] as $cart) {
            $tmp_tien = $cart[3] * $cart[5];
            $tong_tien+=$tmp_tien;
            $delete = "index.php?act=delete-cart&&id=".$i;
    ?>
        <div class="list-cart">
                <div class="list-cart--img">
                    <a href="#"><img src="./uploads/<?=$cart[2]?>"></a>
                </div>
                <div class="list-cart--name">
                    <a href="#"><?=$cart[1]?> - <?=$cart[4]?></a>
                    <a href="<?=$delete?>" class="list-cart--delete">Xóa</a>
                </div>
                <div class="list-cart--price">
                    <?=number_format($cart[3])?>đ
                </div>
                <div class="list-cart--quantity">
                    <div class="quantity buttons_added" style="margin-top: 0px">
                        <input type="button" value="-" class="minus minus2" /><input
                          type="number"
                          step="1"
                          min="1"
                          max=""
                          name="quantity"
                          value="<?=$cart[5]?>"
                          title="Qty"
                          class="input-text qty text input-text2"
                          size="4"
                          pattern=""
                          inputmode=""
                        /><input type="button" value="+" class="plus plus2" />
                      </div>
                </div>
            </div>

        <?php  $i+=1; ?>
    <?php } ?>
   
    <div class="list-cart--money">
                <div class="money--tmp tmp-first">
                    <div class="money-txt">Tạm tính : </div>
                    <div class="money-number"><?=number_format($tong_tien)?>đ</div>
                </div>
                <div class="money--tmp">
                    <div class="money-txt transform-y">Thành tiền : </div>
                    <div class="money-number--into"><?=number_format($tong_tien)?>đ</div>
                </div>
                <!-- <div class="money--into">Thành tiền : 650.000đ</div> -->
                <div class="money-button margin-top">
                    <?php
                    
                    if(isset($_SESSION['user'])) {
                        echo '<button class="btn-pay"><a href="index.php?act=checkout" class="white">Thanh toán ngay</a></button>';
                    }else{
                        echo '<button class="btn-pay"><a href="index.php?act=dangnhap" class="white">Đăng nhập để thanh toán</a></button>';
                    }
                    ?>
                    
                    <a href="index.php" class="btn-ctn">Tiếp tục mua hàng</a>
                </div>
            </div>
        </form>

<?php }else{ ?>

    <div class="container">
      <div class="cart-layout width-normal">
        <div class="cart-title">
          <span class="cart-title--txt">Giỏ hàng</span>
          <span class="cart-title--count">(0 sản phẩm)</span>
        </div>
        <div class="cart-img">
          <img src="./content/images/home/empty-bags.jpg" alt="" />
        </div>
        <div class="btn-continue">
          <a href="index.php">Tiếp tục mua sắm</a>
        </div>
      </div>
    </div>

<?php } ?>