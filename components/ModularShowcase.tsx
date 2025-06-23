"use client"

import { useState, useRef } from "react"
import styled from "styled-components"
import { motion, useInView, AnimatePresence } from "framer-motion"

const ShowcaseContainer = styled.section`
  padding: 8rem 2rem;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(20px);
  text-align: center;

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`

const ShowcaseTitle = styled(motion.h2)`
  font-size: clamp(2.5rem, 6vw, 4rem);
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #ffffff 0%, #667eea 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const ShowcaseSubtitle = styled(motion.p)`
  font-size: 1.3rem;
  margin-bottom: 4rem;
  opacity: 0.8;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`

const PhoneContainer = styled.div`
  position: relative;
  max-width: 400px;
  margin: 0 auto 4rem;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    height: 500px;
  }
`

const PhoneBase = styled(motion.div)`
  width: 200px;
  height: 400px;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  border-radius: 25px;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    width: 160px;
    height: 320px;
  }
`

const ModuleSlot = styled(motion.div)<{ $position: string; $active: boolean }>`
  position: absolute;
  width: 60px;
  height: 60px;
  border: 2px solid ${(props) => (props.$active ? "#667eea" : "rgba(255, 255, 255, 0.3)")};
  border-radius: 8px;
  background: ${(props) => (props.$active ? "rgba(102, 126, 234, 0.2)" : "rgba(255, 255, 255, 0.1)")};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  transition: all 0.3s ease;

  ${(props) => {
    switch (props.$position) {
      case "top":
        return "top: -30px; left: 50%; transform: translateX(-50%);"
      case "right":
        return "right: -30px; top: 50%; transform: translateY(-50%);"
      case "bottom":
        return "bottom: -30px; left: 50%; transform: translateX(-50%);"
      case "left":
        return "left: -30px; top: 50%; transform: translateY(-50%);"
      default:
        return ""
    }
  }}

  &:hover {
    border-color: #667eea;
    background: rgba(102, 126, 234, 0.3);
    transform: ${(props) => {
      switch (props.$position) {
        case "top":
          return "translateX(-50%) scale(1.1);"
        case "right":
          return "translateY(-50%) scale(1.1);"
        case "bottom":
          return "translateX(-50%) scale(1.1);"
        case "left":
          return "translateY(-50%) scale(1.1);"
        default:
          return "scale(1.1);"
      }
    }};
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    font-size: 1.2rem;
  }
`

const ModuleInfo = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  padding: 2rem;
  max-width: 400px;
  margin: 0 auto;
  text-align: left;
`

const ModuleName = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #667eea;
`

const ModuleDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  opacity: 0.9;
  margin-bottom: 1rem;
`

const ModuleSpecs = styled.ul`
  list-style: none;
  padding: 0;
  
  li {
    padding: 0.3rem 0;
    font-size: 0.9rem;
    opacity: 0.8;
    
    &::before {
      content: '•';
      color: #667eea;
      margin-right: 0.5rem;
    }
  }
`

const modules = [
  {
    id: "camera",
    position: "top",
    icon: "📷",
    name: "Pro Camera Module",
    description: "Professional-grade camera with optical zoom, night mode, and 4K video recording.",
    specs: ["50MP main sensor", "3x optical zoom", "Night mode", "4K 60fps video"],
  },
  {
    id: "battery",
    position: "right",
    icon: "🔋",
    name: "Extended Battery",
    description: "Double your battery life with this high-capacity power module.",
    specs: ["5000mAh capacity", "Fast charging", "Wireless charging", "48hr battery life"],
  },
  {
    id: "speaker",
    position: "bottom",
    icon: "🔊",
    name: "Audio Boost",
    description: "Premium speakers with enhanced bass and crystal-clear audio.",
    specs: ["Stereo speakers", "Enhanced bass", "Noise cancellation", "Hi-Fi audio"],
  },
  {
    id: "health",
    position: "left",
    icon: "❤️",
    name: "Health Sensor",
    description: "Advanced health monitoring with heart rate, SpO2, and stress tracking.",
    specs: ["Heart rate monitor", "SpO2 sensor", "Stress tracking", "Sleep analysis"],
  },
]

export default function ModularShowcase() {
  const [activeModule, setActiveModule] = useState<string | null>(null)
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true })

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

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
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

  const phoneVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        duration: 1,
      },
    },
  }

  const moduleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 15,
      },
    },
  }

  return (
    <ShowcaseContainer ref={ref}>
      <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
        <ShowcaseTitle variants={itemVariants}>Interactive Modules</ShowcaseTitle>

        <ShowcaseSubtitle variants={itemVariants}>
          Click on any module slot to see how Project Ara adapts to your needs
        </ShowcaseSubtitle>

        <PhoneContainer>
          <PhoneBase variants={phoneVariants}>
            {modules.map((module) => (
              <ModuleSlot
                key={module.id}
                $position={module.position}
                $active={activeModule === module.id}
                variants={moduleVariants}
                onClick={() => setActiveModule(activeModule === module.id ? null : module.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {module.icon}
              </ModuleSlot>
            ))}
          </PhoneBase>
        </PhoneContainer>

        <AnimatePresence mode="wait">
          {activeModule && (
            <ModuleInfo
              key={activeModule}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
            >
              {(() => {
                const module = modules.find((m) => m.id === activeModule)
                if (!module) return null

                return (
                  <>
                    <ModuleName>{module.name}</ModuleName>
                    <ModuleDescription>{module.description}</ModuleDescription>
                    <ModuleSpecs>
                      {module.specs.map((spec, index) => (
                        <li key={index}>{spec}</li>
                      ))}
                    </ModuleSpecs>
                  </>
                )
              })()}
            </ModuleInfo>
          )}
        </AnimatePresence>
      </motion.div>
    </ShowcaseContainer>
  )
}
