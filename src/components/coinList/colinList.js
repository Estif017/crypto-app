import { useEffect } from 'react';
import { Last7dChart, ProgressiveBar } from 'components';
import './coinList.css';
import { useDispatch, useSelector } from 'react-redux';
import {
	getCoins,
	sortByPriceAsc,
	sortByPriceDesc,
	sortBy1hrPriceAsc,
	sortBy1hrPriceDesc,
	sortBy24hrPriceAsc,
	sortBy24hrPriceDesc,
	sortBy7DPriceAsc,
	sortBy7DPriceDesc,
} from 'redux/coinListReducer/actions';
import {
	coinsSelector,
	errorSelector,
	loadingSelector,
	sortPriceAscSelector,
	sortPriceDescSelector,
	sortPriceIn1hrAscSelector,
	sortPriceIn1hrDescSelector,
	sortPriceIn24hrAscSelector,
	sortPriceIn24hrDescSelector,
	sortPriceIn7dAscSelector,
	sortPriceIn7dDescSelector,
} from 'redux/coinListReducer';

function kFormatter(num) {
	if (Math.abs(num) < 999) {
		return Math.sign(num) * Math.abs(num);
	} else if (Math.abs(num) > 999 && Math.abs(num) < 999999) {
		return Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'k';
	} else if (Math.abs(num) > 999999 && Math.abs(num) < 999999999) {
		return Math.sign(num) * (Math.abs(num) / 1000000).toFixed(1) + 'M';
	} else {
		return Math.sign(num) * (Math.abs(num) / 1000000000).toFixed(1) + 'B';
	}
}

const statusColor = (data) => (data > 0 ? '#00fc2a' : '#fe1040');

const ColinList = () => {
	const dispatch = useDispatch();
	const coins = useSelector(coinsSelector);
	const isLoading = useSelector(loadingSelector);
	const error = useSelector(errorSelector);
	const sortPriceAsc = useSelector(sortPriceAscSelector);
	const sortPriceDesc = useSelector(sortPriceDescSelector);
	const sortPriceIn1hrAsc = useSelector(sortPriceIn1hrAscSelector);
	const sortPriceIn1hrDesc = useSelector(sortPriceIn1hrDescSelector);
	const sortPriceIn24hrAsc = useSelector(sortPriceIn24hrAscSelector);
	const sortPriceIn24hrDesc = useSelector(sortPriceIn24hrDescSelector);
	const sortPriceIn7dAsc = useSelector(sortPriceIn7dAscSelector);
	const sortPriceIn7dDesc = useSelector(sortPriceIn7dDescSelector);

	const icon = (state1, state2, action1, action2) => (
		<i
			className={`fas  ${
				state1 || (state1 === false && state2 === false)
					? 'fas fa-sort-down price-asc'
					: 'fas fa-sort-up price-desc'
			}`}
			onClick={() =>
				state1 || (state1 === false && state2 === false)
					? dispatch(action1())
					: dispatch(action2())
			}
		/>
	);

	useEffect(() => {
		dispatch(getCoins());
		// eslint-disable-next-line
	}, []);
	return (
		<>
			{error && <h1>Error...</h1>}
			{isLoading && <h1>Loading...</h1>}
			<table>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th className='price'>
							{icon(
								sortPriceAsc,
								sortPriceDesc,
								sortByPriceAsc,
								sortByPriceDesc
							)}
							&#9; Price
						</th>
						<th className='in1hr'>
							{icon(
								sortPriceIn1hrAsc,
								sortPriceIn1hrDesc,
								sortBy1hrPriceAsc,
								sortBy1hrPriceDesc
							)}
							1h%
						</th>
						<th>
							{icon(
								sortPriceIn24hrAsc,
								sortPriceIn24hrDesc,
								sortBy24hrPriceAsc,
								sortBy24hrPriceDesc
							)}
							24h%
						</th>
						<th>
							{icon(
								sortPriceIn7dAsc,
								sortPriceIn7dDesc,
								sortBy7DPriceAsc,
								sortBy7DPriceDesc
							)}
							7d%
						</th>
						<th>24h Volume/Market Cap</th>
						<th>Circulating/Total Supply</th>
						<th>Last 7d</th>
					</tr>
				</thead>
				<tbody>
					{coins.map((coin, i) => {
						return (
							<tr key={coin.id}>
								<td>{i + 1}</td>
								<td>
									<div className='coin-name'>
										<img src={coin.image} alt='coin' />
										<p>{coin.name}</p>
										<p>({coin.symbol.toUpperCase()})</p>
									</div>
								</td>
								<td>${coin.current_price}</td>
								<td
									style={{
										color: statusColor(
											coin.price_change_percentage_1h_in_currency
										),
									}}>
									{coin.price_change_percentage_1h_in_currency.toFixed(2)}%
								</td>
								<td
									style={{
										color: statusColor(
											coin.price_change_percentage_24h_in_currency
										),
									}}>
									{coin.price_change_percentage_24h_in_currency.toFixed(2)}%
								</td>
								<td
									style={{
										color: statusColor(
											coin.price_change_percentage_7d_in_currency
										),
									}}>
									{coin.price_change_percentage_7d_in_currency.toFixed(2)}%
								</td>
								<td>
									<div className='value'>
										<span>{kFormatter(coin.total_volume)}</span>
										<span>{kFormatter(coin.market_cap)}</span>
									</div>
									<ProgressiveBar />
								</td>
								<td>
									<div className='value'>
										<span>{kFormatter(coin.circulating_supply)}</span>
										<span>{kFormatter(coin.total_supply)}</span>
									</div>
									<ProgressiveBar />
								</td>
								<td>
									<div style={{ width: '120px' }}>
										<Last7dChart data={coin.sparkline_in_7d} />
									</div>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
};

export default ColinList;
