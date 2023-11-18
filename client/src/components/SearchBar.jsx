import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import "./SearchBar.scss";

export const SearchBar = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();

		if (searchTerm) {
			navigate(`/search/${searchTerm}`);

			setSearchTerm('');
		}
	};

	return (
		<form id={"search-bar"} onSubmit={handleSubmit}>
			<input
				className='search-bar'
				placeholder='Search...'
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
			<button id={"submit"} type='submit' aria-label='search'>
				<SearchIcon />
			</button>
		</form>
	);
};