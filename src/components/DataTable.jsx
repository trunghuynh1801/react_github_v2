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
  const [isRefreshing, setIsRefreshing] = useState(false); // Sử dụng state để kiểm soát công tắc

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
      // Khi dữ liệu được fetch xong, tắt công tắc refresh
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Gọi fetchData mỗi giây khi isRefreshing là true
      if (isRefreshing) {
        fetchData();
      }
    }, 1000);

    return () => {
      // Dọn dẹp interval khi component bị hủy
      clearInterval(intervalId);
    };
  }, [isRefreshing]);

  const handleToggleRefresh = () => {
    // Bật hoặc tắt công tắc refresh khi nút được nhấn
    setIsRefreshing((prevToggle) => !prevToggle);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const lastPage = Math.ceil(data.length / rowsPerPage);
  const paginationRange = 5; // Số lượng trang hiển thị

  let startPage, endPage;
  if (lastPage <= paginationRange) {
    startPage = 1;
    endPage = lastPage;
  } else {
    const halfRange = Math.floor(paginationRange / 2);
    if (currentPage <= halfRange) {
      startPage = 1;
      endPage = paginationRange;
    } else if (currentPage + halfRange >= lastPage) {
      startPage = lastPage - paginationRange + 1;
      endPage = lastPage;
    } else {
      startPage = currentPage - halfRange;
      endPage = currentPage + halfRange;
    }
  }

  return (
    <div className="table-container">
      <h2 style={{ fontSize: "1.5em" }}>DANH SÁCH DỮ LIỆU</h2>
      <div style={{ marginBottom: "10px" }}>
        <button
          onClick={handleToggleRefresh}
          disabled={loading}
          style={{ marginRight: "10px" }}
        >
          {isRefreshing ? "Stop Refreshing" : "Start Refreshing"}
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
              {Array.from({ length: endPage - startPage + 1 }).map(
                (item, index) => (
                  <li key={index}>
                    <button
                      onClick={() => paginate(startPage + index)}
                      className={
                        currentPage === startPage + index ? "active" : ""
                      }
                    >
                      {startPage + index}
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
