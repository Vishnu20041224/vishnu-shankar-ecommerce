import { Heart, Star, StarHalf, Loader2, Circle, Package, ShoppingCart } from 'lucide-react';

const RatingStars = (rating) => {
    // Convert rating to number safely
    const num = Number(rating);

    // If invalid → give 0 rating
    const safeRating = Math.min(Math.max(isNaN(num) ? 0 : num, 0), 5);

    const full = Math.floor(safeRating);
    const half = safeRating - full >= 0.5 ? 1 : 0;
    const empty = Math.max(5 - full - half, 0); // ensure NON-negative

    return (
        <div className="flex items-center gap-1 border w-fit p-1 rounded-sm">
            {/* FULL stars */}
            {[...Array(full)].map((_, i) => (
                <Star  key={`full-${i}`} className="text-green-700 fill-green-700 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            ))}

            {/* HALF star */}
            {half === 1 && (
                <StarHalf  className="text-green-700 fill-green-700 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            )}

            {/* EMPTY stars */}
            {[...Array(empty)].map((_, i) => (
                <Star  key={`empty-${i}`} className="text-green-700 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            ))}

            {/* Rating number */}
            <span className="text-green-700 ml-2 text-[8px] md:text-sm font-bold">
                {safeRating.toFixed(1)}
            </span>
        </div>
    );
}

export default RatingStars