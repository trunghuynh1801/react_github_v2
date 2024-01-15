import React, { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [switchOn, setSwitchOn] = useState(true);

  useEffect(() => {
    let intervalId;

    if (switchOn) {
      intervalId = setInterval(() => {
        // Gọi fetchData mỗi 2 giây khi công tắc được bật
        // Thực hiện logic fetchData ở đây
        console.log("Fetching data...");
      }, 2000);
    }

    return () => clearInterval(intervalId);
  }, [switchOn]);

  const toggleSwitch = () => {
    setSwitchOn(!switchOn);
  };

  useEffect(() => {
    toggleSwitch();
  }, []);

  return (
    <DataContext.Provider value={{ switchOn, toggleSwitch }}>
      {children}
    </DataContext.Provider>
  );
};
