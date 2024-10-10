import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";

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

	return (
		<div>
			<h3>Company Income Statement</h3>
			{/* <pre>{JSON.stringify(incomeData, null, 2)}</pre> */}
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
