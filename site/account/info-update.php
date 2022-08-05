<!-- 

    <div class="bottom-nav">
      <div class="bottom-nav--title width-normal">
        <a href="index.php">Trang chủ</a>
        <i class="fas fa-chevron-right"></i>
        <span class="blue">Trang khách hàng</span>
      </div>
    </div>

    <div class="container">
      <div class="section-AF width-normal">
        <div class="account-info--title">
          <div class="info-title--txt">Cập nhật tài khoản</div>
          <div class="info-hello">Xin chào <?=$ho_ten?></div>
        </div>
        <div class="account-info--boxed">
          <div class="account-info--details">
            <div class="info-boxed--title">Thông tin khách hàng</div>
            <div class="account-details--boxed">
      
          
            <div class="form-funtcion">
             
          </div>
          
        </div>
      </div>
    </div> -->

    <?php

if(isset($_SESSION['user']) && (is_array($_SESSION['user']))) {
    extract($_SESSION['user']);
}

?>


<div class="bottom-nav">
      <div class="bottom-nav--title width-normal">
        <a href="index.php">Trang chủ</a>
        <i class="fas fa-chevron-right"></i>
        <span class="blue">Trang khách hàng</span>
      </div>
    </div>

    <div class="container">
      <div class="section-AF width-normal">
        <div class="account-info--title">
          <div class="info-title--txt">Cập nhật tài khoản</div>
          <div class="info-hello">Xin chào, <?=$ho_ten?></div>
        </div>
        <?php
              
              if(isset($thongbao) && ($thongbao != "")) {
              echo ' <div class="notification"><i class="fas fa-bell"></i> '.$thongbao.'</div>';
              }
          
          ?>
        <div class="account-info--boxed">
          
        <div class="update-info--img">
          <img src="./uploads/<?=$hinh?>" alt="">
        </div>
        <div class="update-info--edit">
          <div class="info-edit--form">
          <form action="index.php?act=update-info" method="post" class="login-form" enctype="multipart/form-data">
                  <label for="tendn">Tên đăng nhập</label>
                  <input type="text" name="user" id="tendn" value="<?=$ten_dangnhap?>">
               
                  <label for="name">Họ tên</label>
                  <input type="text" name="name" id="name" value="<?=$ho_ten?>">
                  <label for="hinh">Hình đại diện</label>
                  <input type="file" name="avatar" id="hinh">
                  <label for="email">Email</label>
                  <input type="email" name="email" id="email" value="<?=$email?>">
                  <label for="phone">Số điện thoại</label>
                  <input type="text" name="phone" id="phone" value="<?=$so_dien_thoai?>">
                  <label for="address">Địa chỉ</label>
                  <input type="text" name="address" id="address" value="<?=$dia_chi?>"> 
                  <input type="hidden" name="ma_khachhang" value="<?=$ma_khachhang?>">                
                  <button type="submit" name="btn-update" class="btn-update">Cập nhật</button>
              </form>
          </div>

        </div>
          
        </div>
      </div>
    </div>