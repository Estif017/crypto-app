export const FETCHING_COINS_PENDING = 'FETCHING_COINS_PENDING';
export const FETCHING_COINS_SUCCESS = 'FETCHING_COINS_SUCCESS';
export const FETCHING_COINS_FAIL = 'FETCHING_COINS_FAIL';
export const SORT_BY_PRICE_ASC = 'SORT_BY_PRICE_ASC';
export const SORT_BY_PRICE_DESC = 'SORT_BY_PRICE_DESC';
export const SORT_BY_1HR_PRICE_PERCENTAGE_ASC =
	'SORT_BY_1HR_PRICE_PERCENTAGE_ASC';
export const SORT_BY_1HR_PRICE_PERCENTAGE_DESC =
	'SORT_BY_1HR_PRICE_PERCENTAGE_DESC';
export const SORT_BY_24HR_PRICE_PERCENTAGE_ASC =
	'SORT_BY_24HR_PRICE_PERCENTAGE_ASC';
export const SORT_BY_24HR_PRICE_PERCENTAGE_DESC =
	'SORT_BY_24HR_PRICE_PERCENTAGE_DESC';
export const SORT_BY_7D_PRICE_PERCENTAGE_ASC =
	'SORT_BY_7D_PRICE_PERCENTAGE_ASC';
export const SORT_BY_7D_PRICE_PERCENTAGE_DESC =
	'SORT_BY_7D_PRICE_PERCENTAGE_DESC';

const initialState = {
	coins: [],
	isLoading: false,
	error: false,
	sortPriceAsc: false,
	sortPriceDesc: false,
	sortPriceIn1hrAsc: false,
	sortPriceIn1hrDesc: false,
	sortPriceIn24hrAsc: false,
	sortPriceIn24hrDesc: false,
	sortPriceIn7dAsc: false,
	sortPriceIn7dDesc: false,
};

const coinListReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCHING_COINS_PENDING:
			return {
				...state,
				isLoading: true,
				error: false,
			};
		case FETCHING_COINS_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: false,
				coins: [...state.coins, ...action.payload],
			};
		case FETCHING_COINS_FAIL:
			return {
				...state,
				isLoading: false,
				error: true,
			};
		case SORT_BY_PRICE_ASC:
			const coinsSortedByPriceAsc = state.coins.sort(
				(a, b) => a.current_price - b.current_price
			);
			return {
				...state,
				coins: [...coinsSortedByPriceAsc],
				sortPriceAsc: false,
				sortPriceDesc: true,
			};
		case SORT_BY_PRICE_DESC:
			const coinsSortedByPriceDesc = state.coins.sort(
				(a, b) => b.current_price - a.current_price
			);
			return {
				...state,
				coins: [...coinsSortedByPriceDesc],
				sortPriceAsc: true,
				sortPriceDesc: false,
			};
		case SORT_BY_1HR_PRICE_PERCENTAGE_ASC:
			const sortCoinBy1hrPriceAsc = state.coins.sort(
				(a, b) =>
					a.price_change_percentage_1h_in_currency -
					b.price_change_percentage_1h_in_currency
			);
			return {
				...state,
				coins: [...sortCoinBy1hrPriceAsc],
				sortPriceIn1hrAsc: false,
				sortPriceIn1hrDesc: true,
			};
		case SORT_BY_1HR_PRICE_PERCENTAGE_DESC:
			const sortCoinBy1hrPriceDesc = state.coins.sort(
				(a, b) =>
					b.price_change_percentage_1h_in_currency -
					a.price_change_percentage_1h_in_currency
			);
			return {
				...state,
				coins: [...sortCoinBy1hrPriceDesc],
				sortPriceIn1hrAsc: true,
				sortPriceIn1hrDesc: false,
			};
		case SORT_BY_24HR_PRICE_PERCENTAGE_ASC:
			const sortCoinBy24hrPriceAsc = state.coins.sort(
				(a, b) =>
					a.price_change_percentage_24h_in_currency -
					b.price_change_percentage_24h_in_currency
			);
			return {
				...state,
				coins: [...sortCoinBy24hrPriceAsc],
				sortPriceIn24hrAsc: false,
				sortPriceIn24hrDesc: true,
			};
		case SORT_BY_24HR_PRICE_PERCENTAGE_DESC:
			const sortCoinBy24hrPriceDesc = state.coins.sort(
				(a, b) =>
					b.price_change_percentage_24h_in_currency -
					a.price_change_percentage_24h_in_currency
			);
			return {
				...state,
				coins: [...sortCoinBy24hrPriceDesc],
				sortPriceIn24hrAsc: true,
				sortPriceIn24hrDesc: false,
			};
		case SORT_BY_7D_PRICE_PERCENTAGE_ASC:
			const sortCoinBy7dPriceAsc = state.coins.sort(
				(a, b) =>
					a.price_change_percentage_7d_in_currency -
					b.price_change_percentage_7d_in_currency
			);
			return {
				coins: [...sortCoinBy7dPriceAsc],
				sortPriceIn7dAsc: false,
				sortPriceIn7dDesc: true,
			};
		case SORT_BY_7D_PRICE_PERCENTAGE_DESC:
			const sortCoinBy7dPriceDesc = state.coins.sort(
				(a, b) =>
					b.price_change_percentage_7d_in_currency -
					a.price_change_percentage_7d_in_currency
			);
			return {
				coins: [...sortCoinBy7dPriceDesc],
				sortPriceIn7dAsc: true,
				sortPriceIn7dDesc: false,
			};
		default:
			return state;
	}
};

export default coinListReducer;

export const coinsSelector = (state) => state.coinList.coins;
export const loadingSelector = (state) => state.coinList.isLoading;
export const errorSelector = (state) => state.coinList.error;
export const sortPriceAscSelector = (state) => state.coinList.sortPriceAsc;
export const sortPriceDescSelector = (state) => state.coinList.sortPriceDesc;
export const sortPriceIn1hrAscSelector = (state) =>
	state.coinList.sortPriceIn1hrAsc;
export const sortPriceIn1hrDescSelector = (state) =>
	state.coinList.sortPriceIn1hrDesc;
export const sortPriceIn24hrAscSelector = (state) =>
	state.coinList.sortPriceIn24hrAsc;
export const sortPriceIn24hrDescSelector = (state) =>
	state.coinList.sortPriceIn24hrDesc;
export const sortPriceIn7dAscSelector = (state) =>
	state.coinList.sortPriceIn7dAsc;
export const sortPriceIn7dDescSelector = (state) =>
	state.coinList.sortPriceIn7dDesc;
