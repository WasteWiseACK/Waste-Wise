import { motion, useInView, useAnimation, animate, easeIn } from "framer-motion"
import { useEffect, useRef } from "react"

const DELAY = ({ children }) => {

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div ref={ref} style={{
      // display: "flex",
      // flexDirection: "column",
      // alignItems: "center",
      position: "relative",
      overflow: "hidden",
      // width: "fit-content" || "100%"
    }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8, delay: 1 }}
      >
        {children}
      </motion.div>
      {/* <motion.div
        variants={{
          hidden: { left: 0 },
          visible: { left: "100%" },
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, ease: "easeIn" }}
        style={{
          position: "absolute",
          top: 4,
          bottom: 4,
          left: 0,
          right: 0,
          background: "yellow",
          zIndex: 20,
        }}
      /> */}
    </div>


  )
}

export default DELAY