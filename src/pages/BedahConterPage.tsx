import { useEffect, useState } from "react"
import { fetchCategory, fetchOrnal } from "../api/bedah_counter"
import OrnalTable from "../components/organisms/OrnalTable"
import CategoryTable from "../components/organisms/CategoryTable"
import Navbar from "../components/organisms/NavBar"
import { useSearchParams } from "react-router-dom"

export default function BedahCounterPage() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [loading, setLoading] = useState(false)

    const [ornal2024, setOrnal2024] = useState([])
    const [ornal2025, setOrnal2025] = useState([])
    const [ornalOU, setOrnalOU] = useState([])
    const [category2024, setCategory2024] = useState([])
    const [category2025, setCategory2025] = useState([])
    const [categoryOU, setCategoryOU] = useState([])
    const [selectedOrnal, setSelectedOrnal] = useState("")
    const [selectedDivisi, setSelectedDivisi] = useState("")

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        try {
            setLoading(true)

            // ambil query lama
            const currentParams = Object.fromEntries(
            searchParams.entries()
            )

            // merge query baru
            const newParams = {
            ...currentParams,
            }

            if (selectedDivisi) {
            newParams.divisi = selectedDivisi
            } else {
            delete newParams.divisi
            }

            if (selectedOrnal) {
            newParams.ornal = selectedOrnal
            } else {
            delete newParams.ornal
            }

            // update url tanpa hilangkan query lama
            setSearchParams(newParams)

            const tokoFull  = searchParams.get("toko") || ""
            const toko = tokoFull.split(" - ")[0]
            const end = searchParams.get("end") || ""
            const start = searchParams.get("start") || ""
            const backdate = searchParams.get("backdate") || ""
            
            const res = await fetchOrnal({
                toko,
                divisi: selectedDivisi,
                ornal: selectedOrnal,
                end: "2026-02-14",
            })

            setOrnal2024(res.last_year || [])
            setOrnal2025(res.this_year || [])
            setOrnalOU(res.ou || [])

            const resCat = await fetchCategory({
                toko,
                end: "2026-02-14",
            })

            setCategory2024(resCat.last_year || [])
            setCategory2025(resCat.this_year || [])
            setCategoryOU(resCat.ou || [])
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }
    return(
        <div className="space-y-6 p-4">
            
            <Navbar
            judulToko="MD255 - MALANG"
            divisi={selectedDivisi}
            ornal={selectedOrnal}
            selectedOrnal={selectedOrnal}
            selectedDivisi={selectedDivisi}
            onChangeOrnal={setSelectedOrnal}
            onChangeDivisi={setSelectedDivisi}
            onApply={loadData}
            />

            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                <OrnalTable
                    title="Tahun Lalu"
                    data={ornal2024}
                />

                <OrnalTable
                    title="Tahun Ini"
                    data={ornal2025}
                />

                <OrnalTable
                    title="Over / Under"
                    data={ornalOU}
                    isOU
                />
                <div>
                    <CategoryTable
                    title="Tahun Lalu"
                    data={category2024}
                    />

                    <CategoryTable
                    title="Tahun Ini"
                    data={category2025}
                    />

                    <CategoryTable
                    title="Over / Under"
                    data={categoryOU}
                    isOU
                    />
                </div>
                </>
            )}
            </div>
    )
}