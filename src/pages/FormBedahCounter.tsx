import { useEffect, useState } from "react"
import { fetchToko } from "../api/stok_dasboard"
import BedahCounterForm from "../components/organisms/BedahCounterForm";
import Button from "../components/atoms/Button";

type Option = { label: string; value: string }

export default function FormBedahCounterPage() {
  const [tokoOptions, setTokoOptions] = useState<Option[]>([])

  useEffect(() => {
    const subid = new URLSearchParams(window.location.search).get("subid")

    if (!subid) {
        window.location.href = "/login"
        return
    }

    // 🔹 TOKO
    fetchToko(subid).then((res) => {
        const list = Array.isArray(res) ? res : []

        const options = list.map((item: string) => {
        const [code] = item.split(" - ")
        return {
            value: code.trim(),
            label: item
        }
        })

        setTokoOptions(options)
    })
    }, [])

  return (
    <div className="container mt-5">
      <BedahCounterForm tokoOptions={tokoOptions} />
      <Button>Summary Bedah Counter</Button>
      <Button>Repeat Order</Button>
      <Button>Import Table</Button>
    </div>
  )
}