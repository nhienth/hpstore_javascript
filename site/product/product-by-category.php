<div class="bottom-nav">
      <div class="bottom-nav--title width-normal">
        <a href="index.html">Trang chủ</a>
        <i class="fas fa-chevron-right"></i>
        <span class="blue"></span>
      </div>
    </div>

    <div class="container">
      <div class="product-adv width-normal">
        <div class="adv-img">
          <img src="./content/images/home/cate_1.jpg" alt="" />
        </div>
        <div class="adv-img">
          <img src="./content/images/home/cate_2.jpg" alt="" />
        </div>
      </div>
    </div>

    <div class="container">
      <div class="main-product--list width-normal">
        <div class="main-product--left">
          <div class="filter-title">
            <p class="filter-filer">Bộ lọc</p>
            <p class="filter-help">Giúp lọc nhanh sản phẩm bạn tìm kiếm</p>
          </div>
          <div class="product-left--filter">
            <div class="filter-name">Tên sản phẩm</div>
            <div class="filter-form">
              <form action="" method="post">
                <input type="text" placeholder="Tìm theo tên" name="kyw"/>
                <button type="submit" name="timkiem" >
                  <i class="fas fa-search font-filter"></i>
                </button>
              </form>
            </div>
            <div class="filter-name">Giá sản phẩm</div>
            <form action="" method="post" class="form-price">
              <select name="filterValue" id="">
                <option value="0">Tất cả</option>
                <option value="1">Dưới 300.000đ</option>
                <option value="2">Dưới 500.000đ</option>
                <option value="3">Dưới 1.000.000đ</option>
              </select>
              <button type="submit" name="btn-filter">
                <i class="fas fa-search font-filter"></i>
              </button>
            </form>
          </div>
          <div class="filter-title margin-top-20">
            <p class="filter-filer">Danh mục</p>
          </div>
          <div class="product-left--filter">
            <div class="vertical-navigation">
              <nav class="ver-nav">
                <ul>
                  <li><a href="">abcde</a></li>
                  <li><a href="#">Blog bóng chuyền</a></li>
                  <li><a href="#">Tin tức - sự kiện</a></li>
                  <li><a href="#">Đánh giá sản phẩm</a></li>
                </ul>
              </nav>
            </div>
          </div>
          <div class="filter-title margin-top-20">
            <p class="filter-filer">Top sản phẩm yêu thích</p>
          </div>
          <div class="topViews-box">
                
                  <!-- <div class="topViews-pro">
                    <div class="topViews-pro--img">
                      <a href="'.$linkDetails.'"><img src="./uploads/" /></a>
                    </div>
                    <div class="topViews-pro--name"><a href="'.$linkDetails.'">'.$ten_hanghoa.'</a></div>
                  </div> -->
                
              
            </div>
          <div>
            
          </div>
          <div class="product-left--img">
            <img src="./content/images/home/aside_banner.png" />
          </div>
        </div>
        <div class="main-product--right">
          <div class="product-sort">
            <div class="producr-sort--right">
              <form action="" method="post">
                <label for="sort">Sắp xếp : </label>
                <select id="sort" name="sapxephh">
                  <option value="0">Thứ tự</option>
                  <option value="1">A - Z</option>
                  <option value="2">Z - A</option>
                  <option value="3">Giá tăng dần</option>
                  <option value="4">Giá giảm dần</option>
                  <option value="5">Hàng mới nhất</option>
                  <option value="6">Hàng cũ nhất</option>
                </select>
                <button class="btn-sort" name="btn-sx"></button>
              </form>
            </div>
          </div>
          <div class="product-show">


                <div class="product-box">
                    <div class="item-option"><a style="color:white" href="">Chi tiết</a></div>
                    <div class="item-image">
                    <!-- <div class="item-sale">Giảm '.$giam_gia.'%</div> -->
                        <a href=""> <img src="./uploads/" /></a>
                    </div>
                    <div class="item-name"><a href=""></a></div>
                
                        <div class="item-price">
                        <span class="price-off"></span>
                        <span class="price-sale"></span>
                        </div>
           
                        <div class="item-price">
                            <span class="price-off">'.number_format($don_gia).'đ</span>
                        </div>
                    
                </div>


          </div>
        </div>
      </div>
    </div>

 