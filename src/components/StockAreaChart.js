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

const StockAreaChart = ({ stockData, selectedYear, selectedMonth }) => {
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
				label: "Volume",
				data: filteredData.map((entry) => entry.volume),
				fill: true,
				backgroundColor: "rgba(75,192,192,0.4)",
				borderColor: "rgba(75,192,192,1)",
				tension: 0.1,
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
					text: "Volume",
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

export default StockAreaChart;
