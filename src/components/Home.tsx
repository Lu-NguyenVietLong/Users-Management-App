import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Link to="/users">Go to users management page</Link>
      <div>Các tính năng của website</div>
      <div>1. Đăng nhập</div>
      <div>2. Thêm User</div>
      <div>3. Sửa User</div>
      <div>4. Xóa User</div>
      <div>5. Hiển thị tất cả User</div>
      <div>6. Tìm kiếm User</div>
      <div>7. Sắp xếp Users</div>
      <div>8. Import Users từ file .csv</div>
      <div>8. Export Users từ file .csv</div>
    </div>
  );
};

export default Home;
