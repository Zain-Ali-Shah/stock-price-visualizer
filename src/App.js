import React, { useState } from "react";
import "./App.css";
// import StockData from "./components/StockData";
// import StockRecommendations from "./components/StockRecommendations";
// import SMAData from "./components/SMAData";
// import TeslaEarnings from "./components/TeslaEarnings";
// import CashFlowData from "./components/CashFlowData";
// import BalanceSheetTable from "./components/BalanceSheetTable";
// import IncomeStatement from "./components/IncomeStatement";

import BalanceSheetData2 from "./components/folder1/BalanceSheetData2";
import CashFlowData2 from "./components/folder1/CashFlowData2";
import IncomeStatement2 from "./components/folder1/IncomeStatement2";
import TeslaEarningsData2 from "./components/folder1/TeslaEarningsData2";
import YearDropdown from "./components/folder1/yearDropdown";

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

function App() {
	const [selectedYear, setSelectedYear] = useState(""); // State to store selected year

	// Extract unique years for the dropdown options
	const uniqueYears = [...new Set(financialData.map((item) => item.year))];

	return (
		<>
			{/* <StockData /> */}
			{/* <StockRecommendations /> */}
			{/* <SMAData /> */}
			{/* <TeslaEarnings /> */}
			{/* <CashFlowData /> */}
			{/* <BalanceSheetTable /> */}
			{/* <IncomeStatement /> */}
			{/* Dropdown to select the year */}
			<YearDropdown
				years={uniqueYears}
				selectedYear={selectedYear}
				onYearChange={setSelectedYear} // Pass the state setter as the handler
			/>

			<BalanceSheetData2 selectedYear={selectedYear} />
			<CashFlowData2 selectedYear={selectedYear} />
			<IncomeStatement2 selectedYear={selectedYear} />
			<TeslaEarningsData2 />
		</>
	);
}

export default App;
