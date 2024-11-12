// PriceToBookChart.js
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

const PriceToBookChart = ({ financialData }) => {
	// Prepare data for the bar chart
	const labels = financialData.map(
		(item) => `${item.year} Q${item.quarter}` // X-axis labels: Year + Quarter
	);

	const data = {
		labels,
		datasets: [
			{
				label: "Price to Book Ratio",
				data: financialData.map((item) => item.priceToBook),
				backgroundColor: "rgba(145, 17, 15, 0.5)",
				borderColor: "rgba(145, 17, 15, 0.5)",
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
				text: "Price to Book Ratio Over Time",
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

export default PriceToBookChart;
