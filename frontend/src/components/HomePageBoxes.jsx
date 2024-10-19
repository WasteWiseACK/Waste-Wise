import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Boxes = ({ children }) => {

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div style={{
      position: "absolute",
      zIndex: -1
    }}>
      <motion.div
        initial={{
          scale: 2,
          x: -750,
          y: 198
        }}
        animate={{
          scale: 2,
          x: -158,
          y: 198
        }}
        transition={{
          duration: 1,
          ease: "easeIn",
          times: [0, 1]
        }}
        style={{
          width: 424,
          height: 150,
          background: '#6b8a7a'
        }}
      >{children}</motion.div>
    </div>



  )
}

export default Boxes