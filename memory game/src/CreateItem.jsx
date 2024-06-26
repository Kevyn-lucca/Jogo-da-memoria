import { useEffect, useState } from "react";
import Item from "./ItemComponent";

/*
    Todos:
    resolva o bug onde a api esta sendo chamada varias vezes
    crie o objeto que tera a função de interação com o click
    crie um array de objetos que e mostrado na pagina, que contem os objetos gerados.
    crie a função que realiza o enbaralho dos itens com os itens já no array, sem realizar outra chamada de api

*/

function GetData() {
	const [Imgdata, setImg] = useState(null);
	const [NameData, setName] = useState(null);

	useEffect(() => {
		const url = `http://gateway.marvel.com/v1/public/characters?limit=20&offset=${Math.floor(
			Math.random() * 1000
		)}&ts=1719369308228&apikey=7b8afad76ccf71f95807ed5d89e2a407&hash=a73f86b0a70c03174f7b04429000f26c`;
		console.log(url);
		const fetchData = async () => {
			const response = await fetch(url);
			const answer = await response.json();
			const characters = answer.data.results[0];
			const name = characters.name;
			const img =
				characters.thumbnail.path + "." + characters.thumbnail.extension;
			setName(name);
			setImg(img);
		};

		fetchData();
	}, []);

	return (
		<>
			<Item Name={NameData} img={Imgdata} />
		</>
	);
}

export default GetData;
