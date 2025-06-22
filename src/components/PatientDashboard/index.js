import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class PatientDashboard extends Component {
  render() {
    const {logout} = this.props
    return (
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h2>Patient Dashboard</h2>
          <button onClick={logout} className="logout-btn" type="button">
            Logout
          </button>
        </header>
        <div className="dashboard-content">
          <Link to="/add-medication" className="dashboard-card">
            <h3>Add Medication</h3>
            <p>Add new medications to your daily routine</p>
          </Link>
          <Link to="/medications" className="dashboard-card">
            <h3>View Medications</h3>
            <p>Track your medications and adherence</p>
          </Link>
        </div>
      </div>
    )
  }
}

export default PatientDashboard
