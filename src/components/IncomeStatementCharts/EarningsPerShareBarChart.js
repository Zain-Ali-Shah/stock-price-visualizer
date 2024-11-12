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
				label: "Earnings Per Share",
				data: data.map((item) => item.earningsPerShare),
				backgroundColor: "purple", // purple color
				borderColor: "purple",
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
				text: "Earnings Per Share",
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

export default EarningsPerShareBarChart;
