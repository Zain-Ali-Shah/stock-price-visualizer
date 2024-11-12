// BarChart.js
import React from "react";
import { Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

// Register the necessary components for Chart.js
ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const BarChart = ({ financialData }) => {
	// Prepare data for the bar chart
	const labels = financialData.map(
		(item) => `${item.year} Q${item.quarter}` // X-axis labels: Year + Quarter
	);

	const data = {
		labels,
		datasets: [
			{
				label: "Total Liabilities",
				data: financialData.map((item) => item.totalLiabilities / 1e9), // Convert to billions
				backgroundColor: "blue",
				borderColor: "blue",
				borderWidth: 1,
			},
			{
				label: "Total Assets",
				data: financialData.map((item) => item.totalAssets / 1e9), // Convert to billions
				backgroundColor: "yellow",
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
				text: "Total Assets vs Total Liabilities (in Billions)",
			},
		},
		scales: {
			y: {
				display: false, // Completely hide the Y-axis
			},
		},
	};

	return <Bar data={data} options={options} />;
};

export default BarChart;
