import { BrowserRouter, Route, Routes } from "react-router-dom"
import FormStockPage from "./pages/FormStockPage"
import "bootstrap/dist/css/bootstrap.min.css"
import StockPage from "./pages/StockPage"
import FormBedahCounterPage from "./pages/FormBedahCounter"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormStockPage />}/>
        <Route path="/stock" element={<StockPage />} />
        <Route path="/bedah-counter" element={<FormBedahCounterPage/>}/>
      </Routes>
    </BrowserRouter>
  
)
}

export default App