import { useEffect, useState } from "react"
import { getListArtikel } from "../../api/bedah_artikel"
import SelectField from "../atoms/Select"

type Option = {
  label: string
  value: string
}

type Props = {
  subid: string

  showCategory?: boolean
  showMark?: boolean
  showArtikel?: boolean

  category: Option | null
  mark: Option | null
  artikel: Option | null

  onChangeCategory: (
    val: Option | null
  ) => void

  onChangeMark: (
    val: Option | null
  ) => void

  onChangeArtikel: (
    val: Option | null
  ) => void
}

export default function ArtikelFilterGroup({
  subid,

  showCategory = true,
  showMark = true,
  showArtikel = true,

  category,
  mark,
  artikel,

  onChangeCategory,
  onChangeMark,
  onChangeArtikel,
}: Props) {
  const [catOptions, setCatOptions] =
    useState<Option[]>([])

  const [markOptions, setMarkOptions] =
    useState<Option[]>([])

  const [artOptions, setArtOptions] =
    useState<Option[]>([])

  useEffect(() => {
    loadData()
  }, [category, mark, artikel])

  const mapOptions = (
    arr: any[]
    ): Option[] =>
    arr.map((item) => {
        // jika item string langsung pakai
        if (typeof item === "string") {
        return {
            label: item,
            value: item,
        }
        }

        // jika object
        return {
        label:
            item.label ||
            item.name ||
            item.fv_catname ||
            item.fv_namemark ||
            item.fv_artcode ||
            "-",

        value:
            item.value ||
            item.fv_catname ||
            item.fv_namemark ||
            item.fv_artcode ||
            "",
        }
    })

  const loadData = async () => {
    try {
      const res =
        await getListArtikel({
          subid,
          cat: category?.value || "",
          mark: mark?.value || "",
          art: artikel?.value || "",
        })
        
      setCatOptions(
        mapOptions(res.cat || [])
      )

      setMarkOptions(
        mapOptions(res.mark || [])
      )

      setArtOptions(
        mapOptions(res.art || [])
      )
    } catch (err) {
      console.error(err)
    }
  }

  const visibleCount = [
    showCategory,
    showMark,
    showArtikel,
    ].filter(Boolean).length

  return (
    <div className={`
      grid
      gap-2
      ${visibleCount === 1 ? "md:grid-cols-1 max-w-sm" : ""}
      ${visibleCount === 2 ? "md:grid-cols-2" : ""}
      ${visibleCount === 3 ? "md:grid-cols-3" : ""}
    `}>
      
      {showCategory && (
        <div>
          <label className="mb-1 block text-sm font-semibold">
            Category
          </label>

          <SelectField
            options={catOptions}
            value={category}
            onChange={onChangeCategory}
            placeholder="Semua Category"
          />
        </div>
      )}

      {showMark && (
        <div>
          <label className="mb-1 block text-sm font-semibold">
            Acara
          </label>

          <SelectField
            options={markOptions}
            value={mark}
            onChange={onChangeMark}
            placeholder="Semua Acara"
          />
        </div>
      )}

      {showArtikel && (
        <div>
          <label className="mb-1 block text-sm font-semibold">
            Artikel
          </label>

          <SelectField
            options={artOptions}
            value={artikel}
            onChange={onChangeArtikel}
            placeholder="Semua Artikel"
          />
        </div>
      )}
    </div>
  )
}