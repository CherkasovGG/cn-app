import './App.css';
import './global.css';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import SignUpPage from './Pages/SignUpPage/SignUpPage';
import SignInPage from './Pages/SignInPage/SignInPage';
// import WorkSpace from './Pages/WorkSpace/WorkSpace';
// import AccountPage from './Pages/AccountPage/AccountPage';
import AppPage from './Pages/AppPage/AppPage';
import { setAuthToken, verifyToken } from './client/auth';
import RouteGuard from './components/RouteGuard/RouteGuard';
import { useEffect, useState } from 'react';


const App = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const func = async () => {
      const token = localStorage.getItem("token");
    
      const verify = await verifyToken(token);

      console.log("verify: ");
      console.log(verify);

      if (token && verify) {
          setAuthToken(token);
      } else {
        localStorage.removeItem("token");
      }

      setReady(true);
    }

    func();
  }, []);

  if (!ready) {
    return <div>Loading...</div>;
  }

  return (
      <Router>
        <div className="App">
          <Routes>
            <Route path='auth/signup' element={<SignUpPage />}/>
            <Route path='auth/signin' element={<SignInPage />}/>

            <Route path='app/*' element={
              <RouteGuard>
                <AppPage />
              </RouteGuard>
            } />
              {/* <Route path='page/:pageId' element={<WorkSpace />}/>
              <Route path='page/' element={<WorkSpace />}/>
              <Route path='account' element={<AccountPage />}/> */}
            {/* <Route path='*' element={<Navigate to="/app/page/" />}/> */}
          </Routes>
        </div>
      </Router>
  );
}

export default App;
