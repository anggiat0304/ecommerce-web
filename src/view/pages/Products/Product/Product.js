import { Component } from "react";
import { Link } from "react-router-dom";
import '../Product/Product.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { connect } from "react-redux";
import { getProductList, deleteProduct } from "../../../../actions/ProductAction";
import GenericResponse from "../../../../dto/GenericResponse";
import { Carousel, Modal, Button } from 'react-bootstrap';
class Product extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filterName: '',
            filterCode: '',
            filterCategory: '',
            productList: [],
            showDeleteModal: false,
            productToDelete: null,
        };
    }

    handleFilterChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    };


    componentDidMount() {
        this.props.dispatch(getProductList());
    }

    componentDidUpdate(prevProps) {
        // Check for changes in the products prop
        if (prevProps.products !== this.props.products) {
            const { products } = this.props;
            const data = products.data ? products.data : null;
            console.log(products)
            const responseObj = new GenericResponse(data.data != null ? data.data.message : null, data.data != null ? data.data.success : false, data.data != null ? data.data.Data : null);
            console.log(responseObj);
            const productList = responseObj == null ? [] : responseObj.data;
            console.log(productList)
            // Update the state with the new productList
            this.setState({
                productList: productList,
            });
        }
    }
    handleShowDeleteModal = (product) => {
        this.setState({
            showDeleteModal: true,
            productToDelete: product,
        });
    };

    handleCloseDeleteModal = () => {
        this.setState({
            showDeleteModal: false,
            productToDelete: null,
        });
    };

    handleDeleteProduct = async () => {
        const { productToDelete } = this.state;
        const { delProd, dispatch } = this.props;

        if (productToDelete) {
            try {
                // Dispatch action to delete product
                await dispatch(deleteProduct(productToDelete.code));

                const delData = delProd.data ? delProd.data : null;
                console.log(delData);

                const responseObj = new GenericResponse(
                    delData?.data?.message || null,
                    delData?.data?.success || false,
                    delData?.data?.Data || null
                );

                // Close the delete confirmation modal
                this.handleCloseDeleteModal();

                if (delData?.success) {
                    // If the deletion was successful, reload the page
                    this.forceUpdate()
                } else {
                    // Handle the case where deletion was not successful
                    console.log(responseObj.message);
                }
            } catch (error) {
                // Handle any error that might occur during the deletion process
                console.error('Error during deletion:', error);
            }
        }
    };


    render() {
        const { filterName, productList, showDeleteModal } = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>Daftar Produk</h1>
                    </div>
                    <div className="col-md-6">
                        <Link to="tambah-produk">
                            <button className="btn btn-primary">
                                <i className="bi bi-clipboard-plus"></i> Tambah Produk
                            </button>
                        </Link>
                    </div>
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Filter by name, code, or category"
                            id="filterName"
                            name="filterName"
                            value={filterName}
                            onChange={this.handleFilterChange}
                        />
                    </div>
                    <div className="col-md-12">
                        <div className="row">
                            {
                                productList && productList
                                    .filter(product =>
                                        (product.productName && product.productName.toLowerCase().includes(filterName.toLowerCase())) ||
                                        (product.code && product.code.toLowerCase().includes(filterName.toLowerCase())) ||
                                        (product.categoryList && product.categoryList.some(category => category.name && category.name.toLowerCase().includes(filterName.toLowerCase())))
                                    )
                                    .map((product, index) => (
                                        <div className="col-md-2" key={index}>
                                            <div className="card" style={{ width: '200px' }}>
                                                {/* You may need to update these fields based on your actual product data */}
                                                {!product.imageUrl || product.imageUrl.length === 0 ? (
                                                    <div
                                                        style={{
                                                            height: '150px',
                                                            width: '100%',
                                                            backgroundColor: '#f0f0f0',
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                        }}
                                                    >
                                                        <span>No Image Available</span>
                                                    </div>
                                                ) : (
                                                    <Carousel interval={null} style={{ height: '150px', width: '100%' }}>
                                                        {product.imageUrl.map((image, imageIndex) => (
                                                            <Carousel.Item key={imageIndex}>
                                                                <img
                                                                    src={image}
                                                                    style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                                                                    className="d-block w-100"
                                                                    alt={`Placeholder ${imageIndex + 1}`}
                                                                />
                                                            </Carousel.Item>
                                                        ))}
                                                    </Carousel>
                                                )}
                                                <div className="card-body" style={{ fontSize: '12px' }}>
                                                    <h5 className="card-title" style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                                        {product.productName}
                                                    </h5>
                                                    <p className="card-text" style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                                        {product.code}
                                                    </p>
                                                    <p className="card-text" style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                                        {product.price}
                                                    </p>
                                                    <p className="card-text" style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                                        {product.categoryList.length > 0
                                                            ? product.categoryList.map((category, index) => (
                                                                <span key={index} className="badge bg-secondary me-2" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                                    {category.name}
                                                                </span>
                                                            ))
                                                            : 'N/A'}
                                                    </p>
                                                    <Link to={`/product/${product.code}`} className="btn btn-primary" style={{ float: 'left' }}>
                                                        Detail
                                                    </Link>
                                                    <button className="btn btn-danger" onClick={() => this.handleShowDeleteModal(product)} style={{ float: 'right' }}>
                                                        <i className="bi bi-trash3-fill"></i> Delete
                                                    </button>
                                                </div>


                                            </div>
                                        </div>
                                    ))}
                        </div>
                    </div>
                </div>
                {/* Modal for delete confirmation */}
                <Modal show={showDeleteModal} onHide={this.handleCloseDeleteModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete the product?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCloseDeleteModal}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={this.handleDeleteProduct}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        products: state.products,
        delProd: state.deleteProduct
    };
};
export default connect(mapStateToProps)(Product);