import { Suspense } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createBrowserHistory, History } from "history";
import SignInSide from '../src/components/SignInSide';
import Home from '../src/components/Home';
import RequestsHomePage from './components/Requests/RequestsHomePage';
import LocationsHomePage from './components/Locations/LocationsHomePage';
import EmployeesHomePage from './components/Employees/EmployeesHomePage';
import DashboardPage from './components/Dashboard/DashboardPage';
import RequireAuth from './components/Authentication/RequireAuth';

function App() {
    const history: History = createBrowserHistory();

    return (
        //eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore      
        <Router history={history}>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<SignInSide />} />                    
                    <Route path="/home" element={<RequireAuth allowedRoles={'Administrator'}><Home /></RequireAuth>}>
                        <Route index path="dashboard" element={<DashboardPage />} />
                        <Route path="requests" element={<RequestsHomePage />} />
       {/*                 <Route path="locations" element={<LocationsHomePage />} />*/}
                        <Route path="locations" element={<RequireAuth allowedRoles={'Administrator'}><LocationsHomePage /></RequireAuth>} />
    {/*                    <Route path="employees" element={<EmployeesHomePage />} />*/}
                        <Route path="employees" element={<RequireAuth allowedRoles={'Administrator'}><EmployeesHomePage /></RequireAuth>} />
                    </Route>
                </Routes>
            </Suspense>
        </Router>
    )
}

export default App;