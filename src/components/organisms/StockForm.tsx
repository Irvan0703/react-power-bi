import { useEffect, useState } from "react"
import MultiSelectField from "../molecules/MultiSelectField"
import DatePickerField from "../molecules/DatePickerField"
import Button from "../atoms/Button"
import ExportModal from "./ExportModal"
import { fetchAlokator, fetchSPV } from "../../api/stok_dasboard"
import { useNavigate, useSearchParams } from "react-router-dom"

type Option = { label: string; value: string }

type Props = {
  tokoOptions: Option[]
}

export default function StockForm({ tokoOptions }: Props) {
  const [selectedToko, setSelectedToko] = useState<Option[]>([])
  const [date, setDate] = useState<Date | null>(new Date())
  const [salesStart, setSalesStart] = useState<Date | null>(new Date())
  const [salesEnd, setSalesEnd] = useState<Date | null>(new Date())
  const [showModal, setShowModal] = useState(false)
  const [alokatorOptions, setAlokatorOptions] = useState<Option[]>([])
  const [spvOptions, setSpvOptions] = useState<Option[]>([])
  const navigate = useNavigate();
  const [searchParams] = useSearchParams()
  const subid = searchParams.get("subid")

  const handleSubmit = () => {
    if (!subid) return

    if (selectedToko.length === 0) {
      alert("Pilih toko dulu")
      return
    }

    const params = new URLSearchParams({
      subid: subid,
      codeToko: selectedToko.map(t => t.value).join(","),
      backdate: date?.toISOString().slice(0, 10) || "",
      sales_start: salesStart?.toISOString().slice(0, 10) || "",
      sales_end: salesEnd?.toISOString().slice(0, 10) || ""
    })

    navigate(`/stock?${params.toString()}`)
  }

  useEffect(() => {
      if (!subid) {
          window.location.href = "/login"
          return
      }
  
      // 🔹 SPV
      fetchSPV()
          .then(data => {
              const options = data.data.map((row: any) => ({
              label: row[0],
              value: row[0]
              }))
              setSpvOptions(options)
          })
          .catch(err => {
              console.error("SPV ERROR:", err)
              
          })
  
      // 🔹 ALOKATOR
      fetchAlokator()
          .then(data => {
          const options = data.data.map((row: any) => ({
              label: row[0],
              value: row[0]
          }))
          setAlokatorOptions(options)
          })
  
      }, [])

  return (
    <div className="card p-4">
      <h3 className="text-center">Form Cek Stok</h3>

      <MultiSelectField
        options={tokoOptions}
        value={selectedToko}
        onChange={setSelectedToko}
        returnType="value"
      />

      <label>Tanggal Stock</label>
      <DatePickerField value={date} onChange={setDate} />

      <label>Sales Start</label>
      <DatePickerField value={salesStart} onChange={setSalesStart} />

      <label>Sales End</label>
      <DatePickerField value={salesEnd} onChange={setSalesEnd} />

      <Button onClick={handleSubmit}>Cek Stok</Button>
      <Button
        onClick={() => setShowModal(true)}
        >
        Export Excel
      </Button>

      {showModal && (
        <ExportModal
            alokatorOptions={alokatorOptions}
            spvOptions={spvOptions}
            tokoOptions={tokoOptions}
            onClose={() => setShowModal(false)}
        />
        )}
    </div>
  )
}