"use client"

import { useRef } from "react"
import styled from "styled-components"
import { motion, useInView } from "framer-motion"

const FooterContainer = styled.footer`
  padding: 4rem 2rem 2rem;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(20px);

  @media (max-width: 768px) {
    padding: 3rem 1rem 2rem;
  }
`

const FooterContent = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
`

const FooterLinks = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`

const FooterLink = styled(motion.a)`
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.1rem;
  transition: all 0.3s ease;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    transition: width 0.3s ease;
  }

  &:hover {
    color: white;
    &::after {
      width: 100%;
    }
  }
`

const SocialLinks = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 3rem;
`

const SocialIcon = styled(motion.div)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    transform: translateY(-3px);
  }
`

const Copyright = styled(motion.p)`
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
  margin-bottom: 1rem;
`

const CompanyName = styled(motion.div)`
  font-size: 1.5rem;
  font-weight: bold;
  background: linear-gradient(135deg, #ffffff 0%, #667eea 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 2rem;
`

const footerLinks = [
  { name: "About", href: "#" },
  { name: "Privacy", href: "#" },
  { name: "Terms", href: "#" },
  { name: "Contact", href: "#" },
  { name: "Support", href: "#" },
]

const socialIcons = [
  { icon: "𝕏", name: "Twitter" },
  { icon: "📘", name: "Facebook" },
  { icon: "📷", name: "Instagram" },
  { icon: "💼", name: "LinkedIn" },
]

export default function Footer() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
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

  const linkVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 15,
      },
    },
  }

  const socialVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
  }

  return (
    <FooterContainer ref={ref}>
      <FooterContent variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
        <CompanyName variants={itemVariants}>Project Ara</CompanyName>

        <FooterLinks variants={itemVariants}>
          {footerLinks.map((link, index) => (
            <FooterLink
              key={link.name}
              href={link.href}
              variants={linkVariants}
              whileHover={{ y: -2 }}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              {link.name}
            </FooterLink>
          ))}
        </FooterLinks>

        <SocialLinks variants={itemVariants}>
          {socialIcons.map((social, index) => (
            <SocialIcon
              key={social.name}
              variants={socialVariants}
              whileHover={{
                scale: 1.1,
                y: -3,
                boxShadow: "0 10px 25px rgba(102, 126, 234, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              {social.icon}
            </SocialIcon>
          ))}
        </SocialLinks>

        <Copyright variants={itemVariants}>
          © {new Date().getFullYear()} Project Ara by Google. All rights reserved.
        </Copyright>
      </FooterContent>
    </FooterContainer>
  )
}
