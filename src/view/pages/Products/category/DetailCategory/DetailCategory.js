import { Component, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RelatedProduct from "../../../../component/RelatedProduct/RelatedProduct";
import { Carousel } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { getCategory } from "../../../../../actions/CategoriesAction";
const CategoryDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    // Mock data for related products (replace it with your actual data)
    const [relatedProducts, setRelatedProducts] = useState([
        { id: 1, productName: 'Product 1', code: '87687877', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
        { id: 2, productName: 'Product 2', code: '990908099', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum ' },
        { id: 3, productName: 'Product 3', code: '980989980', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
        { id: 4, productName: 'Product 4', code: '98080889080', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
        { id: 5, productName: 'Product 5', code: '9808098809', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
        { id: 3, productName: 'Product 6', code: '9808098809', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
        { id: 4, productName: 'Product 7', code: '9808098809', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
        { id: 5, productName: 'Product 8', code: '9808098809', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
        // Add more related products as needed
    ]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState("Book");
    const [editedDescription, setEditedDescription] = useState("Ini adalah buku");

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        // Simpan perubahan
        // Di sini, Anda dapat mengirimkan data ke backend atau melakukan operasi lainnya
        setIsEditing(false);
    };

    const handleSearchChange = (e) => {
        setSearchKeyword(e.target.value);
    };

    useEffect(() => {
        dispatch(getCategory(id))
    },[dispatch,id])
    const handleDelete = (productId) => {
        const updatedProducts = relatedProducts.filter(product => product.id !== productId);
        setRelatedProducts(updatedProducts);
    };

    const filteredProducts = relatedProducts.filter(product =>
        product.productName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        product.code.startsWith(searchKeyword.toLowerCase())
    );

    const renderRelatedProducts = () => {
        return (
            <div className="row" style={{ overflowY: filteredProducts.length > 3 ? 'auto' : 'hidden', maxHeight: '600px', padding: '10px' }}>
                {filteredProducts.map(product => (
                    <RelatedProduct
                        key={product.id}
                        productName={product.productName}
                        description={product.description}
                        code={product.code}
                        onDelete={() => handleDelete(product.id)}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="container">
            <div className="card" style={{ padding: "20px" }}>
                <h5>Category Detail {id} </h5>
                <div className="row">
                    <div className="col-md-4">
                        <strong>Name Category</strong>
                    </div>
                    <div className="col-md-8">
                        {isEditing ? (
                            <input
                                type="text"
                                className="form-control"
                                value={editedName}
                                onChange={(e) => setEditedName(e.target.value)}
                            />
                        ) : (
                            <p>{editedName}</p>
                        )}
                    </div>
                    <div className="col-md-4">
                        <strong>Code Category</strong>
                    </div>
                    <div className="col-md-8">
                        <p>{id}</p>
                    </div>
                    <div className="col-md-4">
                        <strong>Deskripsi</strong>
                    </div>
                    <div className="col-md-8">
                        {isEditing ? (
                            <textarea
                                className="form-control"
                                value={editedDescription}
                                onChange={(e) => setEditedDescription(e.target.value)}
                            />
                        ) : (
                            <p>{editedDescription}</p>
                        )}
                    </div>
                    <div className="col-md-12"></div>
                    <div className="col-md-12">
                        {renderRelatedProducts()}
                    </div>
                    <div className="col-md-8 mt-3">
                        {isEditing ? (
                            <div className="row">
                                <div className="col-2">
                                    <button className="btn btn-secondary" onClick={handleCancelEdit}>
                                        Cancel  Edit
                                    </button>
                                </div>
                                <div className="col-2">
                                    <button className="btn btn-primary" onClick={handleCancelEdit}>
                                        Save
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button className="btn btn-warning" onClick={handleEdit}>
                                Edit
                            </button>
                        )}
                    </div>
                    <div className="col-md-4 mt-3">
                    
                                <div className="col-12">
                                <Link to="/category"><button className="btn btn-danger">Back</button></Link>
                                </div>
                                
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryDetail;