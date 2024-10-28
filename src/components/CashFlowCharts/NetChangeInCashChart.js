// NetChangeInCashChart.js
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

// Register chart components
ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const NetChangeInCashChart = ({ cashFlowData }) => {
	// Prepare the chart data
	const chartData = {
		labels: cashFlowData.map((item) => `Q${item.quarter} ${item.year}`),
		datasets: [
			{
				label: "Net Change in Cash (in billions USD)",
				data: cashFlowData.map((item) => item.netChangeInCash / 1e9), // Convert to billions
				backgroundColor: "rgba(31, 29, 171, 0.5)",
				borderColor: "rgba(54, 162, 235, 1)",
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
				text: "Net Change in Cash by Quarter",
			},
		},
		scales: {
			y: {
				ticks: {
					callback: (value) => `${value}B`, // Display y-axis values in billions
				},
			},
		},
	};

	return <Bar data={chartData} options={options} />;
};

export default NetChangeInCashChart;
