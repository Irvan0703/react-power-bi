import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_URL

export const fetchToko = async (subid: string) => {
  const res = await axios.get(`${BASE_URL}/stocks/toko?subid=${subid}`)
  return res.data
}

const getToday = () => {
  const today = new Date()
  const yyyy = today.getFullYear()
  const mm = String(today.getMonth() + 1).padStart(2, "0")
  const dd = String(today.getDate()).padStart(2, "0")
  return `${yyyy}-${mm}-${dd}`
}

export const fetchStockDashboard = async (
  type: string,
  params: any = {}
) => {
  const date = params.backdate || getToday()

  // 🔥 buang backdate dari query (karena sudah di URL)
  const { backdate, ...rest } = params

  const res = await axios.get(
    `${BASE_URL}/stockDasboard/${date}`,
    {
      params: {
        ...(type && { type }),
        ...rest
      }
    }
  )

  return res.data // ⬅️ ini langsung array
}

export const fetchSPV = async () => {
  return fetchStockDashboard("list_spv")
}

export const fetchAlokator = async () => {
  return fetchStockDashboard("list_alokator")
}

export const fetchFilterToko = async (params: any) => {
  return fetchStockDashboard("list_toko", params)
}

export const exportExcel = async (params: any) => {
  const response = await axios.get(`${BASE_URL}/export-awal`, {
    params,
    responseType: "blob", // 🔥 penting untuk file
  })

  return response.data
}

export const fetchStok = async (params:any) => {
  return fetchStockDashboard("", params)
}

export const fetchSumCategory = async (params:any) => {
  return fetchStockDashboard("sum", params)
}