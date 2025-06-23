"use client"

import { useRef, useEffect, useState } from "react"
import styled from "styled-components"
import { motion, useScroll, useTransform } from "framer-motion"

const HeroContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`

const ProductImage = styled(motion.div)`
  width: 300px;
  height: 300px;
  background: url('/placeholder.svg?height=300&width=200') center/cover;
  border-radius: 20px;
  margin-bottom: 3rem;
  box-shadow: 0 20px 60px rgba(102, 126, 234, 0.4);
  
  @media (max-width: 768px) {
    width: 250px;
    height: 250px;
    margin-bottom: 2rem;
  }
`

const HeroTitle = styled(motion.h1)`
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #ffffff 0%, #667eea 50%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
`

const HeroSubtitle = styled(motion.p)`
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  margin-bottom: 3rem;
  max-width: 600px;
  opacity: 0.8;
  font-weight: 300;
`

const CTAButton = styled(motion.button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1.2rem 3rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }

  @media (max-width: 768px) {
    padding: 1rem 2.5rem;
    font-size: 1rem;
  }
`

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`

const FloatingCircle = styled(motion.div)<{ size: number; top: string; left: string }>`
  position: absolute;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 50%;
  background: rgba(102, 126, 234, 0.1);
  top: ${(props) => props.top};
  left: ${(props) => props.left};
`

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  const productVariants = {
    hidden: {
      scale: 0.5,
      opacity: 0,
      rotateY: -180,
      filter: "blur(20px)",
    },
    visible: {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        duration: 1.2,
      },
    },
  }

  const titleVariants = {
    hidden: {
      y: 100,
      opacity: 0,
      letterSpacing: "0.5em",
    },
    visible: {
      y: 0,
      opacity: 1,
      letterSpacing: "-0.02em",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 1,
      },
    },
  }

  return (
    <HeroContainer ref={containerRef}>
      <motion.div style={{ y, opacity, scale }} variants={containerVariants} initial="hidden" animate="visible">
        {/* Floating background elements */}
        <FloatingElements>
          {[...Array(6)].map((_, i) => (
            <FloatingCircle
              key={i}
              size={Math.random() * 100 + 50}
              top={`${Math.random() * 100}%`}
              left={`${Math.random() * 100}%`}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </FloatingElements>

        <ProductImage
          variants={productVariants}
          whileHover={{
            scale: 1.05,
            rotateY: 5,
            transition: { duration: 0.3 },
          }}
          style={{
            rotateX: mousePosition.y * 0.1 - 5,
            rotateY: mousePosition.x * 0.1 - 5,
          }}
        />

        <HeroTitle variants={titleVariants}>
          Project Ara
          <br />
          Modular Future
        </HeroTitle>

        <HeroSubtitle variants={itemVariants}>
          The world's first truly modular smartphone. Swap components like camera, battery, and speakers instantly.
          Build your perfect device, your way.
        </HeroSubtitle>

        <CTAButton
          variants={itemVariants}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 10px 30px rgba(102, 126, 234, 0.4)",
          }}
          whileTap={{ scale: 0.95 }}
          style={{
            x: mousePosition.x * 0.02 - 1,
            y: mousePosition.y * 0.02 - 1,
          }}
        >
          Join the Waitlist
        </CTAButton>
      </motion.div>
    </HeroContainer>
  )
}
