import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_URL

const getToday = () => {
  const today = new Date()
  const yyyy = today.getFullYear()
  const mm = String(today.getMonth() + 1).padStart(2, "0")
  const dd = String(today.getDate()).padStart(2, "0")
  return `${yyyy}-${mm}-${dd}`
}

const fetchReport = async (
  type: string,
  params: any = {}
) => {
  const date = params.backdate || getToday()

  // 🔥 buang backdate dari query (karena sudah di URL)
  const { backdate, ...rest } = params

  const res = await axios.get(
    `${BASE_URL}/reporting/${date}`,
    {
      params: {
        ...(type && { type }),
        ...rest
      }
    }
  )

  return res.data // ⬅️ ini langsung array
}

export const fetchSummaryBedahCounter = async (params: {}) => {
    return fetchReport("r_stock_in_out", params)
}