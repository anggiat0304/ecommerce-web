import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCategoriesList } from "../../../../actions/CategoriesAction";
import GenericResponse from "../../../../dto/GenericResponse";

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: '',
            currentPage: 1,
            itemsPerPage: 10,
            data: [],
        };
    }


    handleFilterChange = (e) => {
        this.setState({ filter: e.target.value, currentPage: 1 });
    };

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    };
    componentDidMount() {
        this.props.dispatch(getCategoriesList());
    }
    componentDidUpdate(prevProps) {
        if (prevProps.categories !== this.props.categories) {
            const { categories } = this.props;
            const data = categories.data ? categories.data : null;
            console.log(data)
            const responseObj = new GenericResponse(data.data != null ? data.data.message : null, data.data != null ? data.data.success : false, data.data != null ? data.data.Data : null);
            console.log(responseObj);
            const categoryList = responseObj == null ? [] : responseObj.data;
            console.log(categoryList)

            // Update the state's data array with categoryList
            this.setState({
                data: categoryList?.map((category, index) => ({
                    id: index + 1,
                    code:category.code,
                    name: category.name,
                    description: category.description, // Assuming you have a description property in your data
                })),
            });
        }
    }


render() {
    const { filter, currentPage, itemsPerPage, data } = this.state;

    // Filter data based on the input
    const filteredData = data?.filter(
        (item) =>
            item.name.toLowerCase().includes(filter.toLowerCase()) ||
            item.description.toLowerCase().includes(filter.toLowerCase())
    );

    // Paginate the filtered data
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData?.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="container">
            <h1>Categories</h1>
            <div className="row">
                <div className="col-md-12" style={{ float: 'right' }}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Select by name or category"
                        id="filter"
                        name="filter"
                        value={filter}
                        onChange={this.handleFilterChange}
                    />
                </div>
                <div className="col-md-12">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems?.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.code}</td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>
                                        <Link to={`/detail-category/${item.code}`}>
                                            <i className="bi bi-eye"></i>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Pagination */}
                    <div className="pagination">
                        {Array.from({ length: Math.ceil(filteredData?.length / itemsPerPage) }).map((_, index) => (
                            <button className="btn btn-secondary" style={{ marginRight: "5px" }} key={index} onClick={() => this.handlePageChange(index + 1)}>
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
}
const mapStateToProps = (state) => {
    return {
        categories: state.categories
    };
};
export default connect(mapStateToProps)(Category);