"use client"
import React from 'react'

export default function StarRating({ rating }: { rating: number }) {
	const roundedRating = Math.round(rating);

	return (
		<div className="flex">
			{Array.from({ length: 5 }, (_, index) => (
				<span
					key={index}
					className={`text-3xl ${index < roundedRating ? 'text-yellow-500' : 'text-gray-300'}`}
				>
					&#9733;
				</span>
			))}
		</div>
	);
}
