import { useEffect, useState } from "react"
import { fetchCategory, fetchHistory, fetchOrnal, fetchSales, fetchStokBedahCounter } from "../api/bedah_counter"
import OrnalTable from "../components/organisms/OrnalTable"
import CategoryTable from "../components/organisms/CategoryTable"
import Navbar from "../components/organisms/NavBar"
import { useSearchParams } from "react-router-dom"
import SalesTable from "../components/organisms/SalesTable"
import HistoryTable from "../components/organisms/HistoryTable"
import StokTableBedahCounter from "../components/organisms/StokTableBedahCounter"
import ArtikelFilterGroup from "../components/organisms/ArtikelFilterGroup"
import Button from "../components/atoms/Button"
import ReturModal from "../components/organisms/ReturModal"
import { fetchMutasi } from "../api/retur_mutasi"
import MutasiModal from "../components/organisms/MutasiModal"

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
    const [selectedToko, setSelectedToko] = useState("")
    const [sales, setSales] = useState([])
    const [history, setHistory] = useState([])
    const [selectedHistory, setSelectedHistory] = useState<any | null>(null)
    const [stok, setStok] = useState([])
    const [category, setCategory] = useState<Option | null>(null)
    const [mark, setMark] = useState<Option | null>(null)
    const [artikel, setArtikel] = useState<Option | null>(null)
    const [openRetur, setOpenRetur] = useState(false)
    const [selectedRow, setSelectedRow] = useState<any>(null)
    const [openMutasiIn, setOpenMutasiIn] = useState(false)
    const [selectedMutasiRow, setSelectedMutasiRow] = useState<any>(null)
    const [draftMutasiIn, setDraftMutasiIn] = useState<any[]>([])
    const tokoFull  = searchParams.get("toko") || ""
    const toko = tokoFull.split(" - ")[0]
    const end = searchParams.get("end") || ""
    const start = searchParams.get("start") || ""
    const backdate = searchParams.get("backdate") || ""
    const subid = searchParams.get("subid") || "10"
    const [mutasiType, setMutasiType] = useState<"in" | "out">("in")

    useEffect(() => {
        loadData()
        if (selectedHistory?.fv_catname) {
            setCategory({
            label: selectedHistory.fv_catname,
            value: selectedHistory.fv_catname,
            })
        }
    }, [selectedHistory])

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

            setSelectedToko(tokoFull)
            
            const res = await fetchOrnal({
                toko,
                divisi: selectedDivisi,
                ornal: selectedOrnal,
                start,
                end,
                backdate,
                subid,
            })
            const safeJson = res.replace(
            /:\s*NaN/g,
            ": 0"
            )

            const parsed = JSON.parse(safeJson)
            setOrnal2024(parsed.last_year || [])
            setOrnal2025(parsed.this_year || [])
            setOrnalOU(parsed.ou || [])

            const resCat = await fetchCategory({
                toko,
                start,
                end,
                divisi: selectedDivisi,
                ornal: selectedOrnal,
                backdate,
                subid,
            })

            const safeJsonCat = resCat.replace(
            /:\s*NaN/g,
            ": 0"
            )

            const parsedCat = JSON.parse(safeJsonCat)
            setCategory2024(parsedCat.last_year || [])
            setCategory2025(parsedCat.this_year || [])
            setCategoryOU(parsedCat.ou || [])

            const resSales = await fetchSales({
                toko,
                start,
                end,
                divisi: selectedDivisi,
                ornal: selectedOrnal,
                backdate,
                subid,
            })
            setSales(resSales)

            const resHist = await fetchHistory({
                toko,
                start,
                end,
                divisi: selectedDivisi,
                ornal: selectedOrnal,
                backdate,
                subid,
            })

            setHistory(resHist)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleSelectHistory = async (row: any) => {
        // VALIDASI wajib pilih divisi + ornal
        if (!selectedDivisi || !selectedOrnal) {
            alert("Silakan pilih Divisi dan Obral / Normal terlebih dahulu")
            return
        }
        
        // uncheck jika row sama diklik lagi
        if (selectedHistory?.fv_catname === row.fv_catname) {
            setSelectedHistory(null)
            setStok([])
            return
        }

        setSelectedHistory(row)

        try {
            setLoading(true)

            const resStok = await fetchStokBedahCounter({
                toko,
                start,
                end,
                divisi: selectedDivisi,
                ornal: selectedOrnal,
                backdate,
                cat: row.fv_catname,
                subid,
            })

            setStok(resStok || [])
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleMutasiIn = async() => {
        console.log('mutasi in')
        setSelectedMutasiRow(null)
        const payload: any = {
            artikel: artikel?.value || "",
            toko,
            divisi: selectedDivisi,
            ornal: selectedOrnal,
            start,
            end,
            backdate,
            subid,
            show : "main"
        }

        const res = await fetchMutasi(
            payload
        )

        setDraftMutasiIn(
            res.data || []
        )
        setOpenMutasiIn(true)
    }

    const handleRetur = (row: any) => {
        setSelectedRow(row)
        setOpenRetur(true)
    }

    const handleMutasi = async (
    row: any,
    type: "in" | "out"
    ) => {
        try {
            setLoading(true)

            setSelectedMutasiRow(row)
            setMutasiType(type)
            console.log(row)

            const payload: any = {
                artikel: row.fv_barcode,
                toko,
                divisi: selectedDivisi,
                ornal: selectedOrnal,
                start,
                end,
                backdate,
                subid,
            }

            // hanya kirim show kalau ada
            if (type === "in") {
                payload.show = "main"
            }

            const res = await fetchMutasi(
                payload
            )

            setDraftMutasiIn(
                res.data || []
            )

            setOpenMutasiIn(true)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }
    
    return(
        <div className="space-y-6 p-4">
            
            <Navbar
            judulToko={selectedToko}
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
                <SalesTable data={sales} />
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
                <HistoryTable
                title="History"
                data={history}
                selectedRow={selectedHistory}
                onSelectRow={handleSelectHistory}
                />

                {selectedHistory && (
                    <div>
                        <div className="flex items-end gap-3">
                            <ArtikelFilterGroup
                                subid="10"

                                showCategory={false}
                                showMark={false}

                                category={null}
                                mark={null}
                                artikel={artikel}

                                onChangeCategory={() => {}}
                                onChangeMark={() => {}}
                                onChangeArtikel={setArtikel}
                            />
                            <Button onClick={handleMutasiIn}>Mutasi In</Button>
                            <Button variant="danger" onClick={handleMutasiIn}>Order Booking</Button>
                        </div>
                        
                        <StokTableBedahCounter
                            data={stok}
                            loading={loading}
                            onRetur={handleRetur}
                            onMutasiIn={(row) =>
                                handleMutasi(row, "in")
                            }
                            onMutasiOut={(row) => 
                                handleMutasi(row,"out")
                            }
                            onOrderBooking={(row) => console.log(row)}
                        />

                        <ReturModal
                        open={openRetur}
                        row={selectedRow}
                        onClose={() => setOpenRetur(false)}
                        onConfirm={(payload) => {
                            console.log(payload)

                            setOpenRetur(false)
                        }}
                        />

                        <MutasiModal
                        type={mutasiType}
                        open={openMutasiIn}
                        onClose={() =>
                            setOpenMutasiIn(false)
                        }
                        selectedRow={selectedMutasiRow}
                        draftData={draftMutasiIn}
                        onConfirm={() => {
                            console.log("confirm")
                        }}
                        />
                    </div>
                )}
                </>
            )}
            </div>
    )
}