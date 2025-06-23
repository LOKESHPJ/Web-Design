"use client"

import { useRef } from "react"
import styled from "styled-components"
import { motion, useInView } from "framer-motion"

const HighlightsContainer = styled.section`
  padding: 8rem 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`

const HighlightBlock = styled.div<{ $reverse?: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 8rem;
  align-items: center;

  ${(props) =>
    props.$reverse &&
    `
    direction: rtl;
    * { direction: ltr; }
  `}

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 4rem;
    direction: ltr;
  }
`

const ImageContainer = styled(motion.div)`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  aspect-ratio: 4/3;
  background: url('/placeholder.svg?height=400&width=600') center/cover;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`

const ContentContainer = styled(motion.div)`
  padding: 2rem 0;
`

const HighlightTitle = styled(motion.h2)`
  font-size: clamp(2rem, 5vw, 3rem);
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #ffffff 0%, #667eea 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const HighlightDescription = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  opacity: 0.8;
`

const FeatureList = styled(motion.ul)`
  list-style: none;
  padding: 0;
`

const FeatureItem = styled(motion.li)`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 1.1rem;

  &::before {
    content: '✦';
    color: #667eea;
    font-size: 1.2rem;
    margin-right: 1rem;
  }
`

const highlights = [
  {
    title: "Modular Design Revolution",
    description:
      "Hot-swappable modules let you customize your phone like never before. Upgrade your camera for a photo shoot, swap in extra battery for long trips, or add specialized sensors for work.",
    features: ["Hot-swappable modules", "Magnetic connections", "Universal module standard", "Endless customization"],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Sustainable Technology",
    description:
      "Reduce electronic waste by upgrading only what you need. Keep your phone longer by replacing individual components instead of the entire device.",
    features: ["Reduce e-waste by 80%", "Upgrade individual parts", "Longer device lifespan", "Eco-friendly materials"],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Endless Possibilities",
    description:
      "From professional photography modules to health sensors, gaming controllers to projectors - the possibilities are limitless with our growing ecosystem.",
    features: ["Professional camera modules", "Health & fitness sensors", "Gaming attachments", "Productivity tools"],
    image: "/placeholder.svg?height=400&width=600",
  },
]

function HighlightItem({
  highlight,
  index,
  reverse,
}: {
  highlight: (typeof highlights)[0]
  index: number
  reverse: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const slideVariants = {
    hidden: {
      x: reverse ? 100 : -100,
      opacity: 0,
      filter: "blur(10px)",
    },
    visible: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  }

  const imageVariants = {
    hidden: {
      scale: 0.8,
      opacity: 0,
      rotateY: reverse ? -15 : 15,
    },
    visible: {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        duration: 1,
      },
    },
  }

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  return (
    <HighlightBlock ref={ref} $reverse={reverse}>
      <ImageContainer
        variants={imageVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        whileHover={{
          scale: 1.02,
          rotateY: reverse ? -2 : 2,
          transition: { duration: 0.3 },
        }}
      />

      <ContentContainer variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
        <HighlightTitle variants={slideVariants}>{highlight.title}</HighlightTitle>

        <HighlightDescription variants={slideVariants}>{highlight.description}</HighlightDescription>

        <FeatureList variants={listVariants}>
          {highlight.features.map((feature, i) => (
            <FeatureItem key={i} variants={itemVariants}>
              {feature}
            </FeatureItem>
          ))}
        </FeatureList>
      </ContentContainer>
    </HighlightBlock>
  )
}

export default function ProductHighlights() {
  return (
    <HighlightsContainer>
      {highlights.map((highlight, index) => (
        <HighlightItem key={index} highlight={highlight} index={index} reverse={index % 2 === 1} />
      ))}
    </HighlightsContainer>
  )
}
