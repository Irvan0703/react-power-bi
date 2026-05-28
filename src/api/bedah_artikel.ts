import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_URL

const getToday = () => {
  const today = new Date()
  const yyyy = today.getFullYear()
  const mm = String(today.getMonth() + 1).padStart(2, "0")
  const dd = String(today.getDate()).padStart(2, "0")
  return `${yyyy}-${mm}-${dd}`
}

export const fetchBedahArtikel = async (
  type: string,
  params: any = {}
) => {
  const date = params.backdate || getToday()

  // 🔥 buang backdate dari query (karena sudah di URL)
  const { backdate, ...rest } = params

  const res = await axios.get(
    `${BASE_URL}/bedahartikel/${date}`,
    {
      params: {
        ...(type && { type }),
        ...rest
      }
    }
  )

  return res.data // ⬅️ ini langsung array
}

export const getListArtikel = async (params = {}) => {
    return fetchBedahArtikel("get_art", {
        ...params
    })
}

export const fetcDetailArtikel = async(params : {}) => {
    return fetchBedahArtikel("supp_ob_art", {
        ...params
    })
}


const postBedahArtikel = async (
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
    `${BASE_URL}/bedahartikel/${date}`,
    payload
  )

  return res.data // ⬅️ ini langsung array
}

export const postDraftOB = async (params: {}) => {
  return postBedahArtikel("ob_art", params)
}