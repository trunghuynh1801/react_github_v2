import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteButton from "./Delete";
import "./DataTable.css";

const DataTableFromAPI = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);

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

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h2 style={{ fontSize: "1.5em" }}>DANH SÁCH DỮ LIỆU</h2>
      <div style={{ marginBottom: "10px" }}>
        <button
          onClick={handleRefresh}
          disabled={loading}
          style={{ marginRight: "10px" }}
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
        <DeleteButton />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
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
              {currentRows.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1 + indexOfFirstRow}</td>
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
          <div>
            <ul className="pagination">
              {Array.from({ length: Math.ceil(data.length / rowsPerPage) }).map(
                (item, index) => (
                  <li key={index}>
                    <button
                      onClick={() => paginate(index + 1)}
                      className={currentPage === index + 1 ? "active" : ""}
                    >
                      {index + 1}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>
        </>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default DataTableFromAPI;
