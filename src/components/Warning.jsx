import React, { useState, useEffect } from "react";
import axios from "axios";

const WarningSquare = () => {
  const [warningData, setWarningData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://us-east-1.aws.data.mongodb-api.com/app/agg_func-voayj/endpoint/REACT_GetWarning"
        );

        const documents = response.data;
        const firstDocumentWarning =
          documents[0]?.public?.output?.jsonData?.warning;

        setWarningData(firstDocumentWarning);
        console.log("First Document Warning:", firstDocumentWarning);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    const intervalId = setInterval(() => {
      if (isFetching) {
        fetchData();
      }
    }, 2000); // Fetch mỗi 2 giây

    return () => clearInterval(intervalId);
  }, [isFetching]);

  const getSquareColor = () => {
    return warningData === 1 ? "red" : "green";
  };

  const getSquareContent = () => {
    return warningData === 1 ? "Đã Rơi !" : "Đang Bay :)";
  };

  console.log("Current Warning Data:", warningData);

  return (
    <div
      style={{
        width: "auto",
        height: "100px",
        backgroundColor: getSquareColor(),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: "30px",
      }}
    >
      {getSquareContent()}
      <label style={{ fontSize: "14px" }}>
        <input
          type="checkbox"
          checked={isFetching}
          onChange={() => setIsFetching(!isFetching)}
        />
        Kiểm tra hoạt động
      </label>
    </div>
  );
};

export default WarningSquare;
