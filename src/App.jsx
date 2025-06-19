import './App.css'
import { useRoutes } from 'react-router-dom'
import { routes } from './routes'
import { Toaster } from 'react-hot-toast'

function App() {
const elements=useRoutes(routes)

  return (
    <>
      
      {elements}
      <Toaster position='bottom-right' reverseOrder={false}/>
    </>
  )
}

export default App
