import React, { useState, useEffect } from "react";
import axios from "axios";

const WarningSquare = () => {
  const [warningData, setWarningData] = useState(null);
  const [refreshToggle, setRefreshToggle] = useState(false); // Công tắc refresh

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://us-east-1.aws.data.mongodb-api.com/app/agg_func-voayj/endpoint/REACT_GetWarning"
        );

        const documents = response.data;
        const firstDocumentWarning =
          documents[0].public.output.jsonData.warning;

        setWarningData(firstDocumentWarning);
        console.log("First Document Warning:", firstDocumentWarning);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    // Gọi fetchData mỗi giây khi refreshToggle thay đổi
    const intervalId = setInterval(() => {
      fetchData();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [refreshToggle]); // Rỗng để đảm bảo useEffect chỉ chạy một lần sau khi render đầu tiên

  const getSquareColor = () => {
    return warningData === 1 ? "red" : "green"; // So sánh với số thay vì chuỗi
  };

  const getSquareContent = () => {
    return warningData === 1 ? "Fail !" : "Fly :)";
  };

  console.log("Current Warning Data:", warningData);

  return (
    <div
      style={{
        width: "100px",
        height: "100px",
        backgroundColor: getSquareColor(),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: "18px",
      }}
    >
      {getSquareContent()}
    </div>
  );
};

export default WarningSquare;
