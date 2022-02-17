const axios = require('axios');
const {
	FETCHING_COINS_PENDING,
	FETCHING_COINS_SUCCESS,
	FETCHING_COINS_FAIL,
	SORT_BY_PRICE_ASC,
	SORT_BY_PRICE_DESC,
	SORT_BY_1HR_PRICE_PERCENTAGE_ASC,
	SORT_BY_1HR_PRICE_PERCENTAGE_DESC,
	SORT_BY_24HR_PRICE_PERCENTAGE_ASC,
	SORT_BY_24HR_PRICE_PERCENTAGE_DESC,
	SORT_BY_7D_PRICE_PERCENTAGE_ASC,
	SORT_BY_7D_PRICE_PERCENTAGE_DESC,
} = require('.');

export const getCoins = () => async (dispatch, getState) => {
	try {
		dispatch({ type: FETCHING_COINS_PENDING });
		const { data } = await axios.get(
			'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d'
		);
		dispatch({ type: FETCHING_COINS_SUCCESS, payload: data });
	} catch (err) {
		dispatch({ type: FETCHING_COINS_FAIL });
	}
};

export const sortByPriceAsc = () => ({ type: SORT_BY_PRICE_ASC });
export const sortByPriceDesc = () => ({ type: SORT_BY_PRICE_DESC });
export const sortBy1hrPriceAsc = () => ({
	type: SORT_BY_1HR_PRICE_PERCENTAGE_ASC,
});
export const sortBy1hrPriceDesc = () => ({
	type: SORT_BY_1HR_PRICE_PERCENTAGE_DESC,
});
export const sortBy24hrPriceAsc = () => ({
	type: SORT_BY_24HR_PRICE_PERCENTAGE_ASC,
});
export const sortBy24hrPriceDesc = () => ({
	type: SORT_BY_24HR_PRICE_PERCENTAGE_DESC,
});
export const sortBy7DPriceAsc = () => ({
	type: SORT_BY_7D_PRICE_PERCENTAGE_ASC,
});
export const sortBy7DPriceDesc = () => ({
	type: SORT_BY_7D_PRICE_PERCENTAGE_DESC,
});
