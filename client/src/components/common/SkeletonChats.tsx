import React from 'react';

const SkeletonChat: React.FC = () => {
    return (
        <div className="h-16 rounded-md bg-gray-200 dark:bg-gray-500 w-full"></div>
    )
}
const SkeletonChats: React.FC = () => {

    return (
        <div role="status" className="h-full w-full animate-pulse flex items-center flex-col gap-3">
            {[...Array(10)].map((_, index) => <SkeletonChat key={index} />)}
            <span className="sr-only">Loading...</span>
        </div>
    );
};

export default SkeletonChats