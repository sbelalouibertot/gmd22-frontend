import { motion, Variants } from 'framer-motion'
import { FC, ReactNode } from 'react'

const variants: Variants = {
  offscreen: {
    y: 90,
  },
  onscreen: {
    y: 30,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 0.5,
    },
  },
}

const AnimatedListItemWrapper: FC<{ children: ReactNode }> = ({ children }) => (
  <motion.div
    variants={variants}
    initial="offscreen"
    whileInView="onscreen"
    viewport={{ once: true, amount: 0.8 }}
  >
    {children}
  </motion.div>
)

export default AnimatedListItemWrapper
