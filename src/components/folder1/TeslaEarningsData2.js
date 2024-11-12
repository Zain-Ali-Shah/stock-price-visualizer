import React, { useState } from "react";
import TeslaEarningsScatterPlot from "../TeslaEarningsCharts/TeslaEarningsScatterPlot";

import "./TeslaEarningsData2.css";
import "./BalanceSheetData2.css";

const teslaEarningsData = [
	{ date: "3Q2023", actualEarnings: 0.66, estimatedEarnings: 0.72 },
	{ date: "4Q2023", actualEarnings: 0.71, estimatedEarnings: 0.74 },
	{ date: "1Q2024", actualEarnings: 0.45, estimatedEarnings: 0.51 },
	{ date: "2Q2024", actualEarnings: 0.52, estimatedEarnings: 0.62 },
];

const TeslaEarningsData2 = () => {
	const [selectedYear, setSelectedYear] = useState("");

	// Filter data based on selected year
	const filteredData =
		selectedYear === ""
			? teslaEarningsData
			: teslaEarningsData.filter((item) => item.date.includes(selectedYear));

	// Extract unique years for dropdown
	const uniqueYears = [
		...new Set(teslaEarningsData.map((item) => item.date.slice(-4))),
	];

	return (
		<>
			<div style={{ margin: "20px" }}>
				<h2>Tesla Quarterly Earnings Data</h2>

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
								<th>Date</th>
								<th>Actual Earnings</th>
								<th>Estimated Earnings</th>
							</tr>
						</thead>
						<tbody>
							{filteredData.map((item, index) => (
								<tr key={index}>
									<td>{item.date}</td>
									<td>{item.actualEarnings}</td>
									<td>{item.estimatedEarnings}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
			<div className="chart-container">
				<div className="chart-row">
					<div>
						<TeslaEarningsScatterPlot teslaEarningsData={filteredData} />
					</div>
				</div>
			</div>
		</>
	);
};

export default TeslaEarningsData2;
