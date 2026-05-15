import { useEffect, useState } from "react"
import SelectField from "../atoms/Select"
import MultiSelectField from "../molecules/MultiSelectField"
import DatePickerField from "../molecules/DatePickerField"
import Button from "../atoms/Button"
import { exportExcel, fetchFilterToko } from "../../api/stok_dasboard"
import { format } from "date-fns"

type Option = { label: string; value: string }

type Props = {
  alokatorOptions: Option[]
  spvOptions: Option[]
  tokoOptions: Option[]
  onClose: () => void
}

export default function ExportModal({
  alokatorOptions,
  spvOptions,
  tokoOptions,
  onClose
}: Props) {
  const [alokator, setAlokator] = useState<Option | null>(null)
  const [spv, setSpv] = useState<Option | null>(null)
  const [toko, setToko] = useState<Option[]>([])
  const [date, setDate] = useState<Date | null>(new Date())
  const [salesStart, setSalesStart] = useState<Date | null>(new Date())
  const [salesEnd, setSalesEnd] = useState<Date | null>(new Date())
  const [tokoOptionsState, setTokoOptionsState] = useState<Option[]>([])
  const [loadingToko, setLoadingToko] = useState(false)

  const isSpvDisabled = !!alokator
  const isAlokatorDisabled = !!spv

  useEffect(() => {
    const loadToko = async () => {
      if (!date) return
      if (!alokator && !spv) {
        setTokoOptionsState(tokoOptions)
        setToko([]) // reset pilihan
        return
      }

      try {
        setLoadingToko(true)
        
        const params: any = {
          backdate: format(date, "yyyy-MM-dd"),
        }

        if (alokator) {
          params.alokator = alokator.value
          params.list_selected = "alokator"
        }

        if (spv) {
          params.spv = spv.value
          params.list_selected = "spv"
        }

        const res = await fetchFilterToko(params)

        const list = Array.isArray(res) ? res : []

        const options = list.map((row: any) => ({
          label: row.fv_toko,
          value: row.fc_code
        }))

        setTokoOptionsState(options) // ✅ data dropdown
        setToko([])             // ✅ reset pilihan

      } catch (err) {
        console.error("Gagal load toko:", err)
      } finally {
        setLoadingToko(false) // ✅ FIX
      }
    }

    loadToko()
  }, [alokator, spv, date, tokoOptions])

  const handleExport = async () => {
    if (!date) {
      alert("Tanggal wajib diisi")
      return
    }

    try {
      const params: any = {
        backdate: date.toISOString().slice(0, 10),
      }

      if (alokator) params.alokator = alokator.value
      if (spv) params.spv = spv.value
      if (salesStart) params.sales_start = salesStart.toISOString().slice(0, 10)
      if (salesEnd) params.sales_end = salesEnd.toISOString().slice(0, 10)
      if (toko.length > 0) {
        params.toko = toko.map(t => t.value).join(",")
      }

      const blob = await exportExcel(params)

      // 🔥 Download file
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", "stok.xlsx")
      document.body.appendChild(link)
      link.click()
      link.remove()

    } catch (err) {
      console.error(err)
      alert("Gagal export")
    }
  }

  return (
    <div className="modal d-block" style={{ background: "#00000088" }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content p-3">
          <h5>Export Excel</h5>

          <label>Alokator</label>
          <SelectField
            options={alokatorOptions}
            value={alokator}
            onChange={setAlokator}
            isDisabled={isAlokatorDisabled}
          />

          <label>Supervisor</label>
          <SelectField
            options={spvOptions}
            value={spv}
            onChange={setSpv}
            isDisabled={isSpvDisabled}
          />

          <label>Kode Toko</label>
          <MultiSelectField
            options={tokoOptionsState}
            value={toko}
            onChange={setToko}
          />

          <label>Tanggal Stock</label>
          <DatePickerField value={date} onChange={setDate} />

          <label>Sales Start</label>
          <DatePickerField value={salesStart} onChange={setSalesStart} />

          <label>Sales End</label>
          <DatePickerField value={salesEnd} onChange={setSalesEnd} />

          <div className="mt-3 d-flex gap-2">
            <button className="btn btn-secondary w-50" onClick={onClose}>
              Tutup
            </button>
            <Button variant="success" onClick={handleExport}>
              Export Excel
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}