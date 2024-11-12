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
	LineElement,
	PointElement,
} from "chart.js";
import regression from "regression";

// Register chart components
ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	LineElement,
	PointElement
);

const NetChangeInCashChart = ({ cashFlowData }) => {
	// Prepare labels and data for chart
	const labels = cashFlowData.map((item) => `Q${item.quarter} ${item.year}`);
	const netChangeInCashValues = cashFlowData.map(
		(item) => item.netChangeInCash / 1e9
	); // Convert to billions

	// Calculate trend line data using linear regression
	const dataPoints = netChangeInCashValues.map((value, index) => [
		index,
		value,
	]);
	const regressionResult = regression.linear(dataPoints);
	const trendLineData = dataPoints.map(
		(point) => regressionResult.predict(point[0])[1]
	);

	// Define chart data including the trend line
	const chartData = {
		labels: labels,
		datasets: [
			{
				label: "Net Change in Cash",
				data: netChangeInCashValues,
				backgroundColor: "rgba(31, 29, 171, 0.5)", // Bar color
				borderColor: "rgba(31, 29, 171, 0.5)",
				borderWidth: 1,
				type: "bar",
			},
			{
				label: "Trend Line",
				data: trendLineData,
				borderColor: "rgba(255, 99, 132, 1)", // Trend line color
				borderWidth: 2,
				fill: false,
				type: "line",
				pointRadius: 0, // Hide points on the trend line
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
				text: "Net Change in Cash by Quarter (in billions)",
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

export default NetChangeInCashChart;
