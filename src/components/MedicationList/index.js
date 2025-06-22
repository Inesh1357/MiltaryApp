import {Component} from 'react'
import axios from 'axios'
import './index.css'

class MedicationList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      medications: [],
      errorMessage: '',
    }
  }

  componentDidMount() {
    this.fetchMedications()
  }

  fetchMedications = async () => {
    try {
      const response = await axios.get('/api/medications')
      if (response.data.success) {
        this.setState({medications: response.data.medications})
      } else {
        this.setState({errorMessage: 'No medications found.'})
      }
    } catch (err) {
      this.setState({errorMessage: 'Failed to fetch medications.'})
    }
  }

  markAsTaken = async id => {
    try {
      await axios.patch(`/api/medications/${id}/taken`)
      this.fetchMedications()
    } catch (err) {
      this.setState({errorMessage: 'Failed to update medication status.'})
    }
  }

  render() {
    const {medications, errorMessage} = this.state

    return (
      <div className="medication-list-container">
        <h2>Your Medications</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <ul className="medication-list">
          {medications.map(med => (
            <li key={med.id} className="medication-item">
              <div>
                <strong>{med.name}</strong> - {med.dosage} ({med.frequency})
              </div>
              <button
                className="mark-btn"
                onClick={() => this.markAsTaken(med.id)}
                disabled={med.takenToday}
                type="button"
              >
                {med.takenToday ? 'Taken' : 'Mark as Taken'}
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default MedicationList
