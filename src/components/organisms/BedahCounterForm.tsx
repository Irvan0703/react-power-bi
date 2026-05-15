import { useEffect, useState } from "react";
import Button from "../atoms/Button";
import DatePickerField from "../molecules/DatePickerField";
import MultiSelectField from "../molecules/MultiSelectField"
import { useNavigate, useSearchParams } from "react-router-dom";

type Option = { label: string; value: string }

type Props = {
  tokoOptions: Option[]
}

export default function BedahCounterForm ({ tokoOptions }: Props) {
    const [selectedToko, setSelectedToko] = useState<Option[]>([])
  const [date, setDate] = useState<Date | null>(new Date())
  const [salesStart, setSalesStart] = useState<Date | null>(new Date())
  const [salesEnd, setSalesEnd] = useState<Date | null>(new Date())
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
      }, [])

    return (
        <div className="card p-4">
          <h3 className="text-center">Form Cek Stok</h3>
    
          <MultiSelectField
            options={tokoOptions}
            value={selectedToko}
            onChange={setSelectedToko}
          />
    
          <label>Tanggal Stock</label>
          <DatePickerField value={date} onChange={setDate} />
    
          <label>Sales Start</label>
          <DatePickerField value={salesStart} onChange={setSalesStart} />
    
          <label>Sales End</label>
          <DatePickerField value={salesEnd} onChange={setSalesEnd} />
    
          <Button onClick={handleSubmit}>Cek Stok</Button>
          </div>
      )
}