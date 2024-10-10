import React from "react";

// Stock symbols to display in the dropdown (20 stocks)
const stockSymbols = [
	{ label: "Microsoft (MSFT)", value: "MSFT" },
	{ label: "Apple (AAPL)", value: "AAPL" },
	{ label: "Google (GOOGL)", value: "GOOGL" },
	{ label: "Amazon (AMZN)", value: "AMZN" },
	{ label: "Tesla (TSLA)", value: "TSLA" },
	{ label: "NVIDIA (NVDA)", value: "NVDA" },
	{ label: "Facebook (META)", value: "META" },
	{ label: "Netflix (NFLX)", value: "NFLX" },
	{ label: "Adobe (ADBE)", value: "ADBE" },
	{ label: "Intel (INTC)", value: "INTC" },
	{ label: "Cisco (CSCO)", value: "CSCO" },
	{ label: "Salesforce (CRM)", value: "CRM" },
	{ label: "Alibaba (BABA)", value: "BABA" },
	{ label: "Berkshire Hathaway (BRK.B)", value: "BRK.B" },
	{ label: "Visa (V)", value: "V" },
	{ label: "Mastercard (MA)", value: "MA" },
	{ label: "PayPal (PYPL)", value: "PYPL" },
	{ label: "Square (SQ)", value: "SQ" },
	{ label: "Uber (UBER)", value: "UBER" },
	{ label: "Lyft (LYFT)", value: "LYFT" },
];

// StockSelector component to handle dropdown selection
const StockSelector = ({ selectedStock, onStockChange }) => {
	return (
		<div className="text-center mb-3">
			<label htmlFor="stockSelect">Select Stock: </label>
			<select
				id="stockSelect"
				value={selectedStock}
				onChange={(e) => onStockChange(e.target.value)}
				className="ml-2"
			>
				{stockSymbols.map((stock) => (
					<option key={stock.value} value={stock.value}>
						{stock.label}
					</option>
				))}
			</select>
		</div>
	);
};

export default StockSelector;
