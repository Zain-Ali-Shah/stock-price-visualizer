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
				label: "Revenue",
				data: data.map((item) => item.revenue / 1e9),
				backgroundColor: "rgba(189, 47, 137, 0.6)", // Light teal color
				borderColor: "rgba(189, 47, 137, 0.6)",
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
				text: "Revenue (in Billions)",
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

export default RevenueBarChart;
