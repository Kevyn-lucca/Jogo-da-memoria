import PropTypes from "prop-types";

function Item({ Name, img }) {
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
			<p>{Name}</p>
		</div>
	);
}

Item.propTypes = {
	Name: PropTypes.string.isRequired,
	img: PropTypes.string.isRequired,
};

export default Item;
