import { useEffect, useState } from "react"
import { fetchCategory, fetchDraft, fetchHistory, fetchOrnal, fetchSales, fetchStokBedahCounter } from "../api/bedah_counter"
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
import { fetchDraftOB, fetchGudang, fetchMutasi, postDraft } from "../api/retur_mutasi"
import MutasiModal from "../components/organisms/MutasiModal"
import OrderBookingModal from "../components/organisms/OrderBookingModal"
import { fetcDetailArtikel } from "../api/bedah_artikel"
import DetailTable from "../components/organisms/DetailTableArtikel"
import RasioCard from "../components/organisms/RasioCard"
import GudangTable from "../components/organisms/GudangTable"
import DraftSection from "../components/organisms/DraftSection"

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
    const [listDraftMutasiIn, setListDraftMutasiIn] = useState<any[]>([])
    const tokoFull  = searchParams.get("toko") || ""
    const toko = tokoFull.split(" - ")[0]
    const end = searchParams.get("end") || ""
    const start = searchParams.get("start") || ""
    const backdate = searchParams.get("backdate") || ""
    const subid = searchParams.get("subid") || "10"
    const [mutasiType, setMutasiType] = useState<"in" | "out">("in")
    const [openOrderBooking, setOpenOrderBooking] = useState(false)
    const [selectedOrderRow, setSelectedOrderRow] = useState<any>(null)
    const [orderBookingDetail,setOrderBookingDetail] = useState<any[]>([])
    const [rasioData,setRasioData] = useState<any>({})
    const [gudangHtml,setGudangHtml] = useState("")
    const [selectedGudangRows,setSelectedGudangRows] = useState<number[]>([])
    const [gudangData, setGudangData] = useState<any[]>([])
    const [draftRetur, setDraftRetur] = useState<any[]>([])
    const [draftMutasiIn, setDraftMutasiIn] = useState<any[]>([])
    const [draftMutasiOut, setDraftMutasiOut] = useState<any[]>([])
    const [draftOrder,setDraftOrder] = useState<any[]>([])

    const topSizes = [
        "S",
        "M",
        "L",
        "XL",
        "XXL",
    ]

    const bottomSizes = [
        "27",
        "28",
        "29",
        "30",
        "31",
        "32",
        "33",
        "34",
        "36",
        "38",
        "40",
        "42",
    ]

    const allSizes = [
        "25","26","27","28","29",
        "30","31","32","33","34",
        "35","36","37","38","39",
        "40","42","44",
        "ALLSIZE",
        "FS","XS","SS","S","M",
        "L","XL","XXL","XXXL",
    ]

    useEffect(() => {
        loadData()
        if (selectedHistory?.fv_catname) {
            setCategory({
                label: selectedHistory.fv_catname,
                value: selectedHistory.fv_catname,
            })
        }
        loadDataDraft()
    }, [selectedHistory])

    useEffect(() => {

        if (selectedGudangRows.length === 0) {
            setRasioData(null)
            return
        }

        const firstIndex =
            selectedGudangRows[0]

        const selectedGudang =
            gudangData[firstIndex]

        generateRasio(selectedGudang)

    }, [selectedGudangRows, gudangData])

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

    const loadDataDraft = async ()=> {
        const res = await fetchDraft({
            toko,
            start,
            end,
            divisi: selectedDivisi,
            ornal: selectedOrnal,
            backdate,
            subid,
        })

        setDraftRetur(res.RT)
        setDraftMutasiIn(res.Mi)
        setDraftMutasiOut(res.MO)

        const resOrder = await fetchDraftOB({
            toko,
            start,
            end,
            divisi: selectedDivisi,
            ornal: selectedOrnal,
            backdate,
            subid,
        })
        setDraftOrder(resOrder)
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

        setListDraftMutasiIn(
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

            setListDraftMutasiIn(
                res.data || []
            )

            setOpenMutasiIn(true)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleOrderBooking = async(row: any) => {
        try {
            setLoading(true)
            setSelectedOrderRow(row)
            setOpenOrderBooking(true)

            setOrderBookingDetail([])
            setRasioData({})
            setGudangHtml("")

            //Detail Artikel di toko
            const res = await fetcDetailArtikel({
                artikel: row.fv_barcode,
                toko,
                divisi: selectedDivisi,
                ornal: selectedOrnal,
                start,
                end,
                backdate,
                subid,
                topbot: row.fv_configname,
            })

            if (row.fv_configname === 'TOP') {
                setOrderBookingDetail( res.top || [])
            } else if (row.fv_configname === 'BOTTOM') {
                setOrderBookingDetail( res.bot || [])
            } else {
                setOrderBookingDetail([])
            }
            
            //Stok di Gudang
            const resGudang = await fetchGudang({
                artikel: row.fv_barcode,
                subid,
            })

            setGudangData(resGudang || [])
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const toggleGudangRow = (
        index: number
    ) => {
        setSelectedGudangRows(
            (prev) => {

            if (
                prev.includes(index)
            ) {
                return prev.filter(
                (i) => i !== index
                )
            }

            return [...prev, index]
            }
    )}

    const generateRasio = (
        gudangRow: any
    ) => {

        if (!gudangRow) {
            setRasioData(null)
            return
        }

        const tipeSize = (
            gudangRow.fv_configname || ""
        ).toUpperCase()

        let sizes: string[] = []

        if (tipeSize === "TOP") {
            sizes = topSizes
        } else {
            sizes = bottomSizes
        }

        const result: any = {
            artikel: gudangRow.fv_barcode,
            gudang: gudangRow.fv_whtypename,
            tipeSize,
            items: [],
        }

        sizes.forEach((size) => {

            const stok = Number(
                gudangRow[size] || 0
            )

            result.items.push({
                size,
                stok,
                value: stok === 0 ? "-" : 0,
                disabled: stok === 0,
                max: stok,
            })
        })

        setRasioData(result)
    }

    const handleRasioChange = (
        size: string,
        value: number
    ) => {

        setRasioData((prev: any) => {

            if (!prev) return prev

            return {
                ...prev,
                items: prev.items.map(
                    (item: any) => {

                        if (
                            item.size !== size
                        ) {
                            return item
                        }

                        return {
                            ...item,
                            value,
                        }
                    }
                )
            }
        })
    }

    const handleConfirmRetur = async (payload: any) => {
        try {
            const filteredSizes: Record<string, number> = {}

            allSizes.forEach((size) => {

                const value = Number(
                    payload[size] || 0
                )

                // hanya qty > 0
                if (value > 0) {
                    filteredSizes[size] =
                    value
                }
            })

            const finalPayload = {
                toko,
                start,
                end,
                backdate,
                subid,

                type_draft: "RT",

                data: [
                        {
                        artikel:
                            selectedRow
                            ?.fv_barcode,

                        gudang: "",

                        sizes: filteredSizes,
                        },
                    ],
                browser: navigator.userAgent,
            }

            console.log(finalPayload)
            const res = await postDraft(finalPayload)

            console.log(res)

            await loadDataDraft()
            setOpenRetur(false)
        } catch (error) {
            console.log(error)
            alert(
                "Gagal submit retur"
            )
        }
    }

    const handleConfirmMutasi = async(type: "MI" | "MO",payload: any[])=> {
        try {
            const selectedData = payload
                .filter((item) => item.checked)
                .map((item) => {

                    const filteredSizes:
                    Record<string, number> = {}

                    allSizes.forEach((size) => {

                    const value = Number(
                        item.sizes?.[size] || 0
                    )

                    if (value > 0) {
                        filteredSizes[size] =
                        value
                    }
                    })

                    return {
                        artikel: item.artikel,
                        gudang: item.gudang,
                        sizes: filteredSizes,
                    }
                })
                .filter(
                    (item) =>
                    Object.keys(item.sizes)
                        .length > 0
                )

                if (selectedData.length === 0) {
                    alert(
                        "Silakan pilih minimal satu artikel"
                    )
                    return
                }

                const finalPayload = {
                    toko: tokoFull,
                    backdate,
                    start,
                    end,
                    subid,
                    type_draft: type,
                    data: selectedData,
                    keterangan:'',
                    browser: navigator.userAgent,
                }

                console.log(
                "Payload:",
                finalPayload
                )

                await postDraft(finalPayload)

                await loadDataDraft()
                setOpenMutasiIn(false)
        } catch (error) {
            console.log(error)
            alert(
                "Gagal submit Mutasi"
            )
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
                            <Button variant="danger" 
                            onClick={() => {
                                if (!artikel?.value) {
                                    alert("Pilih artikel dulu")
                                    return
                                }

                                handleOrderBooking({
                                    fv_barcode: artikel.value,
                                })
                            }}
                            >Order Booking</Button>
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
                            onOrderBooking={(row) => 
                                handleOrderBooking(row)
                            }
                        />

                        {draftRetur?.length > 0 && (
                            <DraftSection
                                type="retur"
                                data={draftRetur}
                                subid={subid}
                                onReload={loadDataDraft}
                            />
                        )}

                        {draftMutasiIn?.length > 0 && (
                            <DraftSection
                                type="in"
                                data={draftMutasiIn}
                                subid={subid}
                                onReload={loadDataDraft}
                            />
                        )}

                        {draftMutasiOut?.length > 0 && (
                            <DraftSection
                                type="out"
                                data={draftMutasiOut}
                                subid={subid}
                                onReload={loadDataDraft}
                            />
                        )}

                        {draftOrder?.length > 0 && (
                            <DraftSection
                                type="order"
                                data={draftOrder}
                                subid={subid}
                                onReload={loadDataDraft}
                            />
                        )}

                        <ReturModal
                        open={openRetur}
                        row={selectedRow}
                        onClose={() => setOpenRetur(false)}
                        onConfirm={(payload) => {
                            console.log(payload)
                            handleConfirmRetur(payload)
                        }}
                        />

                        <MutasiModal
                        type={mutasiType}
                        open={openMutasiIn}
                        onClose={() =>
                            setOpenMutasiIn(false)
                        }
                        selectedRow={selectedMutasiRow}
                        draftData={listDraftMutasiIn}
                        onConfirm={(payload) => {
                            handleConfirmMutasi(mutasiType === "in"
                                ? "MI"
                                : "MO",payload
                            )
                        }}
                        />

                        <OrderBookingModal
                            open={openOrderBooking}
                            onClose={() => {
                                setOpenOrderBooking(false)
                                setSelectedGudangRows([])
                                setSelectedOrderRow(null)
                                setOrderBookingDetail([])
                                setGudangData([])
                                setRasioData(null)
                            }}
                            artikel={selectedOrderRow?.fv_barcode}
                            toko={selectedOrderRow?.fv_toko}
                            gudang={selectedOrderRow?.gudang}
                            onSaveDraft={() => {
                                console.log("save draft")
                            }}
                            >
                                <div className="space-y-6">

                                    {/* DETAIL TOKO */}
                                    <div>
                                    <h2 className="mb-3 text-lg font-bold">
                                        Detail Toko
                                    </h2>

                                    <DetailTable
                                        rows={
                                        orderBookingDetail
                                        }
                                    />
                                    </div>

                                    {/* RASIO */}
                                    <div>
                                    <h2 className="mb-3 text-lg font-bold">
                                        Rasio
                                    </h2>

                                    <RasioCard
                                        data={rasioData}
                                        onChangeValue={
                                            handleRasioChange
                                        }
                                    />
                                    </div>

                                    {/* GUDANG */}
                                    {gudangHtml && (
                                    <div
                                        dangerouslySetInnerHTML={{
                                        __html: gudangHtml,
                                        }}
                                    />
                                    )}
                                    <GudangTable
                                    data={gudangData}
                                    selectedRows={
                                        selectedGudangRows
                                    }
                                    onToggleRow={
                                        toggleGudangRow
                                    }
                                    />
                                </div>
                        </OrderBookingModal>
                    </div>
                )}
                </>
            )}
            </div>
    )
}