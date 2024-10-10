import React from "react";
import Table from "react-bootstrap/Table";
import "./StockTable.css"; // Import the custom CSS file

function StockTable({ stockData }) {
	const stData = Array.isArray(stockData) ? stockData : [];
	// Sort sData by date
	const data = stData.sort(
		(a, b) => new Date(a.datetime) - new Date(b.datetime)
	);
	return (
		<Table responsive bordered hover className="stock-table">
			<thead className="table-header">
				<tr>
					<th>DateTime</th>
					<th>Open</th>
					<th>High</th>
					<th>Low</th>
					<th>Close</th>
					<th>Volume</th>
				</tr>
			</thead>
			<tbody>
				{data.map((values, index) => (
					<tr key={index}>
						<td>{values.datetime}</td>
						<td>{values.open}</td>
						<td>{values.high}</td>
						<td>{values.low}</td>
						<td>{values.close}</td>
						<td>{values.volume}</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
}

export default StockTable;
