import { motion } from "framer-motion"


const SliderBox = ({ children, duration }) => {



  return (
    <div style={{
      // display: "flex",
      // flexDirection: "column",
      // alignItems: "center",
      // position: "relative",
      // overflow: "hidden",
      width: "100%"
    }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: duration, delay: 0.25 }}
      >
        {children}
      </motion.div>
      <motion.div
        variants={{
          hidden: { left: 0 },
          visible: { left: "100%" },
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: duration, ease: "easeIn" }}
        style={{
          position: "absolute",
          top: 4,
          bottom: 4,
          left: 0,
          right: 0,
          background: "#254336",
          zIndex: 20,
        }}
      />
    </div>


  )
}

export default SliderBox