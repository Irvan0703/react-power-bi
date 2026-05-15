import { useEffect, useState } from "react"
import { fetchStockDashboard } from "../api/stok_dasboard"

type Option = {
  label: string
  value: string
}

type Params = {
  type: string
  backdate?: string
  alokator?: string
  spv?: string
  list_selected?: string
}

export const useStockDashboard = (params: Params) => {
  const [data, setData] = useState<Option[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      // 🔥 kalau butuh filter tapi belum ada value → skip
      if (
        params.type === "list_toko" &&
        !params.alokator &&
        !params.spv
      ) {
        setData([])
        return
      }

      setLoading(true)
      setError(null)

      try {
        const res = await fetchStockDashboard(params.type, params)

        const list = Array.isArray(res) ? res : []

        const mapped = list.map((row: any) => {
          // 🔥 handle berbagai bentuk response
          if (row.fv_toko) {
            return {
              label: row.fv_toko,
              value: row.fc_code
            }
          }

          if (row.fv_spv) {
            return {
              label: row.fv_spv,
              value: row.fv_spv
            }
          }

          if (row.fv_alokator) {
            return {
              label: row.fv_alokator,
              value: row.fv_alokator
            }
          }

          // fallback kalau array
          return {
            label: row[0],
            value: row[0]
          }
        })

        setData(mapped)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [
    params.type,
    params.backdate,
    params.alokator,
    params.spv,
    params.list_selected
  ])

  return {
    data,
    loading,
    error
  }
}