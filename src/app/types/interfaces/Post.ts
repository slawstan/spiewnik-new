import { SafeHtml } from "@angular/platform-browser"

export interface Post {
  id?: number
  title?: {rendered: string}
  content?: {rendered: SafeHtml}
  rendered: SafeHtml
}
