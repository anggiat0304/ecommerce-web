import { Component } from "react";
import '../Dropdown/Dropdown.css'
class Dropdown extends Component {

    render() {
        const { title, items } = this.props;
        return (
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    {title}
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    {items.map((item, index) => (
                        <li>
                            <a className="dropdown-item" href="#">{item}</a>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}
export default Dropdown;