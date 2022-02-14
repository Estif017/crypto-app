const axios = require('axios');
const {
	FETCHING_COINS_PENDING,
	FETCHING_COINS_SUCCESS,
	FETCHING_COINS_FAIL,
} = require('.');

export const getCoins = () => async (dispatch, getState) => {
	try {
		dispatch({ type: FETCHING_COINS_PENDING });
		const { data } = await axios.get(
			'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d'
		);
		dispatch({ type: FETCHING_COINS_SUCCESS, payload: data });
	} catch (err) {
		dispatch({ type: FETCHING_COINS_FAIL });
	}
};
