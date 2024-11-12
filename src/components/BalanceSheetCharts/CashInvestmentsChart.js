// CashInvestmentsChart.js
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

const CashInvestmentsChart = ({ financialData }) => {
	// Prepare data for the bar chart
	const labels = financialData.map(
		(item) => `${item.year} Q${item.quarter}` // X-axis labels: Year + Quarter
	);

	const data = {
		labels,
		datasets: [
			{
				label: "Cash & Short Term Investments",
				data: financialData.map((item) => item.cashInvestments / 1e9),
				backgroundColor: "rgba(247, 114, 230, 0.5)", // Orange color for bars
				borderColor: "rgba(247, 114, 230, 0.5)",
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
				text: "Cash & Short Term Investments Over Time (in Billions)",
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

export default CashInvestmentsChart;
