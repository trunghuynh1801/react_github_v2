import React, { useState, useEffect } from "react";
import axios from "axios";

const DataTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://us-east-1.aws.data.mongodb-api.com/app/react_get-vbjcf/endpoint/react_get"
      );
      setData(response.data);
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

  return (
    <div>
      <h2 style={{ fontSize: "1.5em" }}>DANH SÁCH DỮ LIỆU</h2>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={handleRefresh} disabled={loading}>
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}
      >
        <thead>
          <tr>
            <th>STT</th>
            <th>Number 1</th>
            <th>Number 2</th>
            <th>Number 3</th>
            <th>Number 4</th>
            <th>Number 5</th>
            <th>Number 6</th>
            <th>Ngày</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.number1}</td>
              <td>{item.number2}</td>
              <td>{item.number3}</td>
              <td>{item.number4}</td>
              <td>{item.number5}</td>
              <td>{item.number6}</td>
              <td>{new Date(item.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
