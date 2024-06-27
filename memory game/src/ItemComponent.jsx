import PropTypes from "prop-types";

function Item({ name, img }) {
	return (
		<div
			className="size-60  relative border-4 border-black rounded-lg shadow-lg p-4 max-w-xs mx-auto mb-4"
			style={{
				backgroundImage: "url(" + `${img}` + ")",
				backgroundPosition: "center",
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
			}}
		>
			<div className="absolute inset-0 text-transparent bg-black bg-opacity-0 hover:text-white hover:bg-opacity-50 transition">
				<p className="relative text-center text-2xl pt-24 ">{name}</p>
			</div>
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
