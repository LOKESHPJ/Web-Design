"use client"

import type React from "react"

import { useState, useRef } from "react"
import styled from "styled-components"
import { motion, useInView } from "framer-motion"

const FormContainer = styled.section`
  padding: 8rem 2rem;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`

const FormTitle = styled(motion.h2)`
  font-size: clamp(2.5rem, 6vw, 4rem);
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #ffffff 0%, #667eea 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const FormSubtitle = styled(motion.p)`
  font-size: 1.3rem;
  margin-bottom: 3rem;
  opacity: 0.8;
  line-height: 1.6;
`

const Form = styled(motion.form)`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const EmailInput = styled(motion.input)`
  flex: 1;
  padding: 1.2rem 1.5rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: white;
  font-size: 1.1rem;
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    border-color: #667eea;
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 20px rgba(102, 126, 234, 0.3);
  }
`

const SubmitButton = styled(motion.button)`
  padding: 1.2rem 2.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  white-space: nowrap;

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
    padding: 1.2rem 2rem;
  }
`

const SuccessMessage = styled(motion.div)`
  background: rgba(34, 197, 94, 0.2);
  border: 1px solid rgba(34, 197, 94, 0.3);
  border-radius: 15px;
  padding: 1.5rem;
  margin-top: 2rem;
  color: #22c55e;
  font-weight: 500;
`

const PrivacyNote = styled(motion.p)`
  font-size: 0.9rem;
  opacity: 0.6;
  margin-top: 1rem;
  line-height: 1.5;
`

export default function WaitlistForm() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitted(true)
    setIsLoading(false)
    setEmail("")
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
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

  const inputVariants = {
    focus: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
    blur: {
      scale: 1,
      transition: { duration: 0.2 },
    },
  }

  const buttonVariants = {
    idle: { scale: 1 },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 30px rgba(102, 126, 234, 0.4)",
    },
    tap: { scale: 0.95 },
    loading: {
      scale: 1,
      rotate: [0, 360],
      transition: {
        rotate: {
          duration: 1,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        },
      },
    },
  }

  return (
    <FormContainer ref={ref}>
      <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
        <FormTitle variants={itemVariants}>Join the Modular Revolution</FormTitle>

        <FormSubtitle variants={itemVariants}>
          Be among the first to experience the future of smartphones. Get exclusive early access to Project Ara and help
          shape the modular ecosystem.
        </FormSubtitle>

        {!isSubmitted ? (
          <>
            <Form variants={itemVariants} onSubmit={handleSubmit}>
              <EmailInput
                type="email"
                placeholder="Enter your email for early access"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                variants={inputVariants}
                whileFocus="focus"
                initial="blur"
                animate="blur"
              />

              <SubmitButton
                type="submit"
                disabled={isLoading}
                variants={buttonVariants}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
                animate={isLoading ? "loading" : "idle"}
              >
                {isLoading ? "⟳" : "Get Early Access"}
              </SubmitButton>
            </Form>

            <PrivacyNote variants={itemVariants}>
              We respect your privacy. Unsubscribe at any time. No spam, just exclusive updates about our launch.
            </PrivacyNote>
          </>
        ) : (
          <SuccessMessage
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
          >
            🎉 Welcome to the future! You&apos;ll be notified when Project Ara launches.
          </SuccessMessage>
        )}
      </motion.div>
    </FormContainer>
  )
}
