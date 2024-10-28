// EarningsPerShareBarChart.js
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

// Register ChartJS components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const EarningsPerShareBarChart = ({ data }) => {
	// Prepare chart data
	const chartData = {
		labels: data.map((item) => `Q${item.quarter} ${item.year}`),
		datasets: [
			{
				label: "Earnings Per Share (EPS)",
				data: data.map((item) => item.earningsPerShare),
				backgroundColor: "purple", // purple color
				borderColor: "rgba(153, 102, 255, 1)",
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
						return `$${context.raw.toFixed(2)}`; // Tooltip formatting
					},
				},
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				ticks: {
					callback: function (value) {
						return `$${value}`; // Format y-axis ticks as currency
					},
				},
			},
		},
	};

	return <Bar data={chartData} options={options} />;
};

export default EarningsPerShareBarChart;
