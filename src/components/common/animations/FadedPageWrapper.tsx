import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

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

const FadedPageWrapper = ({ children }: { children?: ReactNode }) => {
  const router = useRouter()
  return (
    <AnimatePresence initial exitBeforeEnter>
      <motion.div key={router.route} variants={variants} animate="in" initial="out" exit="out">
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
export default FadedPageWrapper
