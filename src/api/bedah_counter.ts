import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_URL

const getToday = () => {
  const today = new Date()
  const yyyy = today.getFullYear()
  const mm = String(today.getMonth() + 1).padStart(2, "0")
  const dd = String(today.getDate()).padStart(2, "0")
  return `${yyyy}-${mm}-${dd}`
}

export const fetchBedahCounter = async (
  type: string,
  params: any = {}
) => {
  const date = params.backdate || getToday()

  // 🔥 buang backdate dari query (karena sudah di URL)
  const { backdate, ...rest } = params

  const res = await axios.get(
    `${BASE_URL}/bedahcounter/${date}`,
    {
      params: {
        ...(type && { type }),
        ...rest
      }
    }
  )

  return res.data // ⬅️ ini langsung array
}

export const fetchOrnal = async (params = {}) => {
  return fetchBedahCounter("summary", {
    core: "fv_ornal",
    ...params
  })
}

export const fetchSales = async (params = {}) => {
    return fetchBedahCounter("sales", {
    ...params
  })
}

export const fetchCategory = async (params = {}) => {
    return fetchBedahCounter("summary", {
    ...params
  })
}

export const fetchHistory = async (params = {}) => {
  return fetchBedahCounter("summary_hist", {
    ...params
  })
}