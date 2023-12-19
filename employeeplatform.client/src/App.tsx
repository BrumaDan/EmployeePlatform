import { Suspense } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createBrowserHistory, History } from "history";
import SignInSide from '../src/components/SignInSide';
import Home from '../src/components/Home';

function App() {
    const history: History = createBrowserHistory();

    return (
        //eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore      
        <Router history={history}>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<SignInSide />} />

                    {/*<Route path="/home" element={   <RequireAuth allowedRoles={'admin'}><SignInSide /></RequireAuth>} />*/}
                    <Route path="/home" element={<Home />} />

                </Routes>
            </Suspense>
        </Router>
    )
}

export default App;