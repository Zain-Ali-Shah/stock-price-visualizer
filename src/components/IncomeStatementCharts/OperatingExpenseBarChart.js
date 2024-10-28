// OperatingExpenseBarChart.js
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

const OperatingExpenseBarChart = ({ data }) => {
	// Chart data extraction
	const chartData = {
		labels: data.map((item) => `Q${item.quarter} ${item.year}`),
		datasets: [
			{
				label: "Operating Expense (in USD)",
				data: data.map((item) => item.operatingExpense),
				backgroundColor: "yellow", // Light red color
				borderColor: "rgba(255, 99, 132, 1)",
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
			tooltip: {
				callbacks: {
					label: function (context) {
						return `$${context.raw.toLocaleString()}`;
					},
				},
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				ticks: {
					callback: function (value) {
						return `$${value.toLocaleString()}`; // Format y-axis ticks
					},
				},
			},
		},
	};

	return <Bar data={chartData} options={options} />;
};

export default OperatingExpenseBarChart;
