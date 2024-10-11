import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Papa from "papaparse"; // For CSV conversion
import { saveAs } from "file-saver"; // For downloading the CSV file

const CashFlowData = () => {
	const [cashFlowData, setCashFlowData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchCashFlowData = async () => {
			try {
				const response = await axios.get(
					"https://real-time-finance-data.p.rapidapi.com/company-cash-flow",
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
				setCashFlowData(response.data);
				setLoading(false);
			} catch (err) {
				console.error(err);
				setError("Error fetching data");
				setLoading(false);
			}
		};

		fetchCashFlowData();
	}, []);

	// Function to download the cash flow data as a CSV file
	const downloadCSV = () => {
		if (!cashFlowData || !cashFlowData.data || !cashFlowData.data.cash_flow)
			return;

		// Prepare the CSV data
		const csvData = cashFlowData.data.cash_flow.map((row) => ({
			Year: row.year,
			Quarter: row.quarter,
			Currency: row.currency,
			"Net Income": row.net_income.toLocaleString(),
			"Cash from Operations": row.cash_from_operations.toLocaleString(),
			"Cash from Investing": row.cash_from_investing.toLocaleString(),
			"Cash from Financing": row.cash_from_financing.toLocaleString(),
			"Net Change in Cash": row.net_change_in_cash.toLocaleString(),
			"Free Cash Flow": row.free_cash_flow.toLocaleString(),
		}));

		// Convert the data to CSV format
		const csv = Papa.unparse(csvData);

		// Create a Blob from the CSV and trigger a download
		const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
		saveAs(blob, "company_cash_flow_data.csv");
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>{error}</p>;

	return (
		<div>
			<h3>Company Cash Flow Data</h3>
			{cashFlowData ? (
				<>
					{/* Button to download CSV */}
					<button onClick={downloadCSV} className="btn btn-primary mb-3">
						Download CSV
					</button>

					<Table striped bordered hover responsive>
						<thead>
							<tr>
								<th>Year</th>
								<th>Quarter</th>
								<th>Currency</th>
								<th>Net Income</th>
								<th>Cash from Operations</th>
								<th>Cash from Investing</th>
								<th>Cash from Financing</th>
								<th>Net Change in Cash</th>
								<th>Free Cash Flow</th>
							</tr>
						</thead>
						<tbody>
							{cashFlowData.data.cash_flow.map((row, index) => (
								<tr key={index}>
									<td>{row.year}</td>
									<td>{row.quarter}</td>
									<td>{row.currency}</td>
									<td>{row.net_income.toLocaleString()}</td>
									<td>{row.cash_from_operations.toLocaleString()}</td>
									<td>{row.cash_from_investing.toLocaleString()}</td>
									<td>{row.cash_from_financing.toLocaleString()}</td>
									<td>{row.net_change_in_cash.toLocaleString()}</td>
									<td>{row.free_cash_flow.toLocaleString()}</td>
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

export default CashFlowData;
