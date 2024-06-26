import { createRoot } from 'react-dom/client'
import { App } from './app/app'
import './index.css'

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(<App />)
