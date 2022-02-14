export const FETCHING_COINS_PENDING = 'FETCHING_COINS_PENDING';
export const FETCHING_COINS_SUCCESS = 'FETCHING_COINS_SUCCESS';
export const FETCHING_COINS_FAIL = 'FETCHING_COINS_FAIL';
export const SORT_BY_PRICE_ASC = 'SORT_BY_PRICE_ASC';
export const SORT_BY_PRICE_DESC = 'SORT_BY_PRICE_DESC';

const initialState = {
	coins: [],
	isLoading: false,
	error: false,
	sortPriceAsc: true,
	sortPriceDesc: false,
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
