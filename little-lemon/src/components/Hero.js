export default function Hero() {
    return (
        <div className="app-hero">
            <div>
                <div className="app-hero-title display-title-text">
                    Little Lemon
                </div>
                <div className="app-hero-sub-title sub-title-text">
                    Chicago
                </div>
                <div className="app-hero-description lead-text">
                    We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
                </div>
                <div>
                    <button className="app-hero-button"
                        aria-label="Click to reserve a table">
                        Reserve a Table
                    </button>
                </div>
            </div>
            <div className="app-hero-img-container">
                <img src="images/restauranfood.jpg"
                    aria-label="picture of restaurant food" />
            </div>
        </div>
    );
}