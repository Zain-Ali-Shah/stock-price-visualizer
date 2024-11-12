// YearDropdown.js
import React from "react";

const YearDropdown = ({ years, selectedYear, onYearChange }) => {
	return (
		<div
			style={{
				marginTop: "20px",
				marginRight: "20px",
				display: "flex",
				justifyContent: "flex-end", // Align to right
			}}
		>
			<label style={{ marginRight: "10px" }}>Select Year:</label>
			<select
				value={selectedYear}
				onChange={(e) => onYearChange(e.target.value)}
			>
				<option value="">All Years</option>
				{years.map((year) => (
					<option key={year} value={year}>
						{year}
					</option>
				))}
			</select>
		</div>
	);
};

export default YearDropdown;
