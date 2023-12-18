import "./App.css";
import Form from "./components/Form";
import UserList from "./components/UserList";
function App() {
  return (
    <div className="App">
      <header>
        <h1>React App</h1>
        <Form />
        <UserList />
      </header>
    </div>
  );
}

export default App;
