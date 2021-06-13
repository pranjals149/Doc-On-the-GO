import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Food from "./Components/Food/Food";
import Guidelines from "./Components/Guidelines/Guidelines";
import Header from "./Components/Header/Header";
import Helpline from "./Components/Helpline/Helpline";
import Home from "./Components/Home/Home";
import Hospitals from "./Components/Hospitals/Hospitals";
import Login from "./Components/Login/Login";
import Medicines from "./Components/Medicines/Medicines";
import Oxygen from "./Components/Oxygen/Oxygen";
import Resources from "./Components/Resources/Resources";
import Symptoms from "./Components/Symptoms/Symptoms";
import Volunteer from "./Components/Volunteer/Volunteer";
import ExpertLogin from './Components/ExpertLogin/ExpertLogin'
import ExpertReg from "./Components/ExpertReg/ExpertReg";
import UserReport from "./Components/UserReport/UserReport";
import FetchReports from "./Components/FetchReports/FetchReports";
import Dashboard from "./Components/Dashboard/Dashboard"
import SearchReport from "./Components/SearchReport/SearchReport"

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ExpertHeader from "./Components/ExpertHeader/ExpertHeader";
import { selectUserName, setUserLoginDetails } from "./features/user/userSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { selectExpertEmail, setExpertLoginDetails } from "./features/expert/expertSlice";
import AllExperts from "./Components/AllExperts/AllExperts";
import Appointments from "./Components/Appointments/Appointments";
import ExpertAppointments from "./Components/ExpertAppointments/ExpertAppointments";
import Prescriptions from "./Components/Prescriptions/Prescriptions";


function App() {

  const username = useSelector(selectUserName)
  const expertEmail = useSelector(selectExpertEmail)

  const dispatch = useDispatch()

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user)
        // history.push('/home')
      }
    })
  }, [username])

  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL
      })
    )
  }

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setExpertUser(user)
        // history.push('/home')
      }
    })
  }, [expertEmail])

  const setExpertUser = (user) => {
    dispatch(
      setExpertLoginDetails({
        id: user.uid,
        email: user.email,
      })
    )
  }

  return (
    <div className="App">
      <Router>
        <ToastContainer />

        <Switch>

          {(username) ? (
            <>
              <Route exact path="/">
                <Login />
              </Route>

              <Route exact path="/home">
                <Header />
                <Home />
              </Route>

              <Route exact path="/symptoms">
                <Header />
                <Symptoms />
              </Route>

              <Route exact path="/resources">
                <Header />
                <Resources />
              </Route>

              <Route exact path="/guidelines">
                <Header />
                <Guidelines />
              </Route>

              <Route exact path="/volunteer">
                <Header />
                <Volunteer />
              </Route>

              <Route exact path="/helpline">
                <Header />
                <Helpline />
              </Route>

              <Route exact path="/hospitals">
                <Header />
                <Hospitals />
              </Route>

              <Route exact path="/medicines">
                <Header />
                <Medicines />
              </Route>

              <Route exact path="/oxygen">
                <Header />
                <Oxygen />
              </Route>

              <Route exact path="/food">
                <Header />
                <Food />
              </Route>

              <Route exact path="/userReport">
                <Header />
                <UserReport />
              </Route>

              <Route exact path="/fetchReports">
                <Header />
                <FetchReports />
              </Route>

              <Route exact path="/allExperts">
                <Header />
                <AllExperts />
              </Route>

              <Route exact path="/appointments">
                <Header />
                <Appointments />
              </Route>

              <Route exact path="/prescriptions">
                <Header />
                <Prescriptions />
              </Route>
            </>
          ) : (
            <>
              <Route exact path="/">
                <Login />
              </Route>
            </>
          )}

        </Switch>

        {/* <Switch>

          {(expertEmail) ? (
            <>
              <Route exact path='/expertReg'>
                <ExpertReg />
              </Route>

              <Route exact path='/expertLogin'>
                <ExpertLogin />
              </Route>

              <Route exact path='/dashboard'>
                <ExpertHeader />
                <Dashboard />
              </Route>

              <Route exact path='/expertAppointments'>
                <ExpertHeader />
                <ExpertAppointments />
              </Route>

            </>
          ) :
            <>
              <Route exact path='/expertReg'>
                <ExpertReg />
              </Route>

              <Route exact path='/expertLogin'>
                <ExpertLogin />
              </Route>
            </>
          }

        </Switch> */}
      </Router>
    </div>
  );
}

export default App;
