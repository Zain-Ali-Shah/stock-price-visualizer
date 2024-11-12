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
				label: "EBITDA",
				data: data.map((item) => item.ebitda / 1e9),
				backgroundColor: "brown",
				borderColor: "brown",
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
				text: "EBITDA (in Billions)",
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

export default EBITDABarChart;
