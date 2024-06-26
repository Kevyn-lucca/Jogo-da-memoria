import PropTypes from "prop-types";

function Item({ name, img }) {
	return (
		<div
			className="size-60"
			style={{
				backgroundImage: "url(" + `${img}` + ")",
				backgroundPosition: "center",
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
			}}
		>
			<p>{name}</p>
		</div>
	);
}

Item.propTypes = {
	name: PropTypes.string.isRequired,
	img: PropTypes.string.isRequired,
};

export default Item;

/*
    Todos:
    resolva o bug onde a api esta sendo chamada varias vezes // isso se resolve na build
    crie a função de interação com o click
    crie um array de objetos que e mostrado na pagina, que contem os objetos gerados. // feito
    crie a função que realiza o enbaralho dos itens com os itens já no array, sem realizar outra chamada de api

*/
