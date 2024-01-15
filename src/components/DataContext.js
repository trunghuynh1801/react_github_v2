export const DataProvider = ({ children }) => {
  const [switchOn, setSwitchOn] = useState(false);

  const fetchData = async () => {
    try {
      // Thực hiện logic fetchData ở đây
      console.log("Fetching data...");
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  useEffect(() => {
    let intervalId;

    if (switchOn) {
      intervalId = setInterval(() => {
        fetchData();
      }, 2000);
    }

    return () => clearInterval(intervalId);
  }, [switchOn]);

  const toggleSwitch = () => {
    setSwitchOn(!switchOn);
  };

  return (
    <DataContext.Provider value={{ switchOn, toggleSwitch }}>
      {children}
    </DataContext.Provider>
  );
};
