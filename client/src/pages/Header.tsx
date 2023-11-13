import "./Header.scss";
import SearchBar from "../components/search/searchBar/SearchBar";
import {Videos} from "../mockData/Videos";

export const Header = () => {

	return (
		<div id={"header"}>
			<div id="searchBar">
				<SearchBar placeholder="Videa" videos={Videos}></SearchBar>
			</div>
		</div>
	);
};