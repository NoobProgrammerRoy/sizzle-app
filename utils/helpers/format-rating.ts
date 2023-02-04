export function formatRating(rating: number) {
	if (rating % 2 === 0) {
		return rating;
	}
	return +rating.toPrecision(3);
}
