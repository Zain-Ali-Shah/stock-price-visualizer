// CashFlowBreakdownChart.js
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

const CashFlowBreakdownChart = ({ cashFlowData }) => {
	// Prepare the chart data
	const chartData = {
		labels: cashFlowData.map((item) => `Q${item.quarter} ${item.year}`),
		datasets: [
			{
				label: "Cash from Operations",
				data: cashFlowData.map((item) => item.cashFromOperations / 1e9), // Convert to billions
				backgroundColor: "red",
				borderColor: "red",
				borderWidth: 1,
			},
			{
				label: "Cash from Investing",
				data: cashFlowData.map((item) => item.cashFromInvesting / 1e9),
				backgroundColor: "rgba(184, 35, 132, 0.5)",
				borderColor: "rgba(184, 35, 132, 0.5)",
				borderWidth: 1,
			},
			{
				label: "Cash from Financing",
				data: cashFlowData.map((item) => item.cashFromFinancing / 1e9),
				backgroundColor: "rgba(196, 235, 68, 0.5)",
				borderColor: "rgba(196, 235, 68, 0.5)",
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
				text: "Cash Flow Breakdown by Quarter (in Billions)",
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

export default CashFlowBreakdownChart;
