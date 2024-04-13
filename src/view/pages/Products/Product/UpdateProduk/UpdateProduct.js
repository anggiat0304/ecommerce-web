import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProduct, updateProduct } from '../../../../../actions/ProductAction';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import GenericResponse from '../../../../../dto/GenericResponse';
import { getCategoriesMap } from '../../../../../actions/CategoriesAction';

const UpdateProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const productState = useSelector(state => state.product);
    const categoryState = useSelector(state => state.categoriesMap);
    const [product, setProduct] = useState({});
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        productName: '',
        code: '',
        description: '',
        selectedCategories: [],
        price: '',
        images: [],
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(getProduct(id));
        dispatch(getCategoriesMap());
    }, [dispatch, id]);

    useEffect(() => {
        const data = productState.data?.data || null;
        const responseObj = new GenericResponse(data?.message, data?.success, data?.Data);
        const productDetail = responseObj.data || {};

        const categoryData = categoryState.data?.data || null;
        const categoryRes = new GenericResponse(categoryData?.message, categoryData?.success, categoryData?.Data);
        const categoryDetail = categoryRes.data?.categoryList || []; // Menggunakan categoryRes.data?.codeCategory sebagai alternatif

        setProduct(productDetail);
        setCategories(categoryDetail);

        setFormData({
            productName: productDetail.productName || '',
            code: productDetail.code || '',
            description: productDetail.description || '',
            selectedCategories: productDetail.categoryList || [],
            price: productDetail.price || '',
            images: productDetail.imageUrl || [],
        });
    }, [id, productState, categoryState]);

    const handleCategorySelect = (e) => {
        const selectedCategoryCode = e.target.value;
    
        if (selectedCategoryCode && !formData.selectedCategories.some(category => category.code === selectedCategoryCode)) {
            const selectedCategoryArray = categoryState.data?.data?.Data?.categoryList || [];
            const selectedCategory = selectedCategoryArray.find(category => category.code === selectedCategoryCode);
    
            setFormData((prevState) => ({
                ...prevState,
                selectedCategories: [...prevState.selectedCategories, selectedCategory],
            }));
        }
    };
    


    const handleRemoveCategory = (selectedCategoryCode) => {
        const updatedCategories = formData.selectedCategories.filter(categoryCode => categoryCode !== selectedCategoryCode);

        setFormData((prevState) => ({
            ...prevState,
            selectedCategories: updatedCategories,
        }));
    };

    const handleChange = (e) => {
        const { name, type } = e.target;
        const inputValue = type === 'file' ? e.target.files : e.target.value;

        setFormData((prevState) => ({
            ...prevState,
            [name]: type === 'file' ? [...inputValue] : inputValue,
        }));

        if (type === 'file') {
            handleImageChange(e);
        }
    };

    const handleImageRemove = (index) => {
        const currentImages = [...formData.images];
        currentImages.splice(index, 1);

        setFormData((prevState) => ({
            ...prevState,
            images: currentImages,
        }));
    };

    const handleAddImage = () => {
        const fileInput = document.getElementById("images");

        if (fileInput) {
            fileInput.click();
        }
    };

    const handleImageChange = (e) => {
        const files = e.target.files;

        if (files && files.length > 0) {
            const maxAllowedImages = 5;
            const currentImages = [...formData.images];

            if (currentImages.length + files.length > maxAllowedImages) {
                e.target.value = null;
                setErrors({
                    ...errors,
                    images: `Maximum allowed images is ${maxAllowedImages}`,
                });
                return;
            }

            for (let i = 0; i < files.length; i++) {
                const reader = new FileReader();

                reader.onloadend = () => {
                    const imageBase64 = reader.result;

                    currentImages.push(imageBase64);

                    if (currentImages.length === formData.images.length + files.length) {
                        setFormData((prevState) => ({
                            ...prevState,
                            images: currentImages,
                        }));
                        setErrors({
                            ...errors,
                            images: null,
                        });
                    }
                };

                reader.readAsDataURL(files[i]);
            }
        }
    };

    const validationSchema = Yup.object().shape({
        productName: Yup.string().required('Nama Produk wajib diisi'),
        code: Yup.string().required('Code wajib diisi'),
        description: Yup.string().required('Description wajib diisi'),
        price: Yup.number().typeError('Harga harus berupa angka').required('Harga wajib diisi').min(0, 'Harga tidak boleh kurang dari 0'),
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await validationSchema.validate(formData, { abortEarly: false });

            const updatedProduct = {
                id: id,
                productName: formData.productName || product.productName,
                code: formData.code || product.code,
                description: formData.description || product.description,
                selectedCategories: formData.selectedCategories.length > 0 ? formData.selectedCategories : product.selectedCategories,
                price: formData.price || product.price,
                images: formData.images.length > 0 ? formData.images : product.images,
            };

            console.log(updatedProduct);

            // Dispatch your updateProduct action with updatedProduct
            dispatch(updateProduct(updatedProduct));

            

            setErrors({});
        } catch (error) {
            const validationErrors = {};

            if (error.inner) {
                error.inner.forEach((e) => {
                    validationErrors[e.path] = e.message;
                });
            }

            setErrors(validationErrors);
        }
    };

    return (
        <div className="container">
            <h2>Update Product id {id}</h2>
            <div className="row">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                        {/* Nama Product */}
                        <div className="mb-3">
                            <label htmlFor="productName" className="form-label">Nama Product</label>
                            <input
                                type="text"
                                className={`form-control ${errors.productName ? 'is-invalid' : ''}`}
                                id="productName"
                                name="productName"
                                value={formData.productName}
                                onChange={handleChange}
                            />
                            {errors.productName && <div className="invalid-feedback">{errors.productName}</div>}
                        </div>

                        {/* Code */}
                        <div className="mb-3">
                            <label htmlFor="code" className="form-label">Code</label>
                            <input
                                type="text"
                                className={`form-control ${errors.code ? 'is-invalid' : ''}`}
                                id="code"
                                name="code"
                                value={formData.code}
                                onChange={handleChange}
                                readOnly
                            />
                            {errors.code && <div className="invalid-feedback">{errors.code}</div>}
                        </div>

                        {/* Harga */}
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Harga</label>
                            <input
                                type="number"
                                className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                            />
                            {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                        </div>

                        {/* Description Product */}
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Deskripsi</label>
                            <textarea
                                type="text"
                                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                id="description"
                                name="description"
                                placeholder={product.description}
                                value={formData.description}
                                onChange={handleChange}
                            />
                            {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                        </div>

                        {/* Your other components and forms */}
                        <div className="mb-3">
                            <label htmlFor="images" className="form-label">Gambar Produk</label>
                            <input
                                type="file"
                                className={`form-control ${errors.images ? 'is-invalid' : ''}`}
                                id="images"
                                name="images"
                                accept='.png,.jpg,.jpeg'
                                onChange={handleChange}
                                multiple
                            />
                            {errors.images && <div className="invalid-feedback">{errors.images}</div>}

                            {/* Display Uploaded Images */}
                            <div className="mt-3">
                                <label>Preview Gambar</label>
                                <div className="d-flex align-items-center flex-wrap">
                                    {formData.images.map((image, index) => (
                                        <div key={index} className="mb-2 me-2">
                                            <div className="position-relative">
                                                <img
                                                    src={image}
                                                    alt={`Uploaded Preview ${index + 1}`}
                                                    className="img-thumbnail"
                                                    style={{ maxWidth: '200px', maxHeight: '200px', marginRight: '10px' }}
                                                />
                                                <button
                                                    type="button"
                                                    className="btn btn-danger btn-sm position-absolute top-0 end-0"
                                                    onClick={() => handleImageRemove(index)}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    {formData.images.length < 5 && (
                                        <div className="mb-2 me-2">
                                            <div
                                                className="d-flex align-items-center justify-content-center"
                                                style={{
                                                    padding:'20px',
                                                    height:'100px',
                                                    width:'100px',
                                                    border: '1px dashed #ccc',
                                                    cursor: 'pointer',
                                                    borderRadius: '5px',
                                                }}
                                                onClick={handleAddImage}
                                            >
                                                <span style={{ fontSize: '48px' }}>+</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Selected Categories */}
                        <div className="mb-3">
                            <label>Selected Categories</label>
                            <div className="selected-categories">
                                <ul>
                                    {formData.selectedCategories.length > 0 && formData.selectedCategories.map((selectedCategoryCode, index) => {

                                        const selectedCategoryArray = categoryState.data?.data?.Data?.categoryList || [];
                                        const selectedCategory = selectedCategoryArray.find(category => category.code === selectedCategoryCode.code);
                                        console.log(selectedCategoryArray)
                                        return (
                                            <span key={index} className="badge bg-secondary me-2">
                                                {selectedCategory ? (
                                                    <>
                                                        {selectedCategory.code} - {selectedCategory.name}
                                                        <button
                                                            type="button"
                                                            className="btn-close btn-close-white"
                                                            aria-label="Close"
                                                            onClick={() => handleRemoveCategory(selectedCategoryCode)}
                                                        ></button>
                                                    </>
                                                ) : ''}
                                            </span>
                                        );
                                    })}

                                </ul>
                            </div>
                        </div>

                        {/* Category */}
                        < div className="mb-3">
                            <label htmlFor="category" className="form-label">Category</label>
                            <select
                                className={`form-select ${errors.selectedCategories ? 'is-invalid' : ''}`}
                                id="category"
                                name="category"
                                onChange={handleCategorySelect}
                                value={formData.selectedCategories.length > 0 ? formData.selectedCategories[0] : ''}
                            >
                                <option value="" disabled>Select Category</option>
                                {categoryState.data?.data?.Data?.categoryList?.length > 0 && categoryState.data?.data?.Data?.categoryList.map((category, index) => (
                                    <option key={index} value={category.code}>
                                        {category.code} - {category.name}
                                    </option>
                                ))}
                            </select>
                            {errors.selectedCategories && <div className="invalid-feedback">{errors.selectedCategories}</div>}
                        </div>

                        {/* Tombol Submit */}
                        <button type="submit" className="btn btn-primary" style={{ marginRight: '10px' }}>Submit</button>
                        <Link to={`/product/${id}`}><button className="btn btn-danger">Back</button></Link>
                    </form>
                </div>
            </div >
        </div >
    );
};

export default UpdateProduct;
