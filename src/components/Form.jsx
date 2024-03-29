import React, { useState, useEffect } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import axios from "axios";
import "./NhapData.css"; // Import file CSS tùy chỉnh

const schema = {
  title: "NHẬP THÔNG TIN ĐIỀU KHIỂN HỆ THỐNG",
  type: "object",
  required: ["desire"],
  properties: {
    desire: { type: "number", title: "Nhập khoảng cách mong muốn (mm)" },
    k_percent: { type: "number", title: "Nhập giá trị phần trăm (K %)" },
  },
};

const uiSchema = {
  k_percent: {
    "ui:required": (formData) => formData.desire !== undefined,
  },
};

const TimeDisplay = () => {
  const [time, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <p style={{ fontSize: "1.2em" }}>
        Thời gian hiện tại: {time.toLocaleTimeString()}
      </p>
    </div>
  );
};

const UserLogin = () => {
  const [formData, setFormData] = useState({});

  const handleSubmit = async ({ formData }) => {
    try {
      const dataWithTime = {
        ...formData,
        time: new Date().toISOString(),
      };

      console.log("Dữ liệu gửi đi:", dataWithTime);

      // Gửi POST request đến endpoint thứ nhất
      const response = await axios.post(
        "https://us-east-1.aws.data.mongodb-api.com/app/agg_func-voayj/endpoint/update_React",
        dataWithTime
      );

      console.log("Kết quả từ server:", response.data);

      setFormData({});
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error);
    }
  };

  return (
    <div className="auth-form-container">
      <Form
        schema={schema}
        uiSchema={uiSchema}
        validator={validator}
        formData={formData}
        onChange={({ formData }) => setFormData(formData)}
        onSubmit={handleSubmit}
      />
      <TimeDisplay />
    </div>
  );
};

export default UserLogin;
