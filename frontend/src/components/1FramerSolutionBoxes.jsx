import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const FlexibleBoxes = ({ children, x, y, x2, y2 }) => {



  return (
    <div

      style={{
        position: "absolute",
        zIndex: -1
      }}>
      <motion.div
        className="box"
        initial={{
          scale: 2,
          x: x,
          y: y
        }}
        animate={{
          scale: 2,
          x: x2,
          y: y2
        }}
        transition={{
          duration: 1,
          ease: "easeOut",
          times: [0, 1]
        }}
        style={{
          width: 424,
          height: "2.5rem",
          background: '#6b8a7a'
        }}
      >{children}</motion.div>
    </div>



  )
}

export default FlexibleBoxes