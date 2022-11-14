import { ElementType, FC, ReactNode, useEffect, useState } from 'react'

const variants = {
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

const AnimatedListItemWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const [MotionDiv, setMotionDiv] = useState<ElementType | null>(null)

  useEffect(() => {
    import('framer-motion').then(a => setMotionDiv(a.motion.div))
  }, [])

  return !!MotionDiv ? (
    <MotionDiv
      variants={variants}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
    >
      {children}
    </MotionDiv>
  ) : (
    <>{children}</>
  )
}

export default AnimatedListItemWrapper
