// EBITDABarChart.js
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

const EBITDABarChart = ({ data }) => {
	// Prepare the chart data
	const chartData = {
		labels: data.map((item) => `Q${item.quarter} ${item.year}`),
		datasets: [
			{
				label: "EBITDA (in USD)",
				data: data.map((item) => item.ebitda),
				backgroundColor: "brown",
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
						const value = context.raw.toLocaleString();
						return `USD ${value}`; // Format tooltip values
					},
				},
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				ticks: {
					callback: function (value) {
						return `USD ${value.toLocaleString()}`; // Format y-axis values
					},
				},
			},
		},
	};

	return <Bar data={chartData} options={options} />;
};

export default EBITDABarChart;
