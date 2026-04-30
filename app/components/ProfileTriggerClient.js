"use client"

import Image from 'next/image'

export default function ProfileTriggerClient({ src = '/download.png', size = 88, className = '' }) {
  function openAdmin() {
    try {
      window.dispatchEvent(new Event('openAdmin'))
    } catch (e) {}
  }

  return (
    <button onClick={openAdmin} title="Open admin" style={{ border: 'none', padding: 0, background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className={className}>
      <Image src={src} alt="Profile" width={size} height={size} style={{ borderRadius: 999, objectFit: 'cover', display: 'block', aspectRatio: '1 / 1', overflow: 'hidden' }} />
    </button>
  )
}
