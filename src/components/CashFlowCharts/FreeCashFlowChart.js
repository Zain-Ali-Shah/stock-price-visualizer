// FreeCashFlowChart.js
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

// Register the chart components
ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const FreeCashFlowChart = ({ cashFlowData }) => {
	// Prepare the data for the chart
	const chartData = {
		labels: cashFlowData.map((item) => `Q${item.quarter} ${item.year}`),
		datasets: [
			{
				label: "Free Cash Flow (in billions USD)",
				data: cashFlowData.map((item) => item.freeCashFlow / 1e9), // Convert to billions for readability
				backgroundColor: "rgba(24, 135, 20, 0.5)", // Bar color
				borderColor: "rgba(255, 99, 132, 1)", // Border color
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
				text: "Free Cash Flow by Quarter",
			},
		},
	};

	return <Bar data={chartData} options={options} />;
};

export default FreeCashFlowChart;
