import "./App.css";
import DeleteButton from "./components/Delete";
import Form from "./components/Form";
import UserList from "./components/UserList";
function App() {
  return (
    <div className="App">
      <header>
        <h1>Magnetic Levitation</h1>
        <Form />
        <UserList />
        <DeleteButton />
      </header>
    </div>
  );
}

export default App;
