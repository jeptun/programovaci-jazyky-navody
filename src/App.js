import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import SinglePost from "./pages/SinglePost";
import NavBar from "./components/NavBar.jsx";
import "./index.css"
import JavascriptPosts from "./pages/JavascriptPost";
import CsharpPosts from "./pages/CsharpPost";
import ReactPost from "./pages/ReactPost";
import Footer from "./components/Footer";
import NavBarTest from "./components/NavBarTest";
import OtherPosts from "./pages/OtherPost";
function App() {
  return (
    <BrowserRouter>
    <div className="row d-sm-flex w-100 ">
    {/* <NavBar /> */}
    <NavBarTest/>
      <Switch>
        <Route component={Home} path='/' exact />
        <Route component={SinglePost} path='/post/:slug' />
        <Route component={JavascriptPosts} path='/JavascriptPosts' />
        <Route component={CsharpPosts} path='/CsharpPosts' />
        <Route component={ReactPost} path='/ReactPost' />
        <Route component={OtherPosts} path='/otherPosts' />
      </Switch>
    </div>
    <Footer/>
    </BrowserRouter>
  )
}

export default App;
