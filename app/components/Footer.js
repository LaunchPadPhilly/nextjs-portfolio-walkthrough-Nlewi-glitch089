import styles from './Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.left}>© {year} Nakerra — All rights reserved.</div>
      </div>
    </footer>
  )
}
