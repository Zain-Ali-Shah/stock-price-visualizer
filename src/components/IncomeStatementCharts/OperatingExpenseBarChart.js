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
				label: "Operating Expense",
				data: data.map((item) => item.operatingExpense / 1e9),
				backgroundColor: "yellow", // Light red color
				borderColor: "yellow",
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
				text: "Operating Expense (in Billions)",
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

export default OperatingExpenseBarChart;
