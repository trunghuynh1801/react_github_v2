import React from "react";
import Iframe from "react-iframe";

const MongoDBChart = () => {
  return (
    <div>
      <Iframe
        url="https://charts.mongodb.com/charts-immabeo-swlvx/public/dashboards/bf2dc2cb-a9c9-4e3f-b648-cab61ad29d89"
        width="100%"
        height="600px"
        id="mongodb-chart-iframe"
        display="initial"
        position="relative"
      />
    </div>
  );
};

export default MongoDBChart;
