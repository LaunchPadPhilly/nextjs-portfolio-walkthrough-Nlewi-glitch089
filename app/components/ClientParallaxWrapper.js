"use client"

import { useRef } from 'react'
import Parallax from './Parallax'

export default function ClientParallaxWrapper() {
  const cosmicRef = useRef(null)

  return (
    <>
      <div className="cosmic-bg" aria-hidden="true" ref={cosmicRef}>
        <div className="gradient" />
        <div className="nebula" />
        <div className="stars" />
      </div>
      <Parallax cosmicRef={cosmicRef} />
    </>
  )
}
