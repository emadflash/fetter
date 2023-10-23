import Homepage from './Homepage.jsx'
import SignUp from './SignUp.jsx';
import SignIn from './SignIn.jsx';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PersistLogin from './PersistLogin.jsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PersistLogin />}>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/login" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;