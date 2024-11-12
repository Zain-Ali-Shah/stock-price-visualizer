// NetIncomeChart.js
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

// Register the necessary chart components
ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const NetIncomeChart = ({ cashFlowData }) => {
	// Prepare the data for the chart
	const chartData = {
		labels: cashFlowData.map((item) => `Q${item.quarter} ${item.year}`), // Label as Quarter + Year
		datasets: [
			{
				label: "Net Income",
				data: cashFlowData.map((item) => item.netIncome / 1e9), // Convert to billions for readability
				backgroundColor: "rgba(20, 39, 135, 0.5)", // Bar color
				borderColor: "rgba(20, 39, 135, 0.5)", // Border color
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
				text: "Net Income by Quarter (in Billions)",
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

export default NetIncomeChart;
