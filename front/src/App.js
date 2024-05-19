import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "src/components/Layout";
import Dashboard from "src/components/Dashboard";
import GenerateLogo from "src/components/GenerateLogo";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="new" element={<GenerateLogo />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
