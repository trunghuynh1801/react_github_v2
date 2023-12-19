import React, { useState } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import axios from "axios";
import "./UserLogin.css"; // Import file CSS tùy chỉnh

const schema = {
  title: "MỜI NHẬP TÀI KHOẢN",
  type: "object",
  required: [
    "desire",
    "setpoint",
    "hall",
    "current",
    "LatestBalanceTime",
    "date",
  ],
  properties: {
    desire: { type: "number", title: "Nhập khoảng cách mong muốn (mm)" },
    setpoint: { type: "number", title: "Setpoint của hệ thống" },
    hall: { type: "number", title: "Giá trị từ cảm biến Hall Sensor" },
    current: { type: "number", title: "CHIỀU CAO (cm)" },
    LatestBalanceTime: { type: "number", title: "CÂN NẶNG (kg)" },
    date: { type: "string", title: "Thời gian hiện tại", format: "date-time" },
  },
};

const UserLogin = () => {
  const [formData, setFormData] = useState({});

  const handleSubmit = async ({ formData }) => {
    try {
      console.log("Dữ liệu gửi đi:", formData);

      const response = await axios.post(
        "https://us-east-1.aws.data.mongodb-api.com/app/react_post-agjpx/endpoint/react_post",
        formData
      );

      console.log("Kết quả từ server:", response.data);

      // Reset form sau khi submit thành công
      setFormData({});
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error);
    }
  };

  return (
    <div className="auth-form-container">
      <Form
        schema={schema}
        validator={validator}
        formData={formData}
        onChange={({ formData }) => setFormData(formData)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default UserLogin;
