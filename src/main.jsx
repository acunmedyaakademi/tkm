import { createRoot } from 'react-dom/client'
import MainPage from './components/MainPage.jsx'
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <>
    <Router>
      <App />
    </Router>
  </>
)
