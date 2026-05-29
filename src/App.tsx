import { BrowserRouter, Route, Routes } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import FormBedahCounterPage from "./pages/bedah counter/FormBedahCounter"
import BedahCounterPage from "./pages/bedah counter/BedahConterPage"
import Test from "./pages/size"
import SummaryBedahCounter from "./pages/bedah counter/SummaryBedahCounter"
import FormStockPage from "./pages/stok artikel/FormStockPage"
import StockPage from "./pages/stok artikel/StockPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test" element={<Test/>}/>
        <Route path="/" element={<FormStockPage />}/>
        <Route path="/stock" element={<StockPage />} />

        <Route path="/bedah-counter" element={<FormBedahCounterPage/>}/>
        <Route path="/bedah-counter/action" element={<BedahCounterPage/>}/>
        <Route path="/report/summary-bedah-counter" element={<SummaryBedahCounter/>}/>
      </Routes>
    </BrowserRouter>
  
)
}

export default App