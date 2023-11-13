import "./Main.scss";
import {Videos} from "../mockData/Videos";
import {VideoObject} from "../implementations/VideoObject";

export const Main = ({url}: {url: string}) => {
	const parsedURL: number = parseInt(url.slice(1));
	let content;

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

			return <div key={id}>
				<h1>{title}</h1>
				<video src={video} width="400" controls={true} autoPlay={false}/>
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