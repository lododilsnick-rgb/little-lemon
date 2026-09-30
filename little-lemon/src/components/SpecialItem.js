export default function SpecialItem(props) {
    return (
        <div class="special-item">
            <div>
                <div class="special-item-img-container">
                    <img src={props.imageUrl} />
                </div>
                <div class="special-item-text">
                    <div class="special-item-title card-title">
                        <div>{props.name}</div>
                        <div class="special-item-price">${props.price}</div>
                    </div>
                    <div class="card-paragraph-text">
                        {props.description}
                    </div>

                </div>
            </div>
            <div class="special-item-text">
                <button class="">Order a delivery <img src="images/basket.svg" /></button>
            </div>
        </div>
    );
}