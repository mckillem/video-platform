import {Link} from "react-router-dom";
import { logo } from "../utils/constants";
import {SearchBar} from "./SearchBar";
import "./Navbar.scss";

export const Navbar = () => (
	<div id={"nav-bar"}>
		<Link to={"/"} id={"link"}>
			<img src={logo} alt="logo" height={45} />
		</Link>
		<SearchBar></SearchBar>
	</div>
)
