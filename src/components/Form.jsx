import React, { useState } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import axios from "axios";
import "./UserLogin.css"; // Import file CSS tùy chỉnh

const schema = {
  title: "MỜI NHẬP TÀI KHOẢN",
  type: "object",
  required: [
    "username",
    "password",
    "gender",
    "height",
    "weight",
    "medicalHistory",
  ],
  properties: {
    username: { type: "string", title: "TÊN BỆNH NHÂN" },
    password: { type: "string", title: "MÃ SỐ", format: "password" },
    gender: { type: "string", title: "GIỚI TÍNH", enum: ["Nam", "Nữ", "Khác"] },
    height: { type: "number", title: "CHIỀU CAO (cm)" },
    weight: { type: "number", title: "CÂN NẶNG (kg)" },
    medicalHistory: {
      type: "string",
      title: "TIỀN SỬ BỆNH",
      format: "textarea",
    },
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
