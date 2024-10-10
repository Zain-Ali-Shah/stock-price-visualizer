import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

const TeslaEarnings = () => {
	const [earningsData, setEarningsData] = useState(null); // To store the API response data
	const [loading, setLoading] = useState(true); // To manage the loading state
	const [error, setError] = useState(null); // To handle errors

	useEffect(() => {
		// Function to fetch earnings data for Tesla
		const fetchEarningsData = async () => {
			const options = {
				method: "GET",
				url: "https://yahu-finance2.p.rapidapi.com/earnings/tsla",
				headers: {
					"x-rapidapi-key":
						"3db9226ad1mshca8d9d6faf15af9p17d01fjsne8e43d0bb590",
					"x-rapidapi-host": "yahu-finance2.p.rapidapi.com",
				},
			};

			try {
				// Making the Axios request
				const response = await axios.request(options);
				setEarningsData(response.data); // Set the fetched data to state
				setLoading(false); // Turn off loading spinner
			} catch (error) {
				setError("Failed to fetch Tesla earnings data.");
				setLoading(false); // Turn off loading spinner
			}
		};

		// Fetch data when component mounts
		fetchEarningsData();
	}, []);

	// Display loading message
	if (loading) {
		return <p>Loading...</p>;
	}

	// Display error message if there's an error
	if (error) {
		return <p>{error}</p>;
	}

	// Check if earnings data exists and display it
	// if (!earningsData || !earningsData.earnings) {
	// 	return <p>No earnings data available for Tesla.</p>;
	// }

	return (
		<div>
			<h2>Tesla Earnings Data</h2>
			{/* <pre>{JSON.stringify(earningsData, null, 2)}</pre> */}
			{earningsData &&
			earningsData.earningsChart &&
			earningsData.earningsChart.quarterly ? (
				<>
					<h4>Earning Chart Quarterly Data</h4>
					<div className="container mt-4">
						<Table striped bordered hover responsive>
							<thead className="thead-dark">
								<tr>
									<th>Date</th>
									<th>Actual Earnings</th>
									<th>Estimated Earnings</th>
								</tr>
							</thead>
							<tbody>
								{earningsData.earningsChart.quarterly.map((entry, index) => (
									<tr key={index}>
										<td>{entry.date}</td>
										<td>{entry.actual.fmt}</td>
										<td>{entry.estimate.fmt}</td>
									</tr>
								))}
							</tbody>
						</Table>
					</div>
					<h4>Financial Chart Yearly Data</h4>
					<div className="container mt-4">
						<Table striped bordered hover responsive>
							<thead className="thead-dark">
								<tr>
									<th>Date</th>
									<th>Revenue</th>
									<th>Earnings</th>
								</tr>
							</thead>
							<tbody>
								{earningsData.financialsChart.yearly.map((entry, index) => (
									<tr key={index}>
										<td>{entry.date}</td>
										<td>{entry.revenue.longFmt}</td>
										<td>{entry.earnings.longFmt}</td>
									</tr>
								))}
							</tbody>
						</Table>
					</div>
					<h4>Financial Chart Quarterly Data</h4>
					<div className="container mt-4">
						<Table striped bordered hover responsive>
							<thead className="thead-dark">
								<tr>
									<th>Date</th>
									<th>Revenue</th>
									<th>Earnings</th>
								</tr>
							</thead>
							<tbody>
								{earningsData.financialsChart.quarterly.map((entry, index) => (
									<tr key={index}>
										<td>{entry.date}</td>
										<td>{entry.revenue.longFmt}</td>
										<td>{entry.earnings.longFmt}</td>
									</tr>
								))}
							</tbody>
						</Table>
					</div>
				</>
			) : (
				<p>No data available</p>
			)}
		</div>
	);
};

export default TeslaEarnings;
