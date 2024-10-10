import { Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	BarElement,
	CategoryScale,
	LinearScale,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

// Register necessary components for the bar chart
ChartJS.register(
	BarElement,
	CategoryScale,
	LinearScale,
	Title,
	Tooltip,
	Legend
);

const ClosePriceBarChart = ({ stockData, selectedYear, selectedMonth }) => {
	const filterData = () => {
		let filteredData = Array.isArray(stockData) ? stockData : [];
		if (selectedYear) {
			filteredData = filteredData.filter(
				(entry) => new Date(entry.datetime).getFullYear() === selectedYear
			);
			if (selectedMonth !== null) {
				filteredData = filteredData.filter((entry) => {
					const date = new Date(entry.datetime);
					return date.getMonth() === selectedMonth;
				});
			}
		}
		return filteredData;
	};

	const filteredData = filterData();
	const data = {
		labels: filteredData.map((entry) => entry.datetime),
		datasets: [
			{
				label: "Close Price",
				data: filteredData.map((entry) => entry.close),
				backgroundColor: "rgba(153, 102, 255, 0.6)",
				borderColor: "rgba(153, 102, 255, 1)",
				borderWidth: 1,
			},
		],
	};

	const options = {
		scales: {
			x: {
				title: {
					display: true,
					text: "Date",
				},
			},
			y: {
				title: {
					display: true,
					text: "Close Price",
				},
			},
		},
		responsive: true,
		plugins: {
			legend: {
				display: true,
				position: "top",
			},
		},
	};

	return (
		<>
			<Bar data={data} options={options} />
		</>
	);
};

export default ClosePriceBarChart;
