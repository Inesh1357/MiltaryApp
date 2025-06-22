import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class CaretakerDashboard extends Component {
  render() {
    const {logout} = this.props
    const logoutOn = () => {
      logout()
    }
    return (
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h2>Caretaker Dashboard</h2>
          <button onClick={logoutOn} className="logout-btn" type="button">
            Logout
          </button>
        </header>
        <div className="dashboard-content">
          <Link to="/patients" className="dashboard-card">
            <h3>Manage Patients</h3>
            <p>View and manage assigned patients</p>
          </Link>
          <Link to="/medications" className="dashboard-card">
            <h3>Monitor Medications</h3>
            <p>Track patient medication status</p>
          </Link>
        </div>
      </div>
    )
  }
}

export default CaretakerDashboard
