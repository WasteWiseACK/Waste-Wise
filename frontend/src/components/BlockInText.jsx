import { useEffect, useState } from "react";
import React from "react";
import { motion } from "framer-motion"

const BlockInTextFoodBank = () => {
  return (
    <div className="text_example_container">
      <BlockInTextCard
        tag="FOOD BANKS"
        text={<>
          Can't find a <strong>FOOD BANK</strong> by you?
          We got you covered!
        </>}

        examples={["The Bronx",
          "Brooklyn",
          "Queens",
          "Manhattan",
          "Staten Island"
        ]}
      />
    </div>
  )
}

const BlockInTextCard = ({ tag, text, examples }) => {
  return (
    <div className="block_card">
      <div>
        <p className="tag title">{tag}</p>
        <hr className="hr" />
        <p className="text body">{text}</p>
        <div>
          <Typewrite examples={examples} />
          <hr className="hr2" />
        </div>
      </div>
    </div>
  )
}

const LETTER_DELAY = 0.055
const BOX_FADE_DURATION = 0.325

const FADE_DELAY = 3
const MAIN_FADE_DURATION = 0.25

const SWAP_DELAY_IN_MS = 3500;

const Typewrite = ({ examples }) => {
  const [exampleIndex, setExampleIndex] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setExampleIndex((pv) => (pv + 1) % examples.length);
    }, SWAP_DELAY_IN_MS)

    return () => clearInterval(intervalId)
  }, [])

  return <p className="typewrite_boroughs header2">
    <span className="span1"></span>
    <span className="span2">Banks in: <strong>{examples[exampleIndex].split("").map((l, i) => {
      return <motion.span
        initial={{
          opacity: 1,
        }}
        animate={{
          opacity: 0,
        }}
        transition={{
          delay: FADE_DELAY,
          duration: MAIN_FADE_DURATION,
          ease: "easeInOut",
        }}
        style={{ position: "relative" }}
        key={`${exampleIndex}-${i}`}>
        <motion.span
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: i * LETTER_DELAY,
            duration: 0,
          }}
        >{l}</motion.span>
        <motion.span
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: [0, 1, 0],
          }}
          transition={{
            delay: i * LETTER_DELAY,
            times: [0, 0.1, 1],
            duration: BOX_FADE_DURATION,
            ease: "easeInOut"
          }}
          className="span_block" />
      </motion.span>
    })}</strong></span>
  </p>
}


export default BlockInTextFoodBank