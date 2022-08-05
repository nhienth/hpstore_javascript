<?php

if(isset($bill) && (is_array($bill))) extract($bill);
    if($bill['thanh_toan'] == 0){
        $bill['thanh_toan'] = "Thanh toán khi nhận hàng";
    }else{
        $bill['thanh_toan'] = "Thanh toán online";
    }

    if($bill['trang_thai'] == 0) {
        $bill['trang_thai'] = "Đơn hàng đang chờ xử lý";
    }
?>

<table>
<tr>
        <td>Mã hóa đơn</td>
        <td>Tên khách hàng</td>
        <td>Địa chỉ</td>
        <td>Điện thoại</td>
        <td>Email</td>
        <td>Phương thức thanh toán</td>
        <td>Phí vận chuyển</td>
        <td>Ngày đặt</td>
        <td>Tổng tiền</td>
        <td>Trạng thái</td>
    </tr>
    <tr>
        <td><?=$bill['ma_hoadon']?></td>
        <td><?=$bill['ten_khachhang']?></td>
        <td><?=$bill['dia_chi']?></td>
        <td><?=$bill['dien_thoai']?></td>
        <td><?=$bill['email']?></td>
        <td><?=$bill['thanh_toan']?></td>
        <td><?=$bill['van_chuyen']?></td>
        <td><?=$bill['ngay_dat']?></td>
        <td><?=$bill['tong_tien']?></td>
        <td><?=$bill['trang_thai']?></td>
    </tr>
</table>

<table>
    <tr>
        <td>Ma</td>
        <td>Hình</td>
        <td>Sản phẩm</td>
        <td>Đơn giá</td>
        <td>Size</td>
        <td>Số lượng</td>
        <td>Thành tiền</td>
    </tr>

    <?php
    
    foreach ($billDetails as $pro) {
        $ttien = $pro['gia'] * $pro['so_luong'];
        echo '
        <tr>
            <td>'.$pro['idbill'].'</td>
            <td><img src="./uploads/'.$pro['hinh'].'" width="100px" alt=""></td>
            <td>'.$pro['ten_hanghoa'].'</td>
            <td>'.$pro['gia'].'</td>
            <td>'.$pro['size'].'</td>
            <td>'.$pro['so_luong'].'</td>
            <td>'.$ttien.'</td>
        </tr>
        
        ';
    }
    
    ?>

</table>