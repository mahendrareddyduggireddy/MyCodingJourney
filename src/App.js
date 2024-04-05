import './App.css'
import ProjectShowcase from './Components/projectShows'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

// Replace your code here
const App = () => (
  <div className="app-container">
    <ProjectShowcase list={categoriesList} />
  </div>
)

export default App
