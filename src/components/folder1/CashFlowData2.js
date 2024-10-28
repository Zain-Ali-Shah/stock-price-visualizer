import React, { useState } from "react";
import NetIncomeChart from "../CashFlowCharts/NetIncomeChart";
import FreeCashFlowChart from "../CashFlowCharts/FreeCashFlowChart";
import CashFlowBreakdownChart from "../CashFlowCharts/CashFlowBreakdownChart";
import NetChangeInCashChart from "../CashFlowCharts/NetChangeInCashChart";

import "./CashFlowData2.css";

const cashFlowData = [
	{
		year: 2022,
		quarter: 3,
		currency: "USD",
		netIncome: 3292000000,
		cashFromOperations: 5100000000,
		cashFromInvesting: -2791000000,
		cashFromFinancing: -712000000,
		netChangeInCash: 1262000000,
		freeCashFlow: 2062875000,
	},
	{
		year: 2022,
		quarter: 4,
		currency: "USD",
		netIncome: 3687000000,
		cashFromOperations: 3278000000,
		cashFromInvesting: -6131000000,
		cashFromFinancing: -495000000,
		netChangeInCash: -3225000000,
		freeCashFlow: 90000000,
	},
	{
		year: 2023,
		quarter: 1,
		currency: "USD",
		netIncome: 2513000000,
		cashFromOperations: 2513000000,
		cashFromInvesting: -2484000000,
		cashFromFinancing: -233000000,
		netChangeInCash: -154000000,
		freeCashFlow: -24125000,
	},
	{
		year: 2023,
		quarter: 2,
		currency: "USD",
		netIncome: 2703000000,
		cashFromOperations: 3065000000,
		cashFromInvesting: -3534000000,
		cashFromFinancing: -328000000,
		netChangeInCash: -891000000,
		freeCashFlow: 876875000,
	},
	{
		year: 2023,
		quarter: 3,
		currency: "USD",
		netIncome: 1853000000,
		cashFromOperations: 3308000000,
		cashFromInvesting: -4762000000,
		cashFromFinancing: 2263000000,
		netChangeInCash: 711000000,
		freeCashFlow: 646750000,
	},
	{
		year: 2023,
		quarter: 4,
		currency: "USD",
		netIncome: 7928000000,
		cashFromOperations: 4370000000,
		cashFromInvesting: -4804000000,
		cashFromFinancing: 887000000,
		netChangeInCash: 599000000,
		freeCashFlow: 730875000,
	},
	{
		year: 2024,
		quarter: 1,
		currency: "USD",
		netIncome: 1129000000,
		cashFromOperations: 242000000,
		cashFromInvesting: -5084000000,
		cashFromFinancing: 196000000,
		netChangeInCash: -4725000000,
		freeCashFlow: -2887625000,
	},
	{
		year: 2024,
		quarter: 2,
		currency: "USD",
		netIncome: 1478000000,
		cashFromOperations: 3612000000,
		cashFromInvesting: -3225000000,
		cashFromFinancing: 2540000000,
		netChangeInCash: 2890000000,
		freeCashFlow: 602750000,
	},
];

const CashFlowData2 = () => {
	const [selectedYear, setSelectedYear] = useState("");

	// Filter the data based on the selected year
	const filteredData =
		selectedYear === ""
			? cashFlowData
			: cashFlowData.filter((item) => item.year === parseInt(selectedYear));

	// Extract unique years for the dropdown options
	const uniqueYears = [...new Set(cashFlowData.map((item) => item.year))];

	return (
		<>
			<div style={{ margin: "20px" }}>
				<h2>Cash Flow Data</h2>

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

				{/* Table to display the filtered data */}
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
								<th>Net Income</th>
								<th>Cash from Operations</th>
								<th>Cash from Investing</th>
								<th>Cash from Financing</th>
								<th>Net Change in Cash</th>
								<th>Free Cash Flow</th>
							</tr>
						</thead>
						<tbody>
							{filteredData.map((item, index) => (
								<tr key={index}>
									<td>{item.year}</td>
									<td>{item.quarter}</td>
									<td>{item.currency}</td>
									<td>{item.netIncome.toLocaleString()}</td>
									<td>{item.cashFromOperations.toLocaleString()}</td>
									<td>{item.cashFromInvesting.toLocaleString()}</td>
									<td>{item.cashFromFinancing.toLocaleString()}</td>
									<td>{item.netChangeInCash.toLocaleString()}</td>
									<td>{item.freeCashFlow.toLocaleString()}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
			<div className="chart-container">
				<div className="chart-row">
					<div>
						<NetIncomeChart cashFlowData={filteredData} />
					</div>
					<div>
						<FreeCashFlowChart cashFlowData={filteredData} />
					</div>
				</div>
				<div className="chart-row">
					<div>
						<CashFlowBreakdownChart cashFlowData={filteredData} />
					</div>
					<div>
						<NetChangeInCashChart cashFlowData={filteredData} />
					</div>
				</div>
			</div>
		</>
	);
};

export default CashFlowData2;
