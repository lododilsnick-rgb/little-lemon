export default function SpecialItem(props) {
    return (
        <div class="special-item">
            <div>
                item picture
            </div>
            <div>
               <div>name</div>
               <div>description #{props.test}</div>
               <div>order button</div>
            </div>
        </div>
    );
}