import "./Main.scss";
import "../grid.scss"
import {Videos} from "../mockData/Videos";
import {VideoObject} from "../implementations/VideoObject";
import {useState} from "react";

export const Main = ({url}: {url: string}) => {
	const [parsedURL, setParsedURL] = useState(parseInt(url.slice(1)));
	let content;

	const handleOnClick = (id: number) => {
		window.location.pathname = "/" + id;
		setParsedURL(id);
	}

	parsedURL > 0 ?
		content = Videos.filter((video: VideoObject): boolean => video.id === parsedURL)
			.map(({id, title, creator, video, description}: VideoObject) => {

				return <div key={id}>
					<h1>{title}</h1>
					<video src={video} width="800" controls={true} autoPlay={false}/>
					<h2>{creator}</h2>
					<p>{description}</p>
				</div>
			}) :
		content = Videos.map(({id, title, creator, video, description}: VideoObject) => {

			return <div key={id} id={"video"} className={"col span-1-of-3"}>
				<h1>{title}</h1>
				<video src={video} width="400" controls={false} autoPlay={false} onClick={() => handleOnClick(id)}/>
				<h2>{creator}</h2>
				<p>{description}</p>
			</div>
		})

	return (
		<div id={"main"}>
			{content}
		</div>
	);
};