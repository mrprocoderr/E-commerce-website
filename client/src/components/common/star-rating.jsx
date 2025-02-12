
import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

function StarRatingComponent({ rating = 0, handleRatingChange = () => {} }) {
  console.log(rating, "rating");
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Button
          key={star}
          className={`p-2 rounded-full transition-colors ${
            star <= rating
              ? "bg-yellow-400 text-yellow-900 hover:bg-yellow-500"
                  : "bg-gray-100 hover:bg-gray-200"
          }`}
          // variant="outline"
          size="icon"
          onClick={() => handleRatingChange(star)}
          aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
        >
          <StarIcon
            className={`w-6 h-6 ${
              star <= rating ? "fill-yellow-500" : "fill-black"
            }`}
          />
        </Button>
      ))}
    </div>
  );
}

export default StarRatingComponent;
