// NetIncomeBarChart.js
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

const NetIncomeBarChart = ({ data }) => {
	// Prepare chart data
	const chartData = {
		labels: data.map((item) => `Q${item.quarter} ${item.year}`),
		datasets: [
			{
				label: "Net Income (in USD)",
				data: data.map((item) => item.netIncome),
				backgroundColor: "blue", // blue color
				borderColor: "rgba(54, 162, 235, 1)",
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
						return `$${context.raw.toLocaleString()}`; // Format tooltip value
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

export default NetIncomeBarChart;
