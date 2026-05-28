import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_URL

const getToday = () => {
  const today = new Date()
  const yyyy = today.getFullYear()
  const mm = String(today.getMonth() + 1).padStart(2, "0")
  const dd = String(today.getDate()).padStart(2, "0")
  return `${yyyy}-${mm}-${dd}`
}

export const fetchReturMutasi = async (
  type: string,
  params: any = {}
) => {
  const date = params.backdate || getToday()

  // 🔥 buang backdate dari query (karena sudah di URL)
  const { backdate, ...rest } = params

  const res = await axios.get(
    `${BASE_URL}/returMutasi/${date}`,
    {
      params: {
        ...(type && { type }),
        ...rest
      }
    }
  )

  return res.data // ⬅️ ini langsung array
}

export const fetchMutasi = async (params : {}) => {
    return fetchReturMutasi("mutasiIn",{
        ...params
    })
}

export const fetchGudang = async (params: {}) => {
    return fetchReturMutasi("stock_wh", {
        add: "po",
        ...params
    })
}

export const fetchDraftOB = async (params: {}) => {
  return fetchReturMutasi("draft_ob", {
    ...params
  })
}

const postReturMutasi = async (
  type: string,
  params: any = {}
) => {
  const date = params.backdate || getToday()

  // 🔥 buang backdate dari query (karena sudah di URL)
  const { backdate, ...rest } = params

  const payload = {
    ...(type && { type }),
    ...rest,
  }

  const res = await axios.post(
    `${BASE_URL}/returMutasi/${date}`,
    payload
  )

  return res.data // ⬅️ ini langsung array
}

export const postSessionOrder = async (params : {}) => {
    return postReturMutasi("session", params)
}

export const postDraft = async (params: {}) => {
  return postReturMutasi("draft_mutasi_in", params)
}

export const postRetur = async(params: {}) => {
  return postReturMutasi("retur", params)
}

export const postMutasi = async(params: {}) => {
  return postReturMutasi("mutasi", params)
}

export const postOrderBooking = async(params: {}) => {
  return postReturMutasi("order_booking", params)
}