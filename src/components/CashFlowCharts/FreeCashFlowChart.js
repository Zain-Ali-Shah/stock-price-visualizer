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
	LineElement,
	PointElement,
} from "chart.js";
import regression from "regression";

// Register the chart components
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

const FreeCashFlowChart = ({ cashFlowData }) => {
	// Prepare the data for the chart
	const labels = cashFlowData.map((item) => `Q${item.quarter} ${item.year}`);
	const freeCashFlowValues = cashFlowData.map(
		(item) => item.freeCashFlow / 1e9
	); // Convert to billions for readability

	// Calculate trend line data using linear regression
	const dataPoints = freeCashFlowValues.map((value, index) => [index, value]);
	const regressionResult = regression.linear(dataPoints);
	const trendLineData = dataPoints.map(
		(point) => regressionResult.predict(point[0])[1]
	);

	// Define chart data including the trend line
	const chartData = {
		labels: labels,
		datasets: [
			{
				label: "Free Cash Flow",
				data: freeCashFlowValues,
				backgroundColor: "rgba(24, 135, 20, 0.5)", // Bar color
				borderColor: "rgba(24, 135, 20, 0.5)", // Border color
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
				text: "Free Cash Flow by Quarter (in billions)",
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

export default FreeCashFlowChart;
