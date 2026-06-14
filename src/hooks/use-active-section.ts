'use client'

import { useEffect, useState } from 'react'

// Tracks which in-page section is closest to the viewport top.
// Accounts for a fixed header offset and only activates when a
// section is within the threshold distance.
export function useActiveSection(sectionIds: string[], headerHeight = 80, activationThreshold = 200) {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    if (sectionIds.length === 0) return

    const update = () => {
      let closestId = ''
      let minDistance = Number.POSITIVE_INFINITY

      sectionIds.forEach(id => {
        const el = document.getElementById(id)

        if (!el) return

        const distance = Math.abs(el.getBoundingClientRect().top - headerHeight)

        if (distance < minDistance) {
          minDistance = distance
          closestId = id
        }
      })

      setActiveSection(minDistance <= activationThreshold ? closestId : '')
    }

    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    update()

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [sectionIds, headerHeight, activationThreshold])

  return activeSection
}
