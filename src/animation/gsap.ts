import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, Flip, DrawSVGPlugin, useGSAP)
export { gsap, ScrollTrigger, Flip, useGSAP }
export const motionQuery = '(prefers-reduced-motion: no-preference)'

export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({
    behavior: window.matchMedia(motionQuery).matches ? 'smooth' : 'instant',
    block: 'start',
  })
}
