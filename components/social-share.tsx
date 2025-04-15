"use client"

import { useLanguage } from "@/lib/i18n/context"
import { Facebook, Twitter, Linkedin, Send, Link2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

interface SocialShareProps {
  url: string
  title: string
}

export function SocialShare({ url, title }: SocialShareProps) {
  const { language } = useLanguage()
  const fullUrl = `https://adb-solution.com${url}`

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`, "_blank")
  }

  const shareToTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(title)}`,
      "_blank",
    )
  }

  const shareToLinkedin = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`, "_blank")
  }

  const shareToTelegram = () => {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(title)}`, "_blank")
  }

  const copyLink = () => {
    navigator.clipboard.writeText(fullUrl).then(() => {
      toast({
        title: language === "ru" ? "Ссылка скопирована" : "Link copied",
        description: language === "ru" ? "Ссылка скопирована в буфер обмена" : "Link copied to clipboard",
      })
    })
  }

  return (
    <div className="flex flex-wrap gap-2 my-6">
      <div className="text-sm text-gray-500 w-full mb-2">{language === "ru" ? "Поделиться:" : "Share:"}</div>
      <Button variant="outline" size="sm" className="rounded-full" onClick={shareToFacebook}>
        <Facebook className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline">Facebook</span>
      </Button>

      <Button variant="outline" size="sm" className="rounded-full" onClick={shareToTwitter}>
        <Twitter className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline">Twitter</span>
      </Button>

      <Button variant="outline" size="sm" className="rounded-full" onClick={shareToLinkedin}>
        <Linkedin className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline">LinkedIn</span>
      </Button>

      <Button variant="outline" size="sm" className="rounded-full" onClick={shareToTelegram}>
        <Send className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline">Telegram</span>
      </Button>

      <Button variant="outline" size="sm" className="rounded-full" onClick={copyLink}>
        <Link2 className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline">{language === "ru" ? "Копировать" : "Copy"}</span>
      </Button>
    </div>
  )
}
