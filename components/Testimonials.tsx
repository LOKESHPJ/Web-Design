"use client"

import { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { motion, AnimatePresence, useInView } from "framer-motion"

const TestimonialsContainer = styled.section`
  padding: 8rem 2rem;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2.5rem, 6vw, 4rem);
  margin-bottom: 4rem;
  background: linear-gradient(135deg, #ffffff 0%, #667eea 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const TestimonialCarousel = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    height: 300px;
  }
`

const TestimonialCard = styled(motion.div)`
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 3rem;
  max-width: 600px;
  width: 100%;
  text-align: center;

  @media (max-width: 768px) {
    padding: 2rem;
    margin: 0 1rem;
  }
`

const TestimonialText = styled.p`
  font-size: 1.3rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  font-style: italic;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`

const AuthorAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
`

const AuthorInfo = styled.div`
  text-align: left;
`

const AuthorName = styled.h4`
  font-size: 1.1rem;
  margin-bottom: 0.2rem;
`

const AuthorTitle = styled.p`
  font-size: 0.9rem;
  opacity: 0.7;
`

const CarouselDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 3rem;
`

const Dot = styled(motion.button)<{ $active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${(props) => (props.$active ? "#667eea" : "rgba(255, 255, 255, 0.3)")};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #667eea;
    transform: scale(1.2);
  }
`

const testimonials = [
  {
    text: "Project Ara is the future of smartphones. Being able to swap out my camera module for different shoots has revolutionized my photography workflow.",
    author: "Alex Chen",
    title: "Professional Photographer",
    avatar: "AC",
  },
  {
    text: "Finally, a phone that adapts to my needs instead of forcing me to adapt to it. The modular design is pure genius.",
    author: "Maria Rodriguez",
    title: "Tech Journalist, Wired",
    avatar: "MR",
  },
  {
    text: "As a developer, having specialized modules for different projects is incredible. The health sensor module alone has opened up so many possibilities.",
    author: "David Kim",
    title: "App Developer",
    avatar: "DK",
  },
  {
    text: "Project Ara isn't just a phone - it's a platform. The sustainability aspect alone makes this a game-changer for the industry.",
    author: "Sarah Johnson",
    title: "Environmental Tech Analyst",
    avatar: "SJ",
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const cardVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.8,
      },
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.8,
      },
    }),
  }

  const titleVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  }

  return (
    <TestimonialsContainer ref={ref}>
      <SectionTitle variants={titleVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
        What People Are Saying
      </SectionTitle>

      <TestimonialCarousel>
        <AnimatePresence mode="wait" custom={1}>
          <TestimonialCard
            key={currentIndex}
            custom={1}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 20px 60px rgba(102, 126, 234, 0.2)",
            }}
          >
            <TestimonialText>"{testimonials[currentIndex].text}"</TestimonialText>

            <TestimonialAuthor>
              <AuthorAvatar>{testimonials[currentIndex].avatar}</AuthorAvatar>
              <AuthorInfo>
                <AuthorName>{testimonials[currentIndex].author}</AuthorName>
                <AuthorTitle>{testimonials[currentIndex].title}</AuthorTitle>
              </AuthorInfo>
            </TestimonialAuthor>
          </TestimonialCard>
        </AnimatePresence>
      </TestimonialCarousel>

      <CarouselDots>
        {testimonials.map((_, index) => (
          <Dot
            key={index}
            $active={index === currentIndex}
            onClick={() => setCurrentIndex(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </CarouselDots>
    </TestimonialsContainer>
  )
}
