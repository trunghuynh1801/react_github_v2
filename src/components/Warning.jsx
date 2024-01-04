import React, { useState, useEffect } from "react";
import axios from "axios";

const WarningSquare = () => {
  const [warningData, setWarningData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://us-east-1.aws.data.mongodb-api.com/app/agg_func-voayj/endpoint/REACT_GetWarning"
        );

        // Assume the structure of the response is an array of documents
        const documents = response.data;

        // Access the "public.output.warning" property from the first document (you may need to adjust this based on your actual data structure)
        const firstDocumentWarning =
          documents[0].public.output.jsonData.warning;

        setWarningData(firstDocumentWarning);
        console.log("First Document Warning:", firstDocumentWarning);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    const intervalId = setInterval(() => {
      // Gửi request mỗi giây
      fetchData();
    }, 1000);

    // Dùng clearInterval để tránh memory leak khi component unmount
    return () => clearInterval(intervalId);
  }, []); // Rỗng để đảm bảo useEffect chỉ chạy một lần sau khi render đầu tiên

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
