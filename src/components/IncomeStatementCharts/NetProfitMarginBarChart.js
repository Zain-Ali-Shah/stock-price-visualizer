// NetProfitMarginBarChart.js
import React from "react";
import { Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	BarElement,
	CategoryScale,
	LinearScale,
	Tooltip,
	Legend,
} from "chart.js";

// Register required components for ChartJS
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const NetProfitMarginBarChart = ({ data }) => {
	// Prepare chart data
	const chartData = {
		labels: data.map((item) => `Q${item.quarter} ${item.year}`),
		datasets: [
			{
				label: "Net Profit Margin (%)",
				data: data.map((item) => item.netProfitMargin),
				backgroundColor: "green", // Light teal color
				borderColor: "green",
				borderWidth: 1,
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
			},
			title: {
				display: true,
				text: "Net Profit Margin (%)",
			},
		},
		scales: {
			y: {
				display: false, // Completely hide the Y-axis
			},
		},
	};

	return <Bar data={chartData} options={options} />;
};

export default NetProfitMarginBarChart;
