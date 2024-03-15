import React from 'react';

const SkeletonUser: React.FC = () => {
    return (
        <div className="h-16 min-w-[300px] rounded-md bg-gray-200 dark:bg-gray-500 w-full"></div>
    )
}
const SkeletonUsers: React.FC = () => {

    return (
        <div role="status" className="h-full w-full animate-pulse flex items-center flex-col gap-3">
            {[...Array(3)].map((_, index) => <SkeletonUser key={index} />)}
            <span className="sr-only">Loading...</span>
        </div>
    );
};

export default SkeletonUsers