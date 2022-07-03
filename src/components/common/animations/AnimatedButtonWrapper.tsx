import { motion } from 'framer-motion'
import { FC, ReactNode } from 'react'

const AnimatedButtonWrapper: FC<{ children: ReactNode; absolute?: boolean }> = ({
  children,
  absolute,
}) => (
  <motion.div
    whileTap={{
      scale: 0.8,
    }}
    {...(absolute && { style: { height: '100%', width: '100%' } })}
  >
    {children}
  </motion.div>
)

export default AnimatedButtonWrapper
