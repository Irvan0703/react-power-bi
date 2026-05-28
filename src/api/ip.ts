export const getPublicIP =
    async () => {

    try {

        const res =
            await fetch(
                "https://api.ipify.org?format=json"
            )

        const data =
            await res.json()

        return data.ip

    } catch (error) {

        console.error(
            "Gagal ambil IP public",
            error
        )

        return null
    }
}

export const getLocalIP =
    (): Promise<string | null> => {

    return new Promise(
        (resolve) => {

        const pc =
            new RTCPeerConnection({
                iceServers: [],
            })

        pc.createDataChannel("")

        pc.createOffer()
            .then((offer) =>
                pc.setLocalDescription(
                    offer
                )
            )

        pc.onicecandidate =
            (event) => {

            if (
                !event ||
                !event.candidate
            ) {
                resolve(null)
                return
            }

            const ipRegex =
                /([0-9]{1,3}(\.[0-9]{1,3}){3})/

            const match =
                ipRegex.exec(
                    event.candidate.candidate
                )

            if (match) {

                resolve(match[1])

                pc.close()
            }
        }
    })
}