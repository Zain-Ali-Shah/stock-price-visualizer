import React, { useState, useEffect } from "react";
import StockTable from "./StockTable";
import StockLineChart from "./StockLineChart";
import StockCandleChart from "./StockCandleChart";
import StockAreaChart from "./StockAreaChart";
import ClosePriceBarChart from "./ClosePriceBarChart";
import YearMonthSelector from "./YearMonthSelector";
import StockSelector from "./StockSelector"; // Import the new StockSelector component
import axios from "axios";

const StockData = () => {
	const [selectedStock, setSelectedStock] = useState("MSFT"); // Default stock
	const [stockData, setStockData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [selectedYear, setSelectedYear] = useState(null);
	const [selectedMonth, setSelectedMonth] = useState(null);

	// Function to handle stock change and reset year/month filters
	const handleStockChange = (newStock) => {
		setSelectedStock(newStock); // Update the selected stock
		setSelectedYear(null); // Reset the year when a new stock is selected
		setSelectedMonth(null); // Reset the month when a new stock is selected
	};

	useEffect(() => {
		const fetchStockData = async (stockSymbol) => {
			const options = {
				method: "GET",
				url: "https://twelve-data1.p.rapidapi.com/time_series",
				params: {
					symbol: stockSymbol, // Fetch data for selected stock
					interval: "1day", // Time interval
					outputsize: "5000", // Number of data points
				},
				headers: {
					"x-rapidapi-key":
						"7691b6ffd6msh6b02f2b29fd7642p150f88jsnc951613958f5",
					"x-rapidapi-host": "twelve-data1.p.rapidapi.com",
				},
			};

			try {
				const response = await axios.request(options);
				setStockData(response.data);
				setLoading(false);
			} catch (error) {
				setError("Failed to fetch data");
				setLoading(false);
			}
		};

		fetchStockData(selectedStock);
	}, [selectedStock]); // Fetch stock data when the selected stock changes

	if (loading) return <p>Loading...</p>;
	if (error) return <p>{error}</p>;

	return (
		<div>
			<h2 className="my-3 text-center">{selectedStock} Stock Data</h2>

			{/* Use StockSelector for the dropdown */}
			<StockSelector
				selectedStock={selectedStock}
				onStockChange={handleStockChange} // Pass handleStockChange to reset year and month
			/>

			<YearMonthSelector
				stockData={stockData.values}
				selectedYear={selectedYear}
				selectedMonth={selectedMonth}
				onYearChange={setSelectedYear}
				onMonthChange={setSelectedMonth}
				resetFilters={selectedYear === null && selectedMonth === null} // Reset when both are null
			/>

			<h3 className="my-3 text-center">Line Charts</h3>
			<StockLineChart
				stockData={stockData.values}
				selectedYear={selectedYear}
				selectedMonth={selectedMonth}
			/>

			<h3 className="my-3 text-center">Candle Charts</h3>
			<StockCandleChart
				stockData={stockData.values}
				selectedYear={selectedYear}
				selectedMonth={selectedMonth}
			/>

			<h3 className="my-3 text-center">Area Chart</h3>
			<StockAreaChart
				stockData={stockData.values}
				selectedYear={selectedYear}
				selectedMonth={selectedMonth}
			/>

			<h2 className="my-3 text-center">Close Price Bar Chart</h2>
			<ClosePriceBarChart
				stockData={stockData.values}
				selectedYear={selectedYear}
				selectedMonth={selectedMonth}
			/>

			<h2 className="my-3 text-center">Stock Data Table</h2>
			<StockTable stockData={stockData.values} />
		</div>
	);
};

export default StockData;
