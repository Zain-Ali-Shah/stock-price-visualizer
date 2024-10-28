// RevenueBarChart.js
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

// Register required ChartJS components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const RevenueBarChart = ({ data }) => {
	// Extract data for the chart
	const chartData = {
		labels: data.map((item) => `Q${item.quarter} ${item.year}`),
		datasets: [
			{
				label: "Revenue (in USD)",
				data: data.map((item) => item.revenue),
				backgroundColor: "rgba(189, 47, 137, 0.6)", // Light teal color
				borderColor: "rgba(75, 192, 192, 1)",
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

export default RevenueBarChart;
