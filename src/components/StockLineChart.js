import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import {
	Chart as ChartJS,
	LineElement,
	PointElement,
	LinearScale,
	Title,
	Tooltip,
	Legend,
	TimeScale,
	Filler,
} from "chart.js";

// Register the components and plugins you need
ChartJS.register(
	LineElement,
	PointElement,
	LinearScale,
	Title,
	Tooltip,
	Legend,
	TimeScale,
	Filler
);

const StockLineChart = ({ stockData, selectedYear, selectedMonth }) => {
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
				label: "Open Price",
				data: filteredData.map((entry) => entry.open),
				fill: false,
				borderColor: "rgba(75,192,192,1)",
				tension: 0.1,
				pointRadius: 2,
				pointBackgroundColor: "rgba(75,192,192,1)",
			},
			{
				label: "High Price",
				data: filteredData.map((entry) => entry.high),
				fill: false,
				borderColor: "rgba(54, 162, 235, 1)",
				tension: 0.1,
				pointRadius: 2,
				pointBackgroundColor: "rgba(54, 162, 235, 1)",
			},
			{
				label: "Low Price",
				data: filteredData.map((entry) => entry.low),
				fill: false,
				borderColor: "rgba(255, 206, 86, 1)",
				tension: 0.1,
				pointRadius: 2,
				pointBackgroundColor: "rgba(255, 206, 86, 1)",
			},
			{
				label: "Close Price",
				data: filteredData.map((entry) => entry.close),
				fill: false,
				borderColor: "rgba(153, 102, 255, 1)",
				tension: 0.1,
				pointRadius: 2,
				pointBackgroundColor: "rgba(153, 102, 255, 1)",
			},
		],
	};

	const options = {
		scales: {
			x: {
				type: "time",
				time: {
					unit: "day",
				},
				title: {
					display: true,
					text: "Date",
				},
			},
			y: {
				title: {
					display: true,
					text: "Price",
				},
			},
		},
	};

	return (
		<div>
			<Line data={data} options={options} />
		</div>
	);
};

export default StockLineChart;
