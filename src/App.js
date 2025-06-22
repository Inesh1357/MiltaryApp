import {Switch, Route, Redirect} from 'react-router-dom'
import {Component} from 'react'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Signup from './components/Signup'
import PatientDashboard from './components/PatientDashboard'
import CaretakerDashboard from './components/CaretakerDashboard'
import AddMedication from './components/AddMedication'
import MedicationList from './components/MedicationList'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAuthenticated: false,
      role: '', // 'patient' or 'caretaker'
    }
  }

  loginUser = role => {
    this.setState({isAuthenticated: true, role})
  }

  logoutUser = () => {
    this.setState({isAuthenticated: false, role: ''})
  }

  render() {
    const {isAuthenticated, role} = this.state

    return (
      <div className="App">
        <Switch>
          <ProtectedRoute exact path="/">
            role === `patient` ? (
            <Redirect to="/patient-dashboard" />
            ) : (
            <Redirect to="/caretaker-dashboard" />) )
          </ProtectedRoute>

          <Route
            path="/login"
            render={props => <Login {...props} loginUser={this.loginUser} />}
          />

          <Route
            path="/signup"
            render={props => <Signup {...props} loginUser={this.loginUser} />}
          />

          <Route path="/patient-dashboard">
            {isAuthenticated && role === 'patient' ? (
              <PatientDashboard logout={this.logoutUser} />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route path="/caretaker-dashboard">
            {isAuthenticated && role === 'caretaker' ? (
              <CaretakerDashboard logout={this.logoutUser} />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route path="/add-medication" component={AddMedication} />
          <Route path="/medications" component={MedicationList} />
        </Switch>
      </div>
    )
  }
}

export default App
