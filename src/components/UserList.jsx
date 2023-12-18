import React, { useState, useEffect } from "react";
import axios from "axios";

const UserList = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://us-east-1.aws.data.mongodb-api.com/app/react_get-vbjcf/endpoint/react_get"
      );
      setUserData(response.data);
      setError(null);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
      setError("Không thể tải dữ liệu. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    fetchData();
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div>
      <h2 style={{ fontSize: "1.5em" }}>DANH SÁCH VÀ STT </h2>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={handleRefresh} disabled={loading}>
          {loading ? "Refreshing..." : "Refresh"}
        </button>
        <button onClick={toggleShowPassword} style={{ marginLeft: "10px" }}>
          {showPassword ? "Ẩn" : "Hiện"} Mật khẩu
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}
      >
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên người dùng</th>
            <th>Mật khẩu</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td style={{ fontSize: "1.2em" }}>{user.username}</td>
              <td style={{ fontSize: "1.2em" }}>
                {showPassword ? (
                  user.password
                ) : (
                  <span
                    style={{ cursor: "pointer", fontSize: "1.2em" }}
                    onClick={toggleShowPassword}
                  >
                    ••••••
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
