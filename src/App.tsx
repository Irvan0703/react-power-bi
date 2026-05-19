import { BrowserRouter, Route, Routes } from "react-router-dom"
import FormStockPage from "./pages/FormStockPage"
import "bootstrap/dist/css/bootstrap.min.css"
import StockPage from "./pages/StockPage"
import FormBedahCounterPage from "./pages/FormBedahCounter"
import BedahCounterPage from "./pages/BedahConterPage"
import Test from "./pages/size"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test" element={<Test/>}/>
        <Route path="/" element={<FormStockPage />}/>
        <Route path="/stock" element={<StockPage />} />

        <Route path="/bedah-counter" element={<FormBedahCounterPage/>}/>
        <Route path="/bedah-counter/action" element={<BedahCounterPage/>}/>
      </Routes>
    </BrowserRouter>
  
)
}

export default App