export const FETCHING_COINS_PENDING = 'FETCHING_COINS_PENDING';
export const FETCHING_COINS_SUCCESS = 'FETCHING_COINS_SUCCESS';
export const FETCHING_COINS_FAIL = 'FETCHING_COINS_FAIL';

const initialState = {
	coins: [],
	isLoading: false,
	error: false,
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
		default:
			return state;
	}
};

export default coinListReducer;

export const coinsSelector = (state) => state.coinList.coins;
export const loadingSelector = (state) => state.coinList.isLoading;
export const errorSelector = (state) => state.coinList.error;
