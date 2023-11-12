import Homepage from './Homepage.jsx'
import SignUpPage from './SignUp.jsx';
import LoginPage from './SignIn.jsx';
import PostPage from './Post.jsx';
import ProfilePage from './Profile.jsx';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PersistLogin from './PersistLogin.jsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PersistLogin />}>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/post" element={<PostPage />} />
                    <Route path="/profile/:id" element={<ProfilePage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;