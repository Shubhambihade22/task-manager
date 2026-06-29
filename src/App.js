import { Container } from "@mui/material";
import "./App.css";
import { Nav } from "./components/AppBar";
import Dashboard from "./pages/Dashboard";
import TaskManager from "./components/TaskManager";

function App() {
  return (
    <>
      <Nav />
      {/* <Dashboard /> */}
      <Container maxWidth="lg">
        <TaskManager />
      </Container>
    </>
  );
}

export default App;
