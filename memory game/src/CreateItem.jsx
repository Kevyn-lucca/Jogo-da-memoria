import { useEffect, useState } from "react";
import Item from "./ItemComponent";

class CardObject {
	constructor(name, img) {
		this.name = name;
		this.img = img;
		this.id = name + img;
	}

	static GenerateCard(name, img) {
		return new CardObject(name, img);
	}
}

function GetData() {
	const [objectArray, setObjectArray] = useState([]);
	const [score, setScore] = useState(0);
	const [maxScore, setMaxScore] = useState(0);
	const [clicked, setClicked] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				`http://gateway.marvel.com/v1/public/characters?limit=40&offset=${Math.floor(
					Math.random() * 5000
				)}&ts=1719369308228&apikey=7b8afad76ccf71f95807ed5d89e2a407&hash=a73f86b0a70c03174f7b04429000f26c`
			);

			const data = await response.json();
			const characters = data.data.results;
			const fetchedData = characters
				.map((character) => {
					const name = character.name;
					const img =
						character.thumbnail.path + "." + character.thumbnail.extension;
					return CardObject.GenerateCard(name, img);
				})
				.filter(
					(card) =>
						card.img !==
							"http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" &&
						card.img !==
							"http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif"
				);
			setObjectArray(fetchedData);
		};

		fetchData();
	}, []);

	const shuffleArray = (array) => {
		const newArray = [...array];
		for (let i = newArray.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
		}
		return newArray;
	};

	function handleCardClick(cardId) {
		if (clicked.find((card) => card === cardId)) {
			setScore(0);
		} else {
			setScore(score + 1);
			if (score >= maxScore) {
				setMaxScore(score + 1);
			}
		}
		setClicked((prevState) => [...prevState, cardId]);
		setObjectArray(shuffleArray(objectArray));
	}

	return (
		<div>
			<div>
				<p>Score: {score}</p>
				<p>Max Score: {maxScore}</p>
			</div>
			{objectArray.map((card) => (
				<button key={card.id} onClick={() => handleCardClick(card.id)}>
					<Item name={card.name} img={card.img} />
				</button>
			))}
		</div>
	);
}

export default GetData;
