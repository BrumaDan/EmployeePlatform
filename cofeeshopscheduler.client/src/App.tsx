import { Suspense } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createBrowserHistory, History } from "history";
import SignInSide from '../src/components/SignInSide';
import axios from 'axios'

function App() {
    const history: History = createBrowserHistory();
    axios.get('/api/location').then(res => console.log(res)).catch(err => console.log(err))

    return (
        //eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore      
        <Router history={history}>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<SignInSide />} />

                    {/*<Route path="/home" element={   <RequireAuth allowedRoles={'admin'}><SignInSide /></RequireAuth>} />*/}
                    <Route path="/home" element={<SignInSide />} />

                </Routes>
            </Suspense>
        </Router>
        )
}

export default App;