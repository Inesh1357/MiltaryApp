import {Component} from 'react'
import axios from 'axios'
import './index.css'

class MiltaryAssetManagement extends Component {
  state = {
    openingBalance: 0,
    closingBalance: 0,
    netMovement: 0,
    assignedAssets: 0,
    expendedAssets: 0,
    showModal: false,
    netMovementDetails: {},
    filters: {
      dateRange: '2025-01-01 to 2025-06-01',
      base: '',
      equipmentType: '',
    },
  }

  componentDidMount() {
    this.fetchMetrics()
  }

  fetchMetrics = () => {
    // Placeholder API call
    const {filters} = this.state
    axios
      .get('http://localhost:5000/api/dashboard-metrics', {params: filters})
      .then(res => {
        this.setState({
          openingBalance: res.data.openingBalance,
          closingBalance: res.data.closingBalance,
          netMovement: res.data.netMovement,
          assignedAssets: res.data.assignedAssets,
          expendedAssets: res.data.expendedAssets,
        })
      })
  }

  toggleModal = () => {
    const {showModal, filters} = this.state
    if (!showModal) {
      axios
        .get('http://localhost:5000/api/net-movement-details', {
          params: filters,
        })
        .then(res => {
          this.setState({netMovementDetails: res.data})
        })
    }
    this.setState({showModal: !showModal})
  }

  handleFilterChange = e => {
    const {name, value} = e.target
    this.setState(
      prevState => ({
        filters: {
          ...prevState.filters,
          [name]: value,
        },
      }),
      this.fetchMetrics,
    )
  }

  render() {
    const {
      openingBalance,
      closingBalance,
      netMovement,
      assignedAssets,
      expendedAssets,
      showModal,
      netMovementDetails,
    } = this.state
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-100 p-4 rounded-xl">
            Opening Balance: {openingBalance}
          </div>
          <div className="bg-gray-100 p-4 rounded-xl">
            Closing Balance: {closingBalance}
          </div>
          <div className="bg-gray-100 p-4 rounded-xl cursor-pointer">
            Net Movement: {netMovement}
          </div>
          <div className="bg-gray-100 p-4 rounded-xl">
            Assigned Assets: {assignedAssets}
          </div>
          <div className="bg-gray-100 p-4 rounded-xl">
            Expended Assets: {expendedAssets}
          </div>
        </div>

        {showModal && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-xl w-1/2">
              <h2 className="text-xl font-bold mb-4">Net Movement Breakdown</h2>
              <p>
                <strong>Purchases:</strong> {netMovementDetails.purchases || 0}
              </p>
              <p>
                <strong>Transfers In:</strong>{' '}
                {netMovementDetails.transfersIn || 0}
              </p>
              <p>
                <strong>Transfers Out:</strong>{' '}
                {netMovementDetails.transfersOut || 0}
              </p>
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-xl"
                onClick={this.toggleModal}
                type="button"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default MiltaryAssetManagement
