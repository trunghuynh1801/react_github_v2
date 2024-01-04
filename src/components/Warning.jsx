// WarningSquare.js

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
        console.log(firstDocumentWarning);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchData();
  }, []);

  const getSquareColor = () => {
    return warningData === "1" ? "red" : "green";
  };

  const getSquareContent = () => {
    return warningData === "1" ? "Fail !" : "Fly :)";
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
