import { readFileSync, statSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function readDesktopRelease(manifestName: string) {
  const manifestUrl = new URL(`./public/updates/${manifestName}.json`, import.meta.url)
  const { version, download_url } = JSON.parse(readFileSync(manifestUrl, 'utf8')) as {
    version: string
    download_url: string
  }
  const downloadPath = new URL(download_url).pathname
  const bytes = statSync(new URL(`./public${downloadPath}`, import.meta.url)).size
  return { version, downloadPath, sizeMb: (bytes / 1_000_000).toFixed(1) }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __DESKTOP_RELEASES__: JSON.stringify({
      scoreboard: readDesktopRelease('scoreboard-version'),
      obsController: readDesktopRelease('obs-controller-version'),
    }),
  },
})
