// DeleteButton.js
import React, { useState } from "react";
import axios from "axios";

const DeleteButton = () => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      // Yêu cầu nhập mã PIN từ người dùng
      const enteredPIN = prompt("Nhập mã PIN:");

      // Kiểm tra nếu mã PIN không đúng, không thực hiện lệnh delete
      if (enteredPIN !== "1504") {
        alert("Mã PIN không đúng. Vui lòng thử lại.");
        return;
      }

      setIsDeleting(true);

      const response = await axios.delete(
        "https://us-east-1.aws.data.mongodb-api.com/app/agg_func-voayj/endpoint/REACT_delete",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Xử lý thành công, ví dụ: hiển thị thông báo thành công, cập nhật trạng thái, v.v.
        console.log("Items deleted successfully");
      } else {
        // Xử lý lỗi, ví dụ: hiển thị thông báo lỗi, ghi log lỗi, v.v.
        console.error("Failed to delete items");
      }
    } catch (error) {
      // Xử lý bất kỳ lỗi nào không mong muốn
      console.error("An error occurred while deleting", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button onClick={handleDelete} disabled={isDeleting}>
      {isDeleting ? "Deleting..." : "Delete All"}
    </button>
  );
};

export default DeleteButton;
