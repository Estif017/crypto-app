import { useEffect } from 'react';
import { Last7dChart, ProgressiveBar } from 'components';
import './coinList.css';
import { useDispatch, useSelector } from 'react-redux';
import { getCoins } from 'redux/coinListReducer/actions';
import {
	coinsSelector,
	errorSelector,
	loadingSelector,
} from 'redux/coinListReducer';

function kFormatter(num) {
	if (Math.abs(num) > 999 && Math.abs(num) < 999999) {
		return Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'k';
	} else if (Math.abs(num) > 999999 && Math.abs(num) < 999999999) {
		return Math.sign(num) * (Math.abs(num) / 1000000).toFixed(1) + 'M';
	} else if (Math.abs(num) > 999999999 && Math.abs(num) < 999999999999) {
		return Math.sign(num) * (Math.abs(num) / 1000000000).toFixed(1) + 'B';
	} else {
		return Math.sign(num) * Math.abs(num);
	}
}

const ColinList = () => {
	const dispatch = useDispatch();
	const coins = useSelector(coinsSelector);
	const isLoading = useSelector(loadingSelector);
	const error = useSelector(errorSelector);
	useEffect(() => {
		dispatch(getCoins());
		// eslint-disable-next-line
	}, []);
	return (
		<>
			{error && <h1>Error...</h1>}
			{isLoading && <h1>Loading...</h1>}
			<h1>Crypto</h1>
			<table>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Price</th>
						<th>1h%</th>
						<th>24h%</th>
						<th>7d%</th>
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
								<td>
									{coin.price_change_percentage_1h_in_currency.toFixed(2)}%
								</td>
								<td>
									{coin.price_change_percentage_24h_in_currency.toFixed(2)}%
								</td>
								<td>
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
