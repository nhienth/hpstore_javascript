
    <div class="bottom-nav">
      <div class="bottom-nav--title width-normal">
        <a href="index.php">Trang chủ</a>
        <i class="fas fa-chevron-right"></i>
        <span class="blue">Đổi lại mật khẩu</span>
      </div>
    </div>

    <section class="section-row width-normal">
      <div class="login-block">
        <div class="login-title">Đổi mật khẩu</div>
        <div class="login-title--else">
          
        </div>
        <?php
        if(isset($thongbao) && ($thongbao != "")) {
          echo '<div class="thongbaos "><i class="fas fa-bell"></i> '.$thongbao.'</div>';
        }
        ?>
        <form action="index.php?act=doimatkhau" class="login-form" method="post" enctype="multipart/form-data">
           
          <label for="user">Mật khẩu hiện tại<span class="red">*</span></label>
          <input type="password" id="pass" name="pass" value="<?php if(isset($pass)) echo $pass ?>" placeholder="Mật khẩu cũ" />
          <label for="email">Mật khẩu mới<span class="red">*</span></label>
          <input type="password" id="email" name="pass1" value="<?php if(isset($pass1)) echo $pass1 ?>" placeholder="Mật khẩu mới" />
          <label for="email">Nhập lại mật khẩu mới<span class="red">*</span></label>
          <input type="password" id="email" name="pass2" value="<?php if(isset($pass2)) echo $pass2 ?>" placeholder="Nhập lại mật khẩu mới" />
          <!-- <input type="submit" value="Đăng nhập" class="btn-submit" /> -->
          <button class="btn-submit" name="doimatkhau" type="submit">Đổi mật khẩu</button>
        </form>
      </div>
    </section>

  
    
