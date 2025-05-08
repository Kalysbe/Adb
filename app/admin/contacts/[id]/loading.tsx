export default function ContactDetailLoading() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
        <div className="flex space-x-3">
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b bg-gray-50">
          <div className="h-7 w-64 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="col-span-1">
                <div className="h-5 w-20 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-7 w-full bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
            <div className="col-span-2">
              <div className="h-5 w-20 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-32 w-full bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
