import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";
import Login from './pages/Login';
import DataVisualization from './pages/Data_Visualization';
import DataManagement from './pages/Data_Management';
import UserManagement from './pages/User_Management';
import PersonalInformation from './pages/Personal_Information';
import PrivateRoutes from './utils/PrivateRoutes';
import AdminPrivateRoutes from './utils/AdminPrivateRoute';
import VisualPresentation from './pages/Visual_Presentation';

function App() {
  return (
    <div>
        <Router>
          <Routes>
            <Route element={<PrivateRoutes/>}>
              <Route element={<DataVisualization/>} path= "/data_visualization"/>
              <Route element={<PersonalInformation/>} path= "/personal_information"/>
              <Route element={<DataManagement/>} path= "/data_management"/>
              <Route path="*" element={<Navigate to="/" />} />
            </Route>             
            <Route element={<AdminPrivateRoutes/>}>
              <Route element={<UserManagement/>} path= "/user_management" /> 
              <Route element={<VisualPresentation/>} path= "/presentation" /> 
            </Route> 
            <Route element={<Login/>} path= "/"/>
          </Routes>
        </Router> 
    </div>
  );
}

export default App;
