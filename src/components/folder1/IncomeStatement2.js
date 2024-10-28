import React, { useState } from "react";
import RevenueBarChart from "../IncomeStatementCharts/RevenueBarChart";
import OperatingExpenseBarChart from "../IncomeStatementCharts/OperatingExpenseBarChart";
import NetIncomeBarChart from "../IncomeStatementCharts/NetIncomeBarChart";
import NetProfitMarginBarChart from "../IncomeStatementCharts/NetProfitMarginBarChart";
import EarningsPerShareBarChart from "../IncomeStatementCharts/EarningsPerShareBarChart";
import EBITDABarChart from "../IncomeStatementCharts/EBITDABarChart";

import "./BalanceSheetData2.css";

const incomeStatementData = [
	{
		year: 2022,
		quarter: 3,
		currency: "USD",
		revenue: 21454000000,
		operatingExpense: 1694000000,
		netIncome: 3292000000,
		netProfitMargin: 15.34,
		earningsPerShare: 0.95,
		ebitda: 4644000000,
		effectiveTaskRatePercent: 8.39,
	},
	{
		year: 2022,
		quarter: 4,
		currency: "USD",
		revenue: 24318000000,
		operatingExpense: 1912000000,
		netIncome: 3687000000,
		netProfitMargin: 15.16,
		earningsPerShare: 1.07,
		ebitda: 4854000000,
		effectiveTaskRatePercent: 6.93,
	},
	{
		year: 2023,
		quarter: 1,
		currency: "USD",
		revenue: 23329000000,
		operatingExpense: 1847000000,
		netIncome: 2513000000,
		netProfitMargin: 10.77,
		earningsPerShare: 0.72,
		ebitda: 3710000000,
		effectiveTaskRatePercent: 9.32,
	},
	{
		year: 2023,
		quarter: 2,
		currency: "USD",
		revenue: 24927000000,
		operatingExpense: 2134000000,
		netIncome: 2703000000,
		netProfitMargin: 10.84,
		earningsPerShare: 0.78,
		ebitda: 3553000000,
		effectiveTaskRatePercent: 11,
	},
	{
		year: 2023,
		quarter: 3,
		currency: "USD",
		revenue: 23350000000,
		operatingExpense: 2414000000,
		netIncome: 1853000000,
		netProfitMargin: 7.94,
		earningsPerShare: 0.53,
		ebitda: 2999000000,
		effectiveTaskRatePercent: 8.17,
	},
	{
		year: 2023,
		quarter: 4,
		currency: "USD",
		revenue: 25167000000,
		operatingExpense: 2374000000,
		netIncome: 7928000000,
		netProfitMargin: 31.5,
		earningsPerShare: 2.27,
		ebitda: 3296000000,
		effectiveTaskRatePercent: -262.53,
	},
	{
		year: 2024,
		quarter: 1,
		currency: "USD",
		revenue: 21301000000,
		operatingExpense: 2525000000,
		netIncome: 1129000000,
		netProfitMargin: 5.3,
		earningsPerShare: 0.34,
		ebitda: 2417000000,
		effectiveTaskRatePercent: 26.34,
	},
	{
		year: 2024,
		quarter: 2,
		currency: "USD",
		revenue: 25500000000,
		operatingExpense: 2390000000,
		netIncome: 1478000000,
		netProfitMargin: 5.8,
		earningsPerShare: 0.42,
		ebitda: 3466000000,
		effectiveTaskRatePercent: 20.83,
	},
];

const IncomeStatement2 = () => {
	const [selectedYear, setSelectedYear] = useState("");

	// Filter data based on selected year
	const filteredData =
		selectedYear === ""
			? incomeStatementData
			: incomeStatementData.filter(
					(item) => item.year === parseInt(selectedYear)
			  );

	// Extract unique years for dropdown
	const uniqueYears = [
		...new Set(incomeStatementData.map((item) => item.year)),
	];

	return (
		<>
			<div style={{ margin: "20px" }}>
				<h2>Income Statement Data</h2>

				{/* Dropdown to select the year */}
				<div
					style={{
						marginBottom: "20px",
						display: "flex",
						justifyContent: "flex-end", // Align to right
					}}
				>
					<label style={{ marginRight: "10px" }}>Select Year:</label>
					<select
						value={selectedYear}
						onChange={(e) => setSelectedYear(e.target.value)}
					>
						<option value="">All Years</option>
						{uniqueYears.map((year) => (
							<option key={year} value={year}>
								{year}
							</option>
						))}
					</select>
				</div>

				{/* Table to display filtered data */}
				<div className="table-container">
					<table
						className="responsive-table"
						border="1"
						cellPadding="10"
						cellSpacing="0"
						style={{ width: "100%", textAlign: "center" }}
					>
						<thead>
							<tr>
								<th>Year</th>
								<th>Quarter</th>
								<th>Currency</th>
								<th>Revenue</th>
								<th>Operating Expense</th>
								<th>Net Income</th>
								<th>Net Profit Margin (%)</th>
								<th>Earnings Per Share</th>
								<th>EBITDA</th>
								<th>Effective Tax Rate (%)</th>
							</tr>
						</thead>
						<tbody>
							{filteredData.map((item, index) => (
								<tr key={index}>
									<td>{item.year}</td>
									<td>{item.quarter}</td>
									<td>{item.currency}</td>
									<td>{item.revenue.toLocaleString()}</td>
									<td>{item.operatingExpense.toLocaleString()}</td>
									<td>{item.netIncome.toLocaleString()}</td>
									<td>{item.netProfitMargin}</td>
									<td>{item.earningsPerShare}</td>
									<td>{item.ebitda.toLocaleString()}</td>
									<td>{item.effectiveTaskRatePercent}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
			<div className="chart-container">
				<div className="chart-row">
					<div>
						<RevenueBarChart data={filteredData} />
					</div>
					<div>
						<OperatingExpenseBarChart data={filteredData} />
					</div>
					<div>
						<NetIncomeBarChart data={filteredData} />
					</div>
				</div>
				<div className="chart-row">
					<div>
						<NetProfitMarginBarChart data={filteredData} />
					</div>
					<div>
						<EarningsPerShareBarChart data={filteredData} />
					</div>
					<div>
						<EBITDABarChart data={filteredData} />
					</div>
				</div>
			</div>
		</>
	);
};

export default IncomeStatement2;
