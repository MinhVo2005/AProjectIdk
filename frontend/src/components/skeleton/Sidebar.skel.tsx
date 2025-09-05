import { Users } from "lucide-react";


const SidebarSkeleton = () => {
  return (
    <div className="flex flex-col border-r-2 w-90 shrink-0 max-lg:w-50 max-sm:hidden h-full">
      {/* Header */}
      <div className='flex items-center border-b-2 justify-center'>
            <Users className="w-6 h-6" />
            <p className='text-xl text-center p-4 '>Contact</p>
      </div>

      {/* Contact list skeleton */}
      <div className="flex flex-col-reverse overflow-y-auto w-full p-2 space-y-4 space-y-reverse">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-center rounded-xl p-3 animate-pulse"
          >
            {/* Avatar */}
            <div className="relative h-16 w-16 flex shrink-0 overflow-clip m-2">
              <div className="w-full h-full rounded-full bg-gray-300 dark:bg-gray-600" />
            </div>

            {/* Name + status */}
            <div className="max-lg:hidden flex-1 min-w-0">
              <div className="w-24 h-5 bg-gray-300 dark:bg-gray-600 rounded mb-2" />
              <div className="w-16 h-3 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarSkeleton;
