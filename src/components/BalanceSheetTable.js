import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";

const BalanceSheetTable = () => {
	const [balanceSheetData, setBalanceSheetData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchBalanceSheetData = async () => {
			try {
				const response = await axios.get(
					"https://real-time-finance-data.p.rapidapi.com/company-balance-sheet",
					{
						params: {
							symbol: "MSFT:NASDAQ",
							period: "QUARTERLY",
							language: "en",
						},
						headers: {
							"x-rapidapi-host": "real-time-finance-data.p.rapidapi.com",
							"x-rapidapi-key":
								"3db9226ad1mshca8d9d6faf15af9p17d01fjsne8e43d0bb590",
						},
					}
				);
				setBalanceSheetData(response.data.data.balance_sheet); // Extract the balance_sheet array
				setLoading(false);
			} catch (err) {
				console.error(err);
				setError("Error fetching data");
				setLoading(false);
			}
		};

		fetchBalanceSheetData();
	}, []);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>{error}</p>;

	return (
		<div>
			<h3>Company Balance Sheet Data</h3>
			{balanceSheetData ? (
				<>
					{/* <pre>{JSON.stringify(balanceSheetData, null, 2)}</pre> */}
					<Table striped bordered hover responsive>
						<thead>
							<tr>
								<th>Year</th>
								<th>Quarter</th>
								<th>Currency</th>
								<th>Cash & Short Term Investments</th>
								<th>Total Assets</th>
								<th>Total Liabilities</th>
								<th>Total Equity</th>
								<th>Shares Outstanding</th>
								<th>Price to Book</th>
								<th>Return on Assets (%)</th>
								<th>Return on Capital (%)</th>
							</tr>
						</thead>
						<tbody>
							{balanceSheetData.map((row, index) => (
								<tr key={index}>
									<td>{row.year}</td>
									<td>{row.quarter}</td>
									<td>{row.currency}</td>
									<td>{row.cash_and_short_term_investments}</td>
									<td>{row.total_assets}</td>
									<td>{row.total_liabilities}</td>
									<td>{row.total_equity}</td>
									<td>{row.shares_outstanding}</td>
									<td>{row.price_to_book}</td>
									<td>{row.return_on_assets_percent}</td>
									<td>{row.return_on_capital_percent}</td>
								</tr>
							))}
						</tbody>
					</Table>
				</>
			) : (
				<p>No data available</p>
			)}
		</div>
	);
};

export default BalanceSheetTable;
