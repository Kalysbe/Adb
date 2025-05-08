import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <div className="h-10 w-64 bg-gray-200 animate-pulse rounded-md"></div>
        <div className="h-10 w-40 bg-gray-200 animate-pulse rounded-md"></div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="h-10 flex-1 bg-gray-200 animate-pulse rounded-md"></div>
        <div className="h-10 w-24 bg-gray-200 animate-pulse rounded-md"></div>
      </div>

      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-10 w-10 animate-spin text-[#cdb32f]" />
        <span className="ml-3 text-xl font-medium text-gray-700">Загрузка новостей...</span>
      </div>
    </div>
  )
}
