import React from 'react'

const ThreadSkeleton = () => {
    function Skeleton() {
        return (
        
                <div className='flex w-full items-center px-5 py-10 rounded-xl bg-dark-2 gap-3'>
                    <div className='md:h-10 md:w-10 rounded-full bg-gray-500 h-6 w-6 mb-2.5'></div>
                    <div className=''>
                        <div className="md:h-6 h-3 bg-gray-300 rounded-full w-48 mb-2.5"></div>
                        <div className="w-32 h-2 bg-gray-500 rounded-full "></div>
                    </div>
                </div>
        )
    }
    return (
        <div role="status" className="flex flex-col justify-center space-y-4 divide-y divide-gray-700 shadow animate-pulse mt-6">
            {[...Array(5)].map((_, index)=> <Skeleton key={index} />)}
            <span className="sr-only">Loading...</span>
        </div>

    )
}

export default ThreadSkeleton