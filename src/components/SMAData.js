import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

const SMAData = () => {
	// State variables for the fetched data, loading status, and error handling
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Fetch data when the component mounts
	useEffect(() => {
		const fetchSMAData = async () => {
			const options = {
				method: "GET",
				url: "https://alpha-vantage.p.rapidapi.com/query",
				params: {
					time_period: "60",
					interval: "daily",
					series_type: "close",
					function: "SMA",
					symbol: "MSFT", // Microsoft stock symbol
					datatype: "json",
				},
				headers: {
					"x-rapidapi-key":
						"3db9226ad1mshca8d9d6faf15af9p17d01fjsne8e43d0bb590",
					"x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
				},
			};

			try {
				const response = await axios.request(options);
				setData(response.data); // Store the fetched data
				setLoading(false); // Stop the loading spinner
			} catch (error) {
				setError("Failed to fetch data.");
				setLoading(false); // Stop loading spinner even on error
			}
		};

		fetchSMAData();
	}, []); // Empty array ensures this effect runs only once on component mount

	// Conditional rendering based on loading and error state
	if (loading) {
		return <p>Loading...</p>; // Display loading message
	}

	if (error) {
		return <p>{error}</p>; // Display error message
	}

	// Render the fetched data if available
	return (
		<div>
			<h2>SMA Data for MSFT</h2>
			{/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
			<Table striped bordered hover responsive>
				<thead className="thead-dark">
					<tr>
						<th>Time</th>
						<th>SMA Value</th>
					</tr>
				</thead>
				<tbody>
					{Object.keys(data["Technical Analysis: SMA"]).map((time, index) => (
						<tr key={index}>
							<td>{time}</td>
							<td>{data["Technical Analysis: SMA"][time]["SMA"]}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
};

export default SMAData;
