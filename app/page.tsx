"use client"

import { useRef } from "react"
import styled from "styled-components"
import { motion, useScroll, useTransform } from "framer-motion"
import Hero from "@/components/Hero"
import ProductHighlights from "@/components/ProductHighlights"
import ModularShowcase from "@/components/ModularShowcase"
import Testimonials from "@/components/Testimonials"
import WaitlistForm from "@/components/WaitlistForm"
import Footer from "@/components/Footer"
import GlobalStyles from "@/components/GlobalStyles"

const PageContainer = styled.div`
  overflow-x: hidden;
  background: #000;
`

const ScrollContainer = styled(motion.div)`
  position: relative;
`

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Parallax background effect
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  return (
    <>
      <GlobalStyles />
      <PageContainer>
        <ScrollContainer ref={containerRef}>
          {/* Animated background gradient */}
          <motion.div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              y: backgroundY,
              zIndex: -2,
            }}
          />

          {/* Animated overlay */}
          <motion.div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.8) 100%)",
              zIndex: -1,
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          <Hero />
          <ProductHighlights />
          <ModularShowcase />
          <Testimonials />
          <WaitlistForm />
          <Footer />
        </ScrollContainer>
      </PageContainer>
    </>
  )
}
