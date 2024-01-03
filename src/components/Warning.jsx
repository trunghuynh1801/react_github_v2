// WarningSquare.js

import React, { useState, useEffect } from "react";
import axios from "axios";

const WarningSquare = () => {
  const [warningData, setWarningData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://us-east-1.aws.data.mongodb-api.com/app/agg_func-voayj/endpoint/getdata_forREACT"
        );
        setWarningData(response.data.output.jsonData.warning);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchData();
  }, []);

  const getSquareColor = () => {
    return warningData === "false" ? "red" : "green";
  };

  const getSquareContent = () => {
    return warningData === "false" ? "Fail !" : "Fly :)";
  };

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
