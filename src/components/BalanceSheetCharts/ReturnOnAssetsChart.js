// ReturnOnAssetsChart.js
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

const ReturnOnAssetsChart = ({ financialData }) => {
	// Prepare data for the bar chart
	const labels = financialData.map(
		(item) => `${item.year} Q${item.quarter}` // X-axis labels: Year + Quarter
	);

	const data = {
		labels,
		datasets: [
			{
				label: "Return on Assets (%)",
				data: financialData.map((item) => item.returnOnAssets),
				backgroundColor: "rgba(94, 49, 85, 1)",
				borderColor: "rgba(94, 49, 85, 1)",
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
				text: "Return on Assets (%) Over Time",
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

export default ReturnOnAssetsChart;
