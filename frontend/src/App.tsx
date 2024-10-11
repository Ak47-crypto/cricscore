
// import './App.css'
import Admin from './component/Admin'
import { MyProvider } from './context/SiteContext'
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <MyProvider>
     <Admin/>
     </MyProvider>
    </>
  )
}

export default App
