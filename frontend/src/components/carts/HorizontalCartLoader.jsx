import { Skeleton } from "@/components/ui/skeleton"
const HorizontalCartLoader = () => {
    return (
        <>
            <div className="grid grid-cols-8 gap-2 md:my-3 my-1 border-4 border-gray-100 max-w-5xl mx-auto rounded-2xl items-center md:p-3 py-2 px-1 relative animate-pulse">

                {/* Image Skeleton */}
                <div className="col-span-2 md:col-span-2 w-20 h-20 sm:w-36 sm:h-36 md:w-48 md:h-48 lg:w-64 lg:h-64 flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden">
                    <Skeleton className="w-full h-full rounded-xl bg-gray-300 dark:bg-gray-700" />
                </div>

                {/* Content Skeleton */}
                <div className="col-span-6 md:col-span-6 space-y-3 px-2">

                    {/* Title */}
                    <Skeleton className="h-5 md:h-7 w-[90%] bg-gray-300 dark:bg-gray-700" />

                    {/* Rating */}
                    <Skeleton className="h-4 w-28 bg-gray-300 dark:bg-gray-700" />

                    {/* Price row */}
                    <div className="flex gap-2 items-end">
                        <Skeleton className="h-6 w-24 bg-gray-300 dark:bg-gray-700" />
                        <Skeleton className="h-4 w-16 bg-gray-300 dark:bg-gray-700" />
                        <Skeleton className="h-4 w-14 bg-gray-300 dark:bg-gray-700" />
                    </div>

                    {/* Delivery text */}
                    <Skeleton className="h-4 w-48 bg-gray-300 dark:bg-gray-700" />

                    {/* Buttons */}
                    <div className="flex gap-3 mt-3">
                        <Skeleton className="h-9 w-28 rounded-md bg-gray-300 dark:bg-gray-700" />
                        <Skeleton className="h-9 w-28 rounded-md bg-gray-300 dark:bg-gray-700" />
                    </div>
                </div>

                {/* Wishlist Icon */}
                <Skeleton className="absolute md:top-4 md:right-4 top-1 right-1 h-6 w-6 rounded-full bg-gray-300 dark:bg-gray-700" />

            </div>

            <div className="grid grid-cols-8 gap-2 md:my-3 my-1 border-4 border-gray-100 max-w-5xl mx-auto rounded-2xl items-center md:p-3 py-2 px-1 relative animate-pulse">

                {/* Image Skeleton */}
                <div className="col-span-2 md:col-span-2 w-20 h-20 sm:w-36 sm:h-36 md:w-48 md:h-48 lg:w-64 lg:h-64 flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden">
                    <Skeleton className="w-full h-full rounded-xl bg-gray-300 dark:bg-gray-700" />
                </div>

                {/* Content Skeleton */}
                <div className="col-span-6 md:col-span-6 space-y-3 px-2">

                    {/* Title */}
                    <Skeleton className="h-5 md:h-7 w-[90%] bg-gray-300 dark:bg-gray-700" />

                    {/* Rating */}
                    <Skeleton className="h-4 w-28 bg-gray-300 dark:bg-gray-700" />

                    {/* Price row */}
                    <div className="flex gap-2 items-end">
                        <Skeleton className="h-6 w-24 bg-gray-300 dark:bg-gray-700" />
                        <Skeleton className="h-4 w-16 bg-gray-300 dark:bg-gray-700" />
                        <Skeleton className="h-4 w-14 bg-gray-300 dark:bg-gray-700" />
                    </div>

                    {/* Delivery text */}
                    <Skeleton className="h-4 w-48 bg-gray-300 dark:bg-gray-700" />

                    {/* Buttons */}
                    <div className="flex gap-3 mt-3">
                        <Skeleton className="h-9 w-28 rounded-md bg-gray-300 dark:bg-gray-700" />
                        <Skeleton className="h-9 w-28 rounded-md bg-gray-300 dark:bg-gray-700" />
                    </div>
                </div>

                {/* Wishlist Icon */}
                <Skeleton className="absolute md:top-4 md:right-4 top-1 right-1 h-6 w-6 rounded-full bg-gray-300 dark:bg-gray-700" />

            </div>

            <div className="grid grid-cols-8 gap-2 md:my-3 my-1 border-4 border-gray-100 max-w-5xl mx-auto rounded-2xl items-center md:p-3 py-2 px-1 relative animate-pulse">

                {/* Image Skeleton */}
                <div className="col-span-2 md:col-span-2 w-20 h-20 sm:w-36 sm:h-36 md:w-48 md:h-48 lg:w-64 lg:h-64 flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden">
                    <Skeleton className="w-full h-full rounded-xl bg-gray-300 dark:bg-gray-700" />
                </div>

                {/* Content Skeleton */}
                <div className="col-span-6 md:col-span-6 space-y-3 px-2">

                    {/* Title */}
                    <Skeleton className="h-5 md:h-7 w-[90%] bg-gray-300 dark:bg-gray-700" />

                    {/* Rating */}
                    <Skeleton className="h-4 w-28 bg-gray-300 dark:bg-gray-700" />

                    {/* Price row */}
                    <div className="flex gap-2 items-end">
                        <Skeleton className="h-6 w-24 bg-gray-300 dark:bg-gray-700" />
                        <Skeleton className="h-4 w-16 bg-gray-300 dark:bg-gray-700" />
                        <Skeleton className="h-4 w-14 bg-gray-300 dark:bg-gray-700" />
                    </div>

                    {/* Delivery text */}
                    <Skeleton className="h-4 w-48 bg-gray-300 dark:bg-gray-700" />

                    {/* Buttons */}
                    <div className="flex gap-3 mt-3">
                        <Skeleton className="h-9 w-28 rounded-md bg-gray-300 dark:bg-gray-700" />
                        <Skeleton className="h-9 w-28 rounded-md bg-gray-300 dark:bg-gray-700" />
                    </div>
                </div>

                {/* Wishlist Icon */}
                <Skeleton className="absolute md:top-4 md:right-4 top-1 right-1 h-6 w-6 rounded-full bg-gray-300 dark:bg-gray-700" />

            </div>

            <div className="grid grid-cols-8 gap-2 md:my-3 my-1 border-4 border-gray-100 max-w-5xl mx-auto rounded-2xl items-center md:p-3 py-2 px-1 relative animate-pulse">

                {/* Image Skeleton */}
                <div className="col-span-2 md:col-span-2 w-20 h-20 sm:w-36 sm:h-36 md:w-48 md:h-48 lg:w-64 lg:h-64 flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden">
                    <Skeleton className="w-full h-full rounded-xl bg-gray-300 dark:bg-gray-700" />
                </div>

                {/* Content Skeleton */}
                <div className="col-span-6 md:col-span-6 space-y-3 px-2">

                    {/* Title */}
                    <Skeleton className="h-5 md:h-7 w-[90%] bg-gray-300 dark:bg-gray-700" />

                    {/* Rating */}
                    <Skeleton className="h-4 w-28 bg-gray-300 dark:bg-gray-700" />

                    {/* Price row */}
                    <div className="flex gap-2 items-end">
                        <Skeleton className="h-6 w-24 bg-gray-300 dark:bg-gray-700" />
                        <Skeleton className="h-4 w-16 bg-gray-300 dark:bg-gray-700" />
                        <Skeleton className="h-4 w-14 bg-gray-300 dark:bg-gray-700" />
                    </div>

                    {/* Delivery text */}
                    <Skeleton className="h-4 w-48 bg-gray-300 dark:bg-gray-700" />

                    {/* Buttons */}
                    <div className="flex gap-3 mt-3">
                        <Skeleton className="h-9 w-28 rounded-md bg-gray-300 dark:bg-gray-700" />
                        <Skeleton className="h-9 w-28 rounded-md bg-gray-300 dark:bg-gray-700" />
                    </div>
                </div>

                {/* Wishlist Icon */}
                <Skeleton className="absolute md:top-4 md:right-4 top-1 right-1 h-6 w-6 rounded-full bg-gray-300 dark:bg-gray-700" />

            </div>
        </>

    )
}

export default HorizontalCartLoader