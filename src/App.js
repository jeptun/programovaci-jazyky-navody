import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import SinglePost from "./pages/SinglePost";
import Post from "./pages/Post";
import UsefulLinks from "./pages/UsefulLinks";
import NavBar from "./components/NavBar.jsx";
import "./index.css"
function App() {
  return (
    <BrowserRouter>
    <NavBar />
      <Switch>
        <Route component={Home} path='/' exact />
        <Route component={SinglePost} path='/post/:slug' />
        <Route component={Post} path='/post' />
        <Route component={UsefulLinks} path='/usefulLinks' />
      </Switch>
    </BrowserRouter>
  )
}

export default App;
