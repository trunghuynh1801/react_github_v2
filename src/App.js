import "./App.css";
import Form from "./components/Form";
import UserList from "./components/DataTable";
import Warning from "./components/Warning";
import Chart from "./components/Chart";
function App() {
  return (
    <div className="App">
      <header>
        <h1>Magnetic Levitation</h1>
        <Form />
        <Warning />
        <UserList />
        <Chart />
      </header>
    </div>
  );
}

export default App;
