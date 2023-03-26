import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import SinglePost from "./pages/SinglePost";
import "./index.css";
import JavascriptPosts from "./pages/JavascriptPost";
import CsharpPosts from "./pages/CsharpPost";
import ReactPost from "./pages/ReactPost";
import OtherPosts from "./pages/OtherPost";
import Toggles from "./components/Toggles";

export default function App() {
  return (
    <BrowserRouter>
      <div className="bg-idigo-50 flex flex-col m-auto">
        <Toggles />
        <Switch>
          <Route component={Home} path="/" exact />
          <Route component={SinglePost} path="/post/:slug" />
          <Route component={JavascriptPosts} path="/JavascriptPosts" />
          <Route component={CsharpPosts} path="/CsharpPosts" />
          <Route component={ReactPost} path="/ReactPost" />
          <Route component={OtherPosts} path="/otherPosts" />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
