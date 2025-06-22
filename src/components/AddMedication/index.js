import {Component} from 'react'
import axios from 'axios'
import './index.css'

class AddMedication extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      dosage: '',
      frequency: '',
      successMessage: '',
      errorMessage: '',
    }
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = async e => {
    e.preventDefault()
    const {name, dosage, frequency} = this.state
    try {
      const response = await axios.post('/api/medications', {
        name,
        dosage,
        frequency,
      })
      if (response.data.success) {
        this.setState({
          name: '',
          dosage: '',
          frequency: '',
          successMessage: 'Medication added successfully!',
          errorMessage: '',
        })
      } else {
        this.setState({errorMessage: response.data.message})
      }
    } catch (err) {
      this.setState({errorMessage: 'Failed to add medication.'})
    }
  }

  render() {
    const {name, dosage, frequency, successMessage, errorMessage} = this.state

    return (
      <div className="add-medication-container">
        <h2>Add Medication</h2>
        <form className="add-medication-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Medication Name"
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            name="dosage"
            value={dosage}
            placeholder="Dosage (e.g., 500mg)"
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            name="frequency"
            value={frequency}
            placeholder="Frequency (e.g., twice a day)"
            onChange={this.handleChange}
            required
          />
          <button type="submit">Add Medication</button>
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    )
  }
}

export default AddMedication
