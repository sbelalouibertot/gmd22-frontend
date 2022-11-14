import { useRouter } from 'next/router'
import { ElementType, ReactElement, useEffect, useState } from 'react'

const variants = {
  in: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.35,
      delay: 0.2,
    },
  },
  out: {
    opacity: 0,
    scale: 1,
    transition: {
      duration: 0.4,
    },
  },
}

const FadedPageWrapper = ({ children }: { children?: ReactElement }) => {
  const [MotionDiv, setMotionDiv] = useState<ElementType | null>(null)
  const [AnimatePresence, setAnimatePresence] = useState<ElementType | null>(null)

  useEffect(() => {
    import('framer-motion').then(a => {
      setMotionDiv(a.motion.div)
      setAnimatePresence(a.AnimatePresence)
    })
  }, [])

  const router = useRouter()
  return !!MotionDiv && AnimatePresence ? (
    <AnimatePresence initial exitBeforeEnter>
      <MotionDiv key={router.route} variants={variants} animate="in" initial="out" exit="out">
        {children}
      </MotionDiv>
    </AnimatePresence>
  ) : (
    <>{children}</>
  )
}

export default FadedPageWrapper
