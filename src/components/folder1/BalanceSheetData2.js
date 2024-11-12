import React from "react";
import ALBarChart from "../BalanceSheetCharts/ALBarChart";
import SharesOutstandingChart from "../BalanceSheetCharts/SharesOutstandingChart";
import CashInvestmentsChart from "../BalanceSheetCharts/CashInvestmentsChart";
import PriceToBookChart from "../BalanceSheetCharts/PriceToBookChart";
import TotalEquityChart from "../BalanceSheetCharts/TotalEquityChart";
import ReturnOnAssetsChart from "../BalanceSheetCharts/ReturnOnAssetsChart";
import ReturnOnCapitalChart from "../BalanceSheetCharts/ReturnOnCapitalChart";
// import YearDropdown from "./yearDropdown";

import "./BalanceSheetData2.css";

// Define the data array
const financialData = [
	{
		year: 2022,
		quarter: 3,
		currency: "USD",
		cashInvestments: 21107000000,
		totalAssets: 74426000000,
		totalLiabilities: 33302000000,
		totalEquity: 41124000000,
		sharesOutstanding: 3157752449,
		priceToBook: 18.92,
		returnOnAssets: 12.9,
		returnOnCapital: 20.19,
	},
	{
		year: 2022,
		quarter: 4,
		currency: "USD",
		cashInvestments: 22185000000,
		totalAssets: 82338000000,
		totalLiabilities: 36440000000,
		totalEquity: 45898000000,
		sharesOutstanding: 3164102701,
		priceToBook: 16.8981,
		returnOnAssets: 12.33,
		returnOnCapital: 19.59,
	},
	{
		year: 2023,
		quarter: 1,
		currency: "USD",
		cashInvestments: 22402000000,
		totalAssets: 86833000000,
		totalLiabilities: 37598000000,
		totalEquity: 49235000000,
		sharesOutstanding: 3169504301,
		priceToBook: 15.75,
		returnOnAssets: 7.87,
		returnOnCapital: 12.51,
	},
	{
		year: 2023,
		quarter: 2,
		currency: "USD",
		cashInvestments: 23075000000,
		totalAssets: 90591000000,
		totalLiabilities: 38409000000,
		totalEquity: 52182000000,
		sharesOutstanding: 3173994467,
		priceToBook: 14.8212,
		returnOnAssets: 6.76,
		returnOnCapital: 10.63,
	},
	{
		year: 2023,
		quarter: 3,
		currency: "USD",
		cashInvestments: 26077000000,
		totalAssets: 93941000000,
		totalLiabilities: 39446000000,
		totalEquity: 54495000000,
		sharesOutstanding: 3178921391,
		priceToBook: 14.1956,
		returnOnAssets: 4.78,
		returnOnCapital: 7.31,
	},
	{
		year: 2023,
		quarter: 4,
		currency: "USD",
		cashInvestments: 29094000000,
		totalAssets: 1.06618e11,
		totalLiabilities: 43009000000,
		totalEquity: 63609000000,
		sharesOutstanding: 3184790415,
		priceToBook: 12.1388,
		returnOnAssets: 5.15,
		returnOnCapital: 7.6,
	},
	{
		year: 2024,
		quarter: 1,
		currency: "USD",
		cashInvestments: 26863000000,
		totalAssets: 1.09226e11,
		totalLiabilities: 44046000000,
		totalEquity: 65180000000,
		sharesOutstanding: 3189196167,
		priceToBook: 11.8262,
		returnOnAssets: 2.71,
		returnOnCapital: 3.95,
	},
	{
		year: 2024,
		quarter: 2,
		currency: "USD",
		cashInvestments: 30720000000,
		totalAssets: 1.12832e11,
		totalLiabilities: 45569000000,
		totalEquity: 67263000000,
		sharesOutstanding: 3194640415,
		priceToBook: 11.4738,
		returnOnAssets: 4.93,
		returnOnCapital: 7.06,
	},
];

// Table Component
const BalanceSheetData2 = ({ selectedYear }) => {
	// Filter the data based on the selected year
	const filteredData =
		selectedYear === ""
			? financialData // Show all data if no year is selected
			: financialData.filter((item) => item.year === parseInt(selectedYear));

	return (
		<>
			<div style={{ margin: "20px" }}>
				<h2>Balance Sheet Data</h2>

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
							{filteredData.map((item, index) => (
								<tr key={index}>
									<td>{item.year}</td>
									<td>{item.quarter}</td>
									<td>{item.currency}</td>
									<td>{item.cashInvestments.toLocaleString()}</td>
									<td>{item.totalAssets.toExponential()}</td>
									<td>{item.totalLiabilities.toLocaleString()}</td>
									<td>{item.totalEquity.toLocaleString()}</td>
									<td>{item.sharesOutstanding.toLocaleString()}</td>
									<td>{item.priceToBook}</td>
									<td>{item.returnOnAssets}</td>
									<td>{item.returnOnCapital}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
			<div className="chart-container">
				<div className="chart-row">
					<div>
						<ALBarChart financialData={filteredData} />
					</div>
					<div>
						<SharesOutstandingChart financialData={filteredData} />
					</div>
					<div>
						<CashInvestmentsChart financialData={filteredData} />
					</div>
				</div>
				<div className="chart-row">
					<div>
						<PriceToBookChart financialData={filteredData} />
					</div>
					<div>
						<TotalEquityChart financialData={filteredData} />
					</div>
					<div>
						<ReturnOnAssetsChart financialData={filteredData} />
					</div>
				</div>
				<div className="chart-row">
					<div>
						<ReturnOnCapitalChart financialData={filteredData} />
					</div>
				</div>
			</div>
		</>
	);
};

export default BalanceSheetData2;
