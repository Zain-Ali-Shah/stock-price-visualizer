// TotalEquityChart.js
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

// Register necessary components for Chart.js
ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const TotalEquityChart = ({ financialData }) => {
	// Prepare data for the bar chart
	const labels = financialData.map(
		(item) => `${item.year} Q${item.quarter}` // X-axis labels: Year + Quarter
	);

	const data = {
		labels,
		datasets: [
			{
				label: "Total Equity",
				data: financialData.map((item) => item.totalEquity / 1e9),
				backgroundColor: "rgba(15, 145, 28, 0.5)", // Light purple bars
				borderColor: "rgba(15, 145, 28, 0.5)",
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
				text: "Total Equity Over Time (in Billions)",
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

export default TotalEquityChart;
