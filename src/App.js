import {Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import MiltaryAssetManagement from './components/MiltaryAssetManagement'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={MiltaryAssetManagement} />
  </Switch>
)

export default App
