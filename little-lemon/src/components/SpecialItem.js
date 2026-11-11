export default function SpecialItem(props) {
    return (
        <div className="special-item">
            <div>
                <div className="special-item-img-container">
                    <img src={props.imageUrl}
                        aria-label="Picture of the special item." />
                </div>
                <div className="special-item-text">
                    <div className="special-item-title card-title">
                        <div>{props.name}</div>
                        <div className="special-item-price">${props.price}</div>
                    </div>
                    <div className="card-paragraph-text">
                        {props.description}
                    </div>

                </div>
            </div>
            <div className="special-item-text">
                <button className="">Order a delivery <img src="images/basket.svg"
                    aria-label="Picture of basket" /></button>
            </div>
        </div>
    );
}