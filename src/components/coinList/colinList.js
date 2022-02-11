import { useState, useEffect } from 'react';
import axios from 'axios';
import { Last7dChart, ProgressiveBar } from 'components';
import './coinList.css';

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
	const [coins, setCoins] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);
	const getCoins = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios.get(
				'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d'
			);
			console.log(data);
			setIsLoading(false);
			setError(false);
			setCoins(data);
		} catch (err) {
			setError(true);
		}
	};
	useEffect(() => {
		getCoins();
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
