import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

const StockRecommendations = () => {
	// State variables for data, loading status, and error handling
	const [recommendations, setRecommendations] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		// Define the async function to fetch data
		const fetchRecommendations = async () => {
			const options = {
				method: "GET",
				url: "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-recommendations",
				params: { symbol: "MSFT" }, // Example stock symbol: Intel (INTC)
				headers: {
					"x-rapidapi-key":
						"3db9226ad1mshca8d9d6faf15af9p17d01fjsne8e43d0bb590",
					"x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
				},
			};

			try {
				// Fetch data using Axios
				const response = await axios.request(options);
				console.log(response.data.finance.result);
				setRecommendations(response.data.finance.result); // Store the response data
				setLoading(false); // Stop loading spinner
			} catch (error) {
				// Handle error
				setError("Failed to fetch recommendations.");
				setLoading(false); // Stop loading spinner even on error
			}
		};

		// Trigger the data fetch
		fetchRecommendations();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []); // Empty dependency array ensures this runs only once when the component mounts

	// Conditional rendering based on loading and error state
	if (loading) {
		return <p>Loading...</p>; // Display loading message
	}

	if (error) {
		return <p>{error}</p>; // Display error message
	}

	// Check if recommendations exist
	// if (!recommendations || !recommendations.recommendationTrend) {
	// 	return <p>No recommendations available.</p>;
	// }

	// Display stock recommendations
	return (
		<div>
			<h2>Stock Recommendations for MSFT</h2>
			{/* <pre>{JSON.stringify(recommendations[0], null, 2)}</pre> */}
			<div className="table-responsive">
				<Table striped bordered hover responsive>
					<thead className="thead-dark">
						<tr>
							<th>Language</th>
							<th>Region</th>
							<th>Quote Type</th>
							<th>Type Disp</th>
							<th>Quote Source Name</th>
							<th>Triggerable</th>
							<th>Custom Price Alert Confidence</th>
							<th>Post Market Change Percent</th>
							<th>Post Market Time</th>
							<th>Post Market Price</th>
							<th>Post Market Change</th>
							<th>Regular Market Change</th>
							<th>Regular Market Change Percent</th>
							<th>Regular Market Time</th>
							<th>Regular Market Price</th>
							<th>Regular Market Previous Close</th>
							<th>Exchange</th>
							<th>Market</th>
							<th>Full Exchange Name</th>
							<th>Short Name</th>
							<th>Market State</th>
							<th>Source Interval</th>
							<th>Exchange Data Delayed By</th>
							<th>Exchange Timezone Name</th>
							<th>Exchange Timezone Short Name</th>
							<th>GMT Offset Milliseconds</th>
							<th>ESG Populated</th>
							<th>Tradeable</th>
							<th>Crypto Tradeable</th>
							<th>Has Pre/Post Market Data</th>
							<th>First Trade Date Milliseconds</th>
							<th>Price Hint</th>
							<th>Symbol</th>
						</tr>
					</thead>
					<tbody>
						{recommendations[0].quotes.map((item, index) => (
							<tr key={index}>
								<td>{item.language}</td>
								<td>{item.region}</td>
								<td>{item.quoteType}</td>
								<td>{item.typeDisp}</td>
								<td>{item.quoteSourceName}</td>
								<td>{item.triggerable ? "True" : "False"}</td>
								<td>{item.customPriceAlertConfidence}</td>
								<td>{item.postMarketChangePercent}</td>
								<td>{item.postMarketTime}</td>
								<td>{item.postMarketPrice}</td>
								<td>{item.postMarketChange}</td>
								<td>{item.regularMarketChange}</td>
								<td>{item.regularMarketChangePercent}</td>
								<td>{item.regularMarketTime}</td>
								<td>{item.regularMarketPrice}</td>
								<td>{item.regularMarketPreviousClose}</td>
								<td>{item.exchange}</td>
								<td>{item.market}</td>
								<td>{item.fullExchangeName}</td>
								<td>{item.shortName}</td>
								<td>{item.marketState}</td>
								<td>{item.sourceInterval}</td>
								<td>{item.exchangeDataDelayedBy}</td>
								<td>{item.exchangeTimezoneName}</td>
								<td>{item.exchangeTimezoneShortName}</td>
								<td>{item.gmtOffSetMilliseconds}</td>
								<td>{item.esgPopulated ? "True" : "False"}</td>
								<td>{item.tradeable ? "True" : "False"}</td>
								<td>{item.cryptoTradeable ? "True" : "False"}</td>
								<td>{item.hasPrePostMarketData ? "True" : "False"}</td>
								<td>{item.firstTradeDateMilliseconds}</td>
								<td>{item.priceHint}</td>
								<td>{item.symbol}</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
		</div>
	);
};

export default StockRecommendations;
