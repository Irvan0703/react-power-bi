import { useEffect, useState } from "react";
import Navbar from "../../components/organisms/NavBar";
import ReportSummaryBedahCounterTable from "../../components/organisms/ReportSummaryBedahCounterTable";
import { useSearchParams } from "react-router-dom";
import { fetchSummaryBedahCounter } from "../../api/reporting";

export default function SummaryBedahCounter() {

    const [searchParams, setSearchParams] = useSearchParams()
    const tokoFull  = searchParams.get("toko") || ""
    const toko = tokoFull.split(" - ")[0]
    const end = searchParams.get("end") || ""
    const start = searchParams.get("start") || ""
    const backdate = searchParams.get("backdate") || ""
    const subid = searchParams.get("subid") || "10"
    const [selectedOrnal, setSelectedOrnal] = useState("")
    const [selectedDivisi, setSelectedDivisi] = useState("")
    const [loading, setLoading] = useState(false)
    const [report, setReport] = useState([])

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        try {
            setLoading(true)

            const currentParams = Object.fromEntries(
                searchParams.entries()
            )

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

            setSearchParams(newParams)

            const res = await fetchSummaryBedahCounter({
                toko,
                divisi: selectedDivisi,
                ornal: selectedOrnal,
                start,
                end,
                backdate,
                subid,
            })

            setReport(res)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return(
        <div>
            <Navbar
            judulToko={tokoFull}
            divisi={selectedDivisi}
            ornal={selectedOrnal}
            selectedOrnal={selectedOrnal}
            selectedDivisi={selectedDivisi}
            onChangeOrnal={setSelectedOrnal}
            onChangeDivisi={setSelectedDivisi}
            onApply={loadData}/>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <ReportSummaryBedahCounterTable report={report}/>
            )}
            
        </div>
    )
}