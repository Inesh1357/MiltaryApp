import {Component} from 'react'
import axios from 'axios'
import './index.css'

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      role: 'patient',
      error: '',
    }
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = async e => {
    const {history, loginUser} = this.props
    e.preventDefault()
    const {username, password, role} = this.state
    try {
      const response = await axios.post('/api/signup', {
        username,
        password,
        role,
      })
      if (response.data.success) {
        loginUser(role)
        history.push('/')
      } else {
        this.setState({error: response.data.message})
      }
    } catch (err) {
      this.setState({error: 'Signup failed. Try again later.'})
    }
  }

  render() {
    const {username, password, role, error} = this.state

    return (
      <div className="signup-container">
        <h2>Sign Up</h2>
        <form className="signup-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Username"
            onChange={this.handleChange}
            required
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={this.handleChange}
            required
          />
          <select name="role" value={role} onChange={this.handleChange}>
            <option value="patient">Patient</option>
            <option value="caretaker">Caretaker</option>
          </select>
          <button type="submit">Sign Up</button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    )
  }
}

export default Signup
