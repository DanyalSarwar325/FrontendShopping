
import React from "react";
 export const Reviews = () => {
  // Sample review data
  const reviews = [
    {
      name: "Nur-Asia M Disumimba",
      date: "Jun 24, 2024",
      countryFlag: "🇸🇦",
      stars: 5,
      review: "Perfect summer pumps, all good as expected, nice and comfortable.",
    },
    {
      name: "Maneeha Baig",
      date: "Jul 24, 2024",
      countryFlag: "🇦🇪",
      stars: 5,
      review: "Nice and comfortable, love these, all good as expected.",
    },
    {
      name: "Ba***na",
      date: "Jul 25, 2024",
      countryFlag: "🇮🇳",
      stars: 5,
      review: "It seems comfortable at first. Nicely crafted.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <button className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-full hover:bg-gray-100 focus:ring">
          Summer Outfits (1)
        </button>
        <button className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-full hover:bg-gray-100 focus:ring">
          Comfortable (2)
        </button>
        <button className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-full hover:bg-gray-100 focus:ring">
          Good (4)
        </button>
      </div>

      {/* Review Cards */}
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-4 bg-gray-50 border border-gray-200 rounded-lg"
          >
            {/* User Avatar */}
            <div className="w-10 h-10 flex items-center justify-center bg-gray-300 text-white font-bold text-lg rounded-full">
              {review.name[0]}
            </div>

            {/* Review Content */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm font-semibold">
                  {review.name} <span className="text-gray-500">in {review.countryFlag}</span>
                </div>
                <div className="text-sm text-gray-500">{review.date}</div>
              </div>

              {/* Star Rating */}
              <div className="flex mb-2">
                {Array(review.stars)
                  .fill(0)
                  .map((_, starIndex) => (
                    <span key={starIndex} className="text-yellow-400">★</span>
                  ))}
              </div>

              {/* Review Text */}
              <p className="text-sm text-gray-700">{review.review}</p>
            </div>
          </div>
        ))}
      </div>

      {/* See All Reviews Button */}
      <div className="text-center mt-6">
        <button className="px-6 py-2 text-sm font-semibold text-white bg-gray-800 rounded-full hover:bg-gray-900">
          See all reviews
        </button>
      </div>
    </div>
  );
};

