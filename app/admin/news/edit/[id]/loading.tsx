import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex justify-center items-center py-20">
      <Loader2 className="h-10 w-10 animate-spin text-[#cdb32f]" />
      <span className="ml-3 text-xl font-medium text-gray-700">Загрузка новости...</span>
    </div>
  )
}
