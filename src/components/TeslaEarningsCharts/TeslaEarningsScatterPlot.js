import React from "react";
import { Scatter } from "react-chartjs-2";
import {
	Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	PointElement,
	CategoryScale,
	LinearScale,
} from "chart.js";

// Register necessary chart elements
ChartJS.register(
	Title,
	Tooltip,
	Legend,
	PointElement,
	CategoryScale,
	LinearScale
);

const TeslaEarningsScatterPlot = ({ teslaEarningsData }) => {
	// Prepare scatter plot data
	const data = {
		datasets: [
			{
				label: "Actual Earnings",
				data: teslaEarningsData.map((item) => ({
					x: item.date,
					y: item.actualEarnings,
				})),
				backgroundColor: "rgba(54, 162, 235, 0.7)", // Blue color
				pointRadius: 8,
			},
			{
				label: "Estimated Earnings",
				data: teslaEarningsData.map((item) => ({
					x: item.date,
					y: item.estimatedEarnings,
				})),
				backgroundColor: "rgba(230, 230, 230, 0.7)", // Red color
				pointRadius: 8,
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
				text: "Tesla Earnings: Actual vs Estimated",
			},
		},
		scales: {
			y: {
				display: false, // Completely hide the Y-axis
			},
			x: {
				type: "category", // Keep the quarters in sequence
				title: {
					display: true,
					text: "Quarter",
				},
			},
		},
	};

	return <Scatter data={data} options={options} />;
};

export default TeslaEarningsScatterPlot;
