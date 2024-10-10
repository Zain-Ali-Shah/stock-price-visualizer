import React, { useMemo, useEffect } from "react";
import Select from "react-select";

const YearMonthSelector = ({
	stockData,
	selectedYear,
	selectedMonth,
	onYearChange,
	onMonthChange,
	resetFilters, // Handle reset filters flag
}) => {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const sData = Array.isArray(stockData) ? stockData : [];

	// Generate year options
	const yearOptions = useMemo(() => {
		return Array.from(
			new Set(sData.map((entry) => new Date(entry.datetime).getFullYear()))
		)
			.sort()
			.map((year) => ({ value: year, label: year }));
	}, [sData]);

	// Generate month options based on the selected year
	const monthOptions = useMemo(() => {
		if (!selectedYear) return [];
		return Array.from(
			new Set(
				sData
					.filter(
						(entry) => new Date(entry.datetime).getFullYear() === selectedYear
					)
					.map((entry) => new Date(entry.datetime).getMonth())
			)
		)
			.sort()
			.map((month) => ({
				value: month,
				label: new Date(0, month).toLocaleString("default", { month: "long" }),
			}));
	}, [sData, selectedYear]);

	// Effect to reset the year and month when resetFilters is true
	useEffect(() => {
		if (resetFilters) {
			onYearChange(null);
			onMonthChange(null);
		}
	}, [resetFilters, onYearChange, onMonthChange]);

	// Effect to handle the case where a month is selected but isn't available for the new year
	useEffect(() => {
		if (selectedYear && selectedMonth !== null) {
			const monthExists = monthOptions.some(
				(option) => option.value === selectedMonth
			);
			if (!monthExists) {
				onMonthChange(null);
			}
		}
	}, [selectedYear, monthOptions, selectedMonth, onMonthChange]);

	// Handle year change and adjust the month accordingly
	const handleYearChange = (selectedOption) => {
		const newYear = selectedOption ? selectedOption.value : null;
		onYearChange(newYear);
		if (newYear) {
			const sameMonth = monthOptions.find(
				(option) => option.value === selectedMonth
			);
			if (sameMonth) {
				onMonthChange(sameMonth.value);
			} else {
				onMonthChange(null);
			}
		} else {
			onMonthChange(null);
		}
	};

	// Handle month change
	const handleMonthChange = (selectedOption) => {
		onMonthChange(selectedOption ? selectedOption.value : null);
	};

	return (
		<div>
			{/* Year Dropdown */}
			<Select
				placeholder="Select Year"
				options={yearOptions}
				onChange={handleYearChange}
				className="year-selector"
				value={
					yearOptions.find((option) => option.value === selectedYear) || null
				}
			/>

			{/* Month Dropdown (only show if a year is selected) */}
			{selectedYear && (
				<Select
					placeholder="Select Month"
					options={monthOptions}
					onChange={handleMonthChange}
					value={
						monthOptions.find((option) => option.value === selectedMonth) ||
						null
					}
					className="month-selector"
				/>
			)}
		</div>
	);
};

export default YearMonthSelector;
