import React from 'react';

const RelatedProduct = ({ productName, description,code ,onDelete }) => (
    <div className="col-md-2">
        <div className="card mb-3" style={{ width: "200px" }}>
            <button className="btn btn-danger" style={{ position: 'absolute', top: '5px', right: '5px', zIndex: '1' }} onClick={onDelete}>
                <strong>X</strong>
            </button>
            <img src="https://via.placeholder.com/150" style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                className="d-block w-100" />
            <div className="card-body">
                <h5 className="card-title" style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{productName}</h5>
                <h5 className="card-title" style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{code}</h5>
                <p className="card-text" style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{description}</p>
            </div>
        </div>
    </div>
);

export default RelatedProduct;
