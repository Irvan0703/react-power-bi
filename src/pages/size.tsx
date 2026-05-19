import { useEffect, useState } from "react"
import Navbar from "../components/organisms/NavBar"
import { fetchCategory, fetchOrnal } from "../api/bedah_counter"

export default function Test() {
  const [windowSize, setWindowSize] =
    useState({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    const [loading, setLoading] = useState(false)
    const [ornal2024, setOrnal2024] = useState([])
    const [ornal2025, setOrnal2025] = useState([])
    const [ornalOU, setOrnalOU] = useState([])
    const [category2024, setCategory2024] = useState([])
    const [category2025, setCategory2025] = useState([])
    const [categoryOU, setCategoryOU] = useState([])
    const [selectedOrnal, setSelectedOrnal] = useState("")
    const [selectedDivisi, setSelectedDivisi] = useState("")

  useEffect(() => {
    const handleResize = () => {
      const size = {
        width: window.innerWidth,
        height: window.innerHeight,
      }

      console.log("RESIZE:", size)

      setWindowSize(size)
    }

    window.addEventListener(
      "resize",
      handleResize
    )

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      )
    }
  }, [])

  const loadData = async () => {
    try {
        setLoading(true)

        const res = await fetchOrnal({
            toko: "MD150",
            end: "2026-02-14",
        })

        setOrnal2024(res.last_year || [])
        setOrnal2025(res.this_year || [])
        setOrnalOU(res.ou || [])

        const resCat = await fetchCategory({
            toko: "MD150",
            end: "2026-02-14",
        })

        setCategory2024(resCat.last_year || [])
        setCategory2025(resCat.this_year || [])
        setCategoryOU(resCat.ou || [])
    } catch (err) {
        console.error(err)
    } finally {
        setLoading(false)
    }
}

  return (
    <div>
      <h1>
        {windowSize.width} x{" "}
        {windowSize.height}
      </h1>
      <Navbar
        judulToko="MD255 - MALANG"
        divisi={selectedDivisi}
        ornal={selectedOrnal}
        selectedOrnal={selectedOrnal}
        selectedDivisi={selectedDivisi}
        onChangeOrnal={setSelectedOrnal}
        onChangeDivisi={setSelectedDivisi}
        onApply={loadData}
        />
    </div>
  )
}