import "./App.css";
import Form from "./components/Form";
import UserList from "./components/DataTable";
import Warning from "./components/Warning";
function App() {
  return (
    <div className="App">
      <header>
        <h1>Magnetic Levitation</h1>
        <Form />
        <Warning />
        <UserList />
      </header>
    </div>
  );
}

export default App;
