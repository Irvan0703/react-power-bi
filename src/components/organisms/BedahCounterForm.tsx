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
  const [selectedToko, setSelectedToko] = useState<string[]>([])
  const [date, setDate] = useState<Date | null>(new Date())
  const [salesStartLastYear, setSalesStartLastYear] = useState<Date | null>(new Date())
  const [salesEndLastYear, setSalesEndLastYear] = useState<Date | null>(new Date())
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
      toko: selectedToko.join(","),
      backdate: date?.toISOString().slice(0, 10) || "",
      start: salesStart?.toISOString().slice(0, 10) || "",
      end: salesEnd?.toISOString().slice(0, 10) || "",
      start_last: salesStartLastYear?.toISOString().slice(0, 10) || "",
      end_last: salesEndLastYear?.toISOString().slice(0, 10) || ""
    })

    navigate(`/bedah-counter/action?${params.toString()}`)
  }

    useEffect(() => {
      if (!subid) {
          window.location.href = "/login"
          return
      }

      const today = new Date()

      // =========================
      // Tahun ini
      // =========================

      // akhir = hari ini
      const thisYearEnd = new Date(today)

      // awal = hari ini - 3 bulan
      const thisYearStart = new Date(today)
      thisYearStart.setMonth(
        thisYearStart.getMonth() - 3
      )

      setSalesStart(thisYearStart)
      setSalesEnd(thisYearEnd)

      // =========================
      // Tahun lalu
      // =========================

      // awal tahun lalu = tanggal awal tahun ini -1 tahun
      const lastYearStart = new Date(
        thisYearEnd
      )
      lastYearStart.setFullYear(
        lastYearStart.getFullYear() - 1
      )

      // akhir tahun lalu = tanggal akhir tahun ini -1 tahun
      const lastYearEnd = new Date(
        thisYearEnd
      )
      lastYearEnd.setFullYear(
        lastYearEnd.getFullYear() - 1
      )
      lastYearEnd.setMonth(
        lastYearEnd.getMonth() + 3
      )

      setSalesStartLastYear(lastYearStart)
      setSalesEndLastYear(lastYearEnd)

      // backdate
      setDate(today)
    }, [])

    return (
        <div className="card p-4">
          <h3 className="text-center">Form Bedah Counter</h3>
    
          <MultiSelectField
            options={tokoOptions}
            value={selectedToko}
            onChange={setSelectedToko}
            returnType="label"
          />
        
          <label>Tanggal Stock</label>
          <DatePickerField value={date} onChange={setDate} />

          <h5>Periode Tahun Lalu</h5>
    
          <label>Tanggal Awal</label>
          <DatePickerField value={salesStartLastYear} onChange={setSalesStartLastYear} />
    
          <label>Tanggal Akhir</label>
          <DatePickerField value={salesEndLastYear} onChange={setSalesEndLastYear} />
          <h5>Periode Tahun ini</h5>
    
          <label>Tanggal Awal</label>
          <DatePickerField value={salesStart} onChange={setSalesStart} />
    
          <label>Tanggal Akhir</label>
          <DatePickerField value={salesEnd} onChange={setSalesEnd} />
    
          <Button onClick={handleSubmit}>Bedah Counter</Button>
          </div>
      )
}