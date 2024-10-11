import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Papa from "papaparse"; // For CSV conversion
import { saveAs } from "file-saver"; // For downloading the CSV file

const IncomeStatement = () => {
	const [incomeData, setIncomeData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const options = {
				method: "GET",
				url: "https://real-time-finance-data.p.rapidapi.com/company-income-statement",
				params: {
					symbol: "MSFT:NASDAQ",
					period: "QUARTERLY",
					language: "en",
				},
				headers: {
					"x-rapidapi-host": "real-time-finance-data.p.rapidapi.com",
					"x-rapidapi-key":
						"7691b6ffd6msh6b02f2b29fd7642p150f88jsnc951613958f5",
				},
			};

			try {
				const response = await axios.request(options);
				setIncomeData(response.data.data); // Assuming the data is in response.data.data
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	// Function to download the income statement data as a CSV file
	const downloadCSV = () => {
		if (!incomeData) return;

		// Prepare the CSV data
		const csvData = incomeData.income_statement.map((item) => ({
			Year: item.year,
			Quarter: item.quarter,
			Currency: item.currency,
			Revenue: item.revenue,
			"Operating Expense": item.operating_expense,
			"Net Income": item.net_income,
			"Net Profit Margin": item.net_profit_margin,
			"Earnings Per Share": item.earnings_per_share,
			EBITDA: item.EBITDA,
			"Effective Task Rate Percent": item.effective_task_rate_percent,
		}));

		// Convert the data to CSV format
		const csv = Papa.unparse(csvData);

		// Create a Blob from the CSV and trigger a download
		const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
		saveAs(blob, "income_statement_data.csv");
	};

	return (
		<div>
			<h3>Company Income Statement</h3>

			{/* Button to download CSV */}
			<button onClick={downloadCSV} className="btn btn-primary mb-3">
				Download CSV
			</button>

			{incomeData ? (
				<Table striped bordered hover responsive>
					<thead>
						<tr>
							<th>Year</th>
							<th>Quarter</th>
							<th>Currency</th>
							<th>Revenue</th>
							<th>Operating Expense</th>
							<th>Net Income</th>
							<th>Net Profit Margin</th>
							<th>Earnings Per Share</th>
							<th>EBITDA</th>
							<th>Effective Task Rate Percent</th>
						</tr>
					</thead>
					<tbody>
						{incomeData.income_statement.map((item, index) => (
							<tr key={index}>
								<td>{item.year}</td>
								<td>{item.quarter}</td>
								<td>{item.currency}</td>
								<td>{item.revenue}</td>
								<td>{item.operating_expense}</td>
								<td>{item.net_income}</td>
								<td>{item.net_profit_margin}</td>
								<td>{item.earnings_per_share}</td>
								<td>{item.EBITDA}</td>
								<td>{item.effective_task_rate_percent}</td>
							</tr>
						))}
					</tbody>
				</Table>
			) : (
				<p>Loading data...</p>
			)}
		</div>
	);
};

export default IncomeStatement;
