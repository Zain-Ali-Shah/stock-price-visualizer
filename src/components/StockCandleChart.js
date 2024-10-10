import React from "react";
import {
	Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	TimeScale,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import {
	CandlestickController,
	CandlestickElement,
} from "chartjs-chart-financial";

// Register the necessary components for Chart.js
ChartJS.register(
	Title,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	TimeScale,
	CandlestickController,
	CandlestickElement
);

const StockCandleChart = ({ stockData, selectedYear, selectedMonth }) => {
	const filterData = () => {
		let filteredData = Array.isArray(stockData) ? stockData : [];
		if (selectedYear) {
			filteredData = filteredData.filter(
				(entry) => new Date(entry.datetime).getFullYear() === selectedYear
			);
			if (selectedMonth !== null) {
				filteredData = filteredData.filter((entry) => {
					const date = new Date(entry.datetime);
					return date.getMonth() === selectedMonth;
				});
			}
		}
		return filteredData;
	};

	const filteredData = filterData();

	// Check if data is available
	if (filteredData.length === 0) {
		return <div>No data available</div>;
	}

	// Prepare data for the candlestick chart
	const data = {
		datasets: [
			{
				label: "Stock Price",
				data: filteredData.map((entry) => ({
					x: new Date(entry.datetime),
					o: entry.open,
					h: entry.high,
					l: entry.low,
					c: entry.close,
				})),
				borderColor: "#000",
				color: {
					up: "green", // Green for price going up
					down: "red", // Red for price going down
					unchanged: "blue", // Blue for unchanged price
				},
				borderWidth: 1,
				barPercentage: 0.1, // Adjust this to reduce the width of the candlesticks
				categoryPercentage: 0.5, // Controls the width of the candles within the category
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
			},
			tooltip: {
				callbacks: {
					label: function (context) {
						const { o, h, l, c } = context.raw;
						return `Open: $${o}, High: $${h}, Low: $${l}, Close: $${c}`;
					},
				},
			},
		},
		scales: {
			x: {
				type: "time",
				time: {
					unit: "day", // Use 'day' as the time unit
				},
				title: {
					display: true,
					text: "Date",
				},
				ticks: {
					source: "auto",
					autoSkip: false, // Disable autoSkip to show every day's date
					maxRotation: 0, // Prevent label rotation
					minRotation: 0,
					major: {
						enabled: true, // This helps to emphasize every day
					},
					// Optionally, adjust padding or font size if labels overlap
				},
			},
			y: {
				title: {
					display: true,
					text: "Price",
				},
				beginAtZero: false, // Allow the y-axis to scale dynamically based on data
			},
		},
		elements: {
			candlestick: {
				width: 1, // Further decrease the candlestick width if needed
			},
		},
	};

	return <Chart type="candlestick" data={data} options={options} />;
};

export default StockCandleChart;
