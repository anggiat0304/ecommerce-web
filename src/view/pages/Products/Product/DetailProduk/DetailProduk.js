import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { deleteProduct, getProduct } from '../../../../../actions/ProductAction';
import GenericResponse from '../../../../../dto/GenericResponse';
import { Carousel, Modal, Button } from 'react-bootstrap';
const DetailProduk = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const products = useSelector(state => state.product);
    const [product, setProduct] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    useEffect(() => {
        // Dispatch getProduct action when the component mounts
        dispatch(getProduct(id));
    }, [dispatch, id]);
    useEffect(() => {
        console.log(products);
        const data = products.data ? products.data : null;
        console.log(products)
        const responseObj = new GenericResponse(data.data != null ? data.data.message : null, data.data != null ? data.data.success : false, data.data != null ? data.data.Data : null);
        console.log(responseObj)
        const productDetail = responseObj.data != null ? responseObj.data : []
        console.log(productDetail)
        setProduct(productDetail)
        // You may want to fetch additional data or perform other actions when the component updates
    }, [id, products]);
    const handleShowDeleteModal = () => {
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
    };

    const handleDeleteProduct = async () => {
        try {
            // Dispatch action to delete product
            await dispatch(deleteProduct(product.code));

            const delData = products.data ? products.data : null;
            console.log(delData);

            const responseObj = new GenericResponse(
                delData?.data?.message || null,
                delData?.data?.success || false,
                delData?.data?.Data || null
            );

            // Close the delete confirmation modal
            setShowDeleteModal(false);

        } catch (error) {
            // Handle any error that might occur during the deletion process
            console.error('Error during deletion:', error);
        }
    };

    return (
        <div className='container'>
            <h1>Product Detail {id}</h1>
            <div className='card' style={{ padding: "20px" }}>
                <div className="row">
                    <div className="col-md-3" >
                        {!product.imageUrl || product.imageUrl.length === 0 ? (
                            <div
                                style={{
                                    height: '150px',
                                    width: '100%',
                                    backgroundColor: '#f0f0f0', // Warna latar belakang untuk kotak placeholder
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <span>No Image Available</span>
                            </div>
                        ) : (
                            <Carousel>
                                {product.imageUrl.map((image, imageIndex) => (
                                    <Carousel.Item key={imageIndex}>
                                        <img
                                            src={image}
                                            style={{ height: '150px', width: '100%', objectFit: 'cover' }}
                                            className="card-img-top"
                                            alt={`Placeholder ${imageIndex + 1}`}
                                        />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        )}
                    </div>
                    <div className="col-md-9">
                        <div className='row'>
                            <div className='col-md-2'>
                                <strong>Nama Product  </strong>
                            </div>
                            <div className='col-md-10'>
                                <p>{product.productName}</p>
                            </div>
                            <div className='col-md-2'>
                                <strong>Code </strong>
                            </div>
                            <div className='col-md-10'>
                                <p>{product.code}</p>
                            </div>
                            <div className='col-md-2'>
                                <strong>Harga  </strong>
                            </div>
                            <div className='col-md-10'>
                                <p>Rp. {product.price}</p>
                            </div>
                            <div className='col-md-2'>
                                <strong>Stock  </strong>
                            </div>
                            <div className='col-md-10'>
                                <p>3</p>
                            </div>
                            <div className='col-md-2'>
                                <strong>Category   </strong>
                            </div>
                            <div className='col-md-10'>
                                {
                                    product.categoryList &&
                                    product.categoryList.map((item) => (
                                        <span className="badge bg-secondary me-2">
                                           {item.code} - {item.name}
                                        </span>
                                    ))
                                }
                            </div>
                            <div className='col-md-2'>
                                <strong>Deskripsi  </strong>
                            </div>
                            <div className='col-md-10'>
                                <p>{product.description}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-md-3'></div>
                    <div className='col-md-9'>
                        <div className='row'>
                            <div className='col-md-2'>
                                <Link to={`/update-product/${id}`}><button className='btn btn-success'>Update</button></Link>
                            </div>
                            <div className='col-md-1'>
                                <Link to="/products"><button className="btn btn-danger">Back</button></Link>
                            </div>
                            <div className='col-md-2'>
                                <button className='btn btn-danger ms-2' onClick={handleShowDeleteModal}>
                                    <i className="bi bi-trash3-fill"></i> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='card' style={{ padding: "20px" }}>
                <div className='row'>
                    <div className='col-md-12'>
                        <h2>Daftar Transaksi</h2>
                    </div>
                    <div className='col-md-4'>
                        <strong>Jumlah Barang Masuk</strong>
                    </div>
                    <div className='col-md-8'>
                        <p>100</p>
                    </div>
                    <div className='col-md-4'>
                        <strong>Jumlah Barang Terjual</strong>
                    </div>
                    <div className='col-md-8'>
                        <p>200</p>
                    </div>
                </div>
            </div>
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete the product?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleDeleteProduct}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default DetailProduk;
