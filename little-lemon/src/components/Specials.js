import SpecialItem from "./SpecialItem";

export default function Specials() {
    const specialsData = [
        {
            id: '1',
            imageUrl: 'images/greek-salad.jpg',
            name: 'Greek salad',
            price: 12.99,
            description:
                `The famous greek salad of
crispy lettuce, peppers, olives and out Chicago style feta cheese,
garnished with crunchy garlic and rosemary croutons.`
        },
        {
            id: '2',
            imageUrl: 'images/bruchetta.svg',
            name: 'Bruchetta',
            price: 5.99,
            description: 'Designer'

        },
        {
            id: '3',
            imageUrl: 'images/lemon-dessert.jpg',
            name: 'Lemon Dessert',
            price: 12.99,
            description: 'Manager',

        }
    ];
    return (<>
        <div className="specials-title">
            <div className="section-title-text">
                This weeks specials!
            </div>
            <div className="specials-title-button-container">
                <button className="app-hero-button"
                    aria-label="Click to access the online menu">
                    Online Menu
                </button>
            </div>
        </div>
        <div className="grid-container">
            {specialsData.map((dataItem) => (
                <SpecialItem key={dataItem.id}
                    imageUrl={dataItem.imageUrl}
                    name={dataItem.name}
                    price={dataItem.price}
                    description={dataItem.description}
                />
            ))}
        </div>
    </>
    );
}