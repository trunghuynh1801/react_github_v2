import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteButton from "./Delete";

const DataTableFromAPI = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://us-east-1.aws.data.mongodb-api.com/app/agg_func-voayj/endpoint/getdata_forREACT"
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
        <DeleteButton />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "10px",
          }}
        >
          <thead>
            <tr>
              <th>STT</th>
              <th>Desire</th>
              <th>Distance</th>
              <th>Setpoint</th>
              <th>Hall</th>
              <th>Current</th>
              <th>Last Balance</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.public.input.jsonData.desire}</td>
                <td>{item.public.input.jsonData.distance}</td>
                <td>{item.public.output.jsonData.setpoint}</td>
                <td>{item.public.input.jsonData.hall}</td>
                <td>{item.public.output.jsonData.current}</td>
                <td>{item.public.input.jsonData.last_balance}</td>
                <td>{item.public.input.jsonInfo.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default DataTableFromAPI;