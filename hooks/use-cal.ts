"use client"

import { useEffect } from "react"
import { getCalApi } from "@calcom/embed-react"

export function useCal() {
  useEffect(() => {
    ;(async function () {
      const cal = await getCalApi()
      cal("ui", {
        styles: { branding: { brandColor: "#000000" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      })
    })()
  }, [])

  const handleCalClick = async () => {
    const cal = await getCalApi()
    cal("modal", {
      calLink: "vaibhav-saturnlabs/30min",
    })
  }

  return { handleCalClick }
}
