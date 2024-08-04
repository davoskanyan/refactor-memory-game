import { BrowserRouter as Router, Link, Outlet, Route, Routes } from "react-router-dom";

import Home from "./Home";
import examples from "./examples";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/*" element={
          <div>
            <Link to="/">← Back</Link>

            <div id="main-content">
              <Outlet/>
            </div>
          </div>
        }>
          {examples.map(({ name, url, Component }) => (
            <Route key={name} path={url} element={(
              <>
                <h1>{name}</h1>
                <Component/>
              </>
            )}/>
          ))}
        </Route>
      </Routes>
    </Router>
  );
};
