import React, { useState, useEffect } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import axios from "axios";
import "./UserLogin.css"; // Import file CSS tùy chỉnh

const schema = {
  title: "NHẬP THÔNG TIN ĐIỀU KHIỂN HỆ THỐNG",
  type: "object",
  required: ["desire"],
  properties: {
    desire: { type: "number", title: "Nhập khoảng cách mong muốn (mm)" },
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

      console.log("Dữ liệu gửi đi:", formData);

      const response1 = await axios.post(
        "https://us-east-1.aws.data.mongodb-api.com/app/react-xvfpd/endpoint/updateinput",
        dataWithTime
      );
      console.log("Kết quả từ server (update): ", response1.data);

      /*const response2 = await axios.post(
        "https://us-east-1.aws.data.mongodb-api.com/app/react-xvfpd/endpoint/processvalue"
      );
      console.log("Kết quả từ server (process):", response2.data);*/

      // Reset form sau khi submit thành công
      setFormData({});
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error);
    }
  };

  return (
    <div className="auth-form-container">
      <TimeDisplay />
      <Form
        schema={schema}
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
