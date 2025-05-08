export default function ContactsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="h-8 w-64 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-10 w-40 bg-gray-200 rounded animate-pulse"></div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="h-10 w-full max-w-md bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse ml-4"></div>
        </div>

        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="h-6 w-1/4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 w-1/4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 w-1/6 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 w-1/6 bg-gray-200 rounded animate-pulse"></div>
              <div className="flex space-x-2">
                <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
