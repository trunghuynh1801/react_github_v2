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
  const [sortOrder, setSortOrder] = useState({ field: null, ascending: true });

  const handleDownload = (rowData) => {
    const jsonData = JSON.stringify(rowData);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    a.click();

    URL.revokeObjectURL(url);
  };

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

  const lastPage = Math.ceil(data.length / rowsPerPage);
  const paginationRange = 5;

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

  const handleSort = (field) => {
    setSortOrder((prevSortOrder) => ({
      field,
      ascending:
        prevSortOrder.field === field ? !prevSortOrder.ascending : true,
    }));
  };

  const sortedRows = currentRows.sort((a, b) => {
    const fieldA = a.public.input.jsonData[sortOrder.field];
    const fieldB = b.public.input.jsonData[sortOrder.field];

    if (fieldA < fieldB) {
      return sortOrder.ascending ? -1 : 1;
    }
    if (fieldA > fieldB) {
      return sortOrder.ascending ? 1 : -1;
    }
    return 0;
  });

  return (
    <div className="table-container">
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
                <th>
                  STT
                  <button onClick={() => handleSort("index")}>▲▼</button>
                </th>
                <th>
                  Desire
                  <button onClick={() => handleSort("desire")}>▲▼</button>
                </th>
                <th>
                  Distance
                  <button onClick={() => handleSort("distance")}>▲▼</button>
                </th>
                <th>
                  Setpoint
                  <button onClick={() => handleSort("setpoint")}>▲▼</button>
                </th>
                <th>
                  Hall
                  <button onClick={() => handleSort("hall")}>▲▼</button>
                </th>
                <th>
                  Current
                  <button onClick={() => handleSort("current")}>▲▼</button>
                </th>
                <th>
                  Last Balance
                  <button onClick={() => handleSort("last_balance")}>▲▼</button>
                </th>
                <th>
                  Time
                  <button onClick={() => handleSort("time")}>▲▼</button>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedRows.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1 + indexOfFirstRow}</td>
                  <td>{item.public.input.jsonData.desire}</td>
                  <td>{item.public.input.jsonData.distance}</td>
                  <td>{item.public.output.jsonData.setpoint}</td>
                  <td>{item.public.input.jsonData.hall}</td>
                  <td>{item.public.output.jsonData.current}</td>
                  <td>{item.public.input.jsonData.last_balance}</td>
                  <td>{item.public.input.jsonInfo.time}</td>
                  <td>
                    <button onClick={() => handleDownload(item)}>
                      Download
                    </button>
                  </td>
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
