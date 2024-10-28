import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import Papa from "papaparse";
import { saveAs } from "file-saver";

const StockRecommendations = () => {
	const [recommendations, setRecommendations] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchRecommendations = async () => {
			const options = {
				method: "GET",
				url: "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-recommendations",
				params: { symbol: "TSLA" },
				headers: {
					"x-rapidapi-key":
						"3db9226ad1mshca8d9d6faf15af9p17d01fjsne8e43d0bb590",
					"x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
				},
			};

			try {
				const response = await axios.request(options);
				setRecommendations(response.data.finance.result);
				setLoading(false);
			} catch (error) {
				setError("Failed to fetch recommendations.");
				setLoading(false);
			}
		};

		fetchRecommendations();
	}, []);

	// Function to download data as CSV
	const downloadCSV = () => {
		if (!recommendations || !recommendations[0]) return;

		// Extract quotes data
		const csvData = recommendations[0].quotes.map((item) => ({
			language: item.language,
			region: item.region,
			quoteType: item.quoteType,
			typeDisp: item.typeDisp,
			quoteSourceName: item.quoteSourceName,
			triggerable: item.triggerable ? "True" : "False",
			customPriceAlertConfidence: item.customPriceAlertConfidence,
			postMarketChangePercent: item.postMarketChangePercent,
			postMarketTime: item.postMarketTime,
			postMarketPrice: item.postMarketPrice,
			postMarketChange: item.postMarketChange,
			regularMarketChange: item.regularMarketChange,
			regularMarketChangePercent: item.regularMarketChangePercent,
			regularMarketTime: item.regularMarketTime,
			regularMarketPrice: item.regularMarketPrice,
			regularMarketPreviousClose: item.regularMarketPreviousClose,
			exchange: item.exchange,
			market: item.market,
			fullExchangeName: item.fullExchangeName,
			shortName: item.shortName,
			marketState: item.marketState,
			sourceInterval: item.sourceInterval,
			exchangeDataDelayedBy: item.exchangeDataDelayedBy,
			exchangeTimezoneName: item.exchangeTimezoneName,
			exchangeTimezoneShortName: item.exchangeTimezoneShortName,
			gmtOffSetMilliseconds: item.gmtOffSetMilliseconds,
			esgPopulated: item.esgPopulated ? "True" : "False",
			tradeable: item.tradeable ? "True" : "False",
			cryptoTradeable: item.cryptoTradeable ? "True" : "False",
			hasPrePostMarketData: item.hasPrePostMarketData ? "True" : "False",
			firstTradeDateMilliseconds: item.firstTradeDateMilliseconds,
			priceHint: item.priceHint,
			symbol: item.symbol,
		}));

		// Convert data to CSV format using Papaparse
		const csv = Papa.unparse(csvData);

		// Create a Blob and download it as a CSV file
		const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
		saveAs(blob, "stock_recommendations.csv");
	};

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>{error}</p>;
	}

	return (
		<div>
			<h2>Stock Recommendations for MSFT</h2>
			<Button onClick={downloadCSV} className="mb-3">
				Download CSV
			</Button>
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
