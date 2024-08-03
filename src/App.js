import { Routes, Route } from "react-router-dom";
import { path } from "~/utils/constant";
import {
  Home,
  WeatherDashboard,
  WeatherSubcribe,
  WeatherHistorySearch,
} from "~/pages";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={path.HOME} element={<Home />} />
        <Route path={path.DASHBOARD} element={<WeatherDashboard />} />
        <Route path={path.CONTACT} element={<WeatherSubcribe />} />
        <Route path={path.HISTORY} element={<WeatherHistorySearch />} />
      </Routes>
    </div>
  );
}

export default App;
