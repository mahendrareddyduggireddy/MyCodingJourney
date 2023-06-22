import {Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import './App.css'

import Login from './components/Login'
import Jobs from './components/Jobs'
import NotFound from './components/NotFound'
import JobItem from './components/JobItem'
import ProtectedRoute from './components/ProtectedRoute'
// These are the lists used in the application. You can move them to any component needed.

// Replace your code here

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <ProtectedRoute path="/jobs/:id" component={JobItem} />
    <ProtectedRoute path="/not-found" component={NotFound} />
    <Route component={NotFound} />
  </Switch>
)

export default App
