import "./App.css";
import Navbar from "../Navbar/Navbar";
import List from "../List/List";
import Form from "../Form/Form";
import Modal from "../Modal/Modal";
import Error from "../Error/Error";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Container from "@material-ui/core/Container";
import {  useSelector } from "react-redux";

function App() {
  const error = useSelector((state) => state.tasks.error);
  return (
    <Router>
      <Navbar />
     {error.status && <Error/>}
      <Container maxWidth="sm">
        <Form />
        <Modal />
        <Switch>
          <Route exact path="/">
            <div>Hi!</div>
          </Route>
          <Route path="/tasks">
            <List />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
