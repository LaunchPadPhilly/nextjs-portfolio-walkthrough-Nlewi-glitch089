import { describe, it, expect } from 'vitest'

// EC2 smoke test — only runs when EC2_HOST is provided in env
// Usage locally: EC2_HOST=ec2.example.com npm run test:ec2

describe('EC2 Smoke Check', () => {
  const host = process.env.EC2_HOST
  if (!host) {
    it('skipped - set EC2_HOST to run EC2 smoke checks', () => {
      expect(true).toBe(true)
    })
    return
  }

  it(
    'should respond with 2xx from the EC2 host root',
    { timeout: 30_000 },
    async () => {
      const protocol = process.env.EC2_PROTOCOL || 'http'
      const url = `${protocol}://${host}`
      const res = await fetch(url, { cache: 'no-store' })
      expect(res.ok, `Expected ${url} to return 2xx`).toBe(true)
    }
  )
})
