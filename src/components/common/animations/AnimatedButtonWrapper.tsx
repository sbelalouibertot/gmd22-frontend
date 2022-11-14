import { ElementType, useEffect, useState } from 'react'
import { FC, ReactNode } from 'react'

const AnimatedButtonWrapper: FC<{ children: ReactNode; absolute?: boolean }> = ({
  children,
  absolute,
}) => {
  const [MotionDiv, setMotionDiv] = useState<ElementType | null>(null)

  useEffect(() => {
    import('framer-motion').then(a => setMotionDiv(a.motion.div))
  }, [])

  return !!MotionDiv ? (
    <MotionDiv
      whileTap={{
        scale: 0.8,
      }}
      {...(absolute && { style: { height: '100%', width: '100%' } })}
    >
      {children}
    </MotionDiv>
  ) : (
    <>{children}</>
  )
}

export default AnimatedButtonWrapper
