import {ChangeEvent, useState} from "react";
import "./SearchBar.scss";
import {VideoObject} from "../../../implementations/VideoObject";

function SearchBar({ placeholder, videos }: {placeholder: string, videos: VideoObject[]}) {
	const [filteredVideos, setFilteredVideos] = useState<VideoObject[]>([]);
	const [wordEntered, setWordEntered] = useState<string>("");

	const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
		const searchWord: string = event.target.value;
		setWordEntered(searchWord);
		const videosFilter: VideoObject[] = videos.filter((value: VideoObject) => value.title.toLowerCase().includes(searchWord.toLowerCase()));

		if (searchWord === "") {
			setFilteredVideos([]);
		} else {
			setFilteredVideos(videosFilter);
		}
	};

	return (
		<div className="search">
			<div className="searchInputs">
				<input
					type="text"
					placeholder={placeholder}
					value={wordEntered}
					onChange={handleFilter}
				/>
			</div>
			{filteredVideos.length !== 0 && (
				<div className="dataResult">
					<h3>Videa</h3>
					{filteredVideos.slice(0, 15).map(({id, title}: VideoObject) => {
						return (
							<div key={id}>
								<a className="dataItem" href={"/video" + id} target="_self">
								 	<p>{title}</p>
								</a>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}

export default SearchBar;