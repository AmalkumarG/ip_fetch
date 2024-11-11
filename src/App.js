import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import Home from './Components/Home';
import { AuthProvider } from './Components/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom';
function App() {
  return (

    <div className="App">
    {/* <Login/> */}
    <AuthProvider>
    <Routes>
        <Route path='/' element={<Login/>}/>
        <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
