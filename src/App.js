import "./App.css";
// import StockData from "./components/StockData";
import StockRecommendations from "./components/StockRecommendations";
import SMAData from "./components/SMAData";
import TeslaEarnings from "./components/TeslaEarnings";
import CashFlowData from "./components/CashFlowData";
import BalanceSheetTable from "./components/BalanceSheetTable";
import IncomeStatement from "./components/IncomeStatement";

function App() {
	return (
		<>
			{/* <StockData /> */}
			<StockRecommendations />
			<SMAData />
			<TeslaEarnings />
			<CashFlowData />
			<BalanceSheetTable />
			<IncomeStatement />
		</>
	);
}

export default App;
