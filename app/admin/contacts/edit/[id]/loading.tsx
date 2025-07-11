export default function EditContactLoading() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-8 w-64 bg-gray-200 rounded animate-pulse"></div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(3)].map((_, index) => (
              <div key={index}>
                <div className="h-5 w-20 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
          <div>
            <div className="h-5 w-20 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-32 w-full bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex justify-end">
            <div className="h-10 w-40 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
