import { Component } from "react";
import * as Yup from 'yup';
import '../TambahProduk/TambahProduk.css'
import { Link, useHistory } from 'react-router-dom';
import { saveProduct } from "../../../../../actions/ProductAction";
import { UseDispatch, connect } from "react-redux";
import { getCategoriesList } from "../../../../../actions/CategoriesAction";
import GenericResponse from "../../../../../dto/GenericResponse";

class TambahProduk extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                productName: '',
                code: '',
                description: '',
                selectedCategories: [],
                price: '',
                images: [], // Updated property name to 'images'
            },
            imagePreviews: [],
            categoriesNames: [],
            categoryCodes: [],
            errors: {},
        };

        this.validationSchema = Yup.object().shape({
            productName: Yup.string().required('Nama Produk wajib diisi'),
            code: Yup.string().required('Code wajib diisi'),
            selectedCategories: Yup.array().min(1, 'Pilih setidaknya satu kategori'),
            description: Yup.string().required('Description wajib diisi'),
            price: Yup.number().typeError('Harga harus berupa angka').required('Harga wajib diisi').min(0, 'Harga tidak boleh kurang dari 0'),
            images: Yup.array().required('Gambar wajib diunggah'), // Updated property name to 'images'
        });
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getCategoriesList());
    }

    componentDidUpdate(prevProps) {
        if (prevProps.categories !== this.props.categories) {
            const { categories , addProduct} = this.props;
            console.log(addProduct)
           
            const data = categories.data ? categories.data : null;
            const responseObj = new GenericResponse(data?.data?.message, data?.data?.success, data?.data?.Data);
            const categoryList = responseObj.data || [];

            const arrayCategoryName = categoryList.map((category) => category.name);
            const arrayCategoryCode = categoryList.map((category) => category.code);


            this.setState({
                categoriesNames: arrayCategoryName,
                categoryCodes: arrayCategoryCode,
            });
        }
    }

    handleChange = (e) => {
        const { name, value, type } = e.target;
        const inputValue = type === 'file' ? e.target.files[0] : value;

        this.setState((prevState) => ({
            formData: {
                ...prevState.formData,
                [name]: inputValue,
            },
        }));
    };

    handleImageChange = (e) => {
        const files = e.target.files;
    
        if (files && files.length > 0) {
            const maxAllowedImages = 5;
            const currentImages = [...this.state.formData.images];
            const currentPreviews = [...this.state.imagePreviews];
    
            if (currentImages.length + files.length > maxAllowedImages) {
                e.target.value = null;
                this.setState({
                    errors: {
                        ...this.state.errors,
                        images: `Maximum allowed images is ${maxAllowedImages}`,
                    },
                });
                return;
            }
    
            for (let i = 0; i < files.length; i++) {
                const reader = new FileReader();
    
                reader.onloadend = () => {
                    const imageBase64 = reader.result;
    
                    currentImages.push(imageBase64);
                    currentPreviews.push(
                        <div key={currentImages.length} className="image-preview-item" >
                            <div className="row">
                                <div className="col-md-12">
                                    <img src={imageBase64} alt={`Preview ${currentImages.length}`} className="preview-image" />
                                </div>
                                <div className="col-md-12" style={{ marginTop: '5px', marginBottom: '5px' }}></div>
                                <div className="col-md-12">
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm"
                                        onClick={() => this.handleRemoveImage(currentImages.length - 1)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
    
                    if (currentImages.length === this.state.formData.images.length + files.length) {
                        this.setState({
                            formData: {
                                ...this.state.formData,
                                images: currentImages,
                            },
                            imagePreviews: currentPreviews,
                            errors: {
                                ...this.state.errors,
                                images: null,
                            },
                        });
                    }
                };
    
                reader.readAsDataURL(files[i]);
            }
        }
    };

    handleRemoveImage = (index) => {
        const currentImages = [...this.state.formData.images];
        const currentPreviews = [...this.state.imagePreviews];

        currentImages.splice(index, 1);
        currentPreviews.splice(index, 1);

        this.setState({
            formData: {
                ...this.state.formData,
                images: currentImages,
            },
            imagePreviews: currentPreviews,
        });
    };

    handleAddImage = () => {
        const fileInput = document.getElementById("images");

        if (fileInput) {
            fileInput.click();
        }
    };

    handleCategorySelect = (e) => {
        const selectedOption = e.target.value;

        if (!this.state.formData.selectedCategories.includes(selectedOption)) {
            this.setState((prevState) => ({
                formData: {
                    ...prevState.formData,
                    selectedCategories: [...prevState.formData.selectedCategories, selectedOption],
                },
            }));
        }
    };

    handleRemoveCategory = (selectedCategory) => {
        this.setState((prevState) => ({
            formData: {
                ...prevState.formData,
                selectedCategories: prevState.formData.selectedCategories.filter(category => category !== selectedCategory),
            },
        }));
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const {addProduct} = this.props
        try {
            const { dispatch } = this.props;
            await this.validationSchema.validate(this.state.formData, { abortEarly: false });

            dispatch(saveProduct(this.state.formData));
            this.setState({
                formData: {
                    productName: '',
                    code: '',
                    description: '',
                    selectedCategories: [],
                    price: '',
                    images: [],
                },
                imagePreviews: [],
                errors: {},
            });
            const addProdRes  = addProduct.data ? addProduct.data : null;
            const addPros = new GenericResponse(addProdRes?.data?.message, addProdRes?.data?.success, addProdRes?.data?.Data);
            const messageAddProd = addPros.success ? `Berhasil menambahkan produk dengan code ${this.state.formData.code}` : addProduct.message;
            alert(messageAddProd)
        } catch (error) {
            const validationErrors = {};
            error.inner.forEach((e) => {
                validationErrors[e.path] = e.message;
            });

            this.setState({
                errors: validationErrors,
            });
        }
    };

    render() {
        const { formData, categoriesNames, categoryCodes, errors, image, imagePreviews } = this.state;
        const { addProduct } = this.props
        console.log(categoriesNames)
        // console.log(addProduct)  
        return (
            <div className="container">
                <h2>Add Product</h2>
                <div className="row">
                    <div className="col-md-6">
                        <form onSubmit={this.handleSubmit}>
                            {/* Nama Product */}
                            <div className="mb-3">
                                <label htmlFor="productName" className="form-label">Nama Product</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.productName ? 'is-invalid' : ''}`}
                                    id="productName"
                                    name="productName"
                                    value={formData.productName}
                                    onChange={this.handleChange}
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
                                    onChange={this.handleChange}
                                />
                                {errors.code && <div className="invalid-feedback">{errors.code}</div>}
                            </div>

                            {/* Harga */}
                            <div>
                                <label htmlFor="price" className="form-label">Harga</label>
                                <input
                                    type="number"
                                    className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                                    id="price"
                                    name="price"
                                    value={formData.price}
                                    onChange={this.handleChange}
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
                                    value={formData.description}
                                    onChange={this.handleChange}
                                />
                                {errors.productName && <div className="invalid-feedback">{errors.productName}</div>}
                            </div>
                            {/* image product */}
                            <div className="mb-3">
                                <label htmlFor="images" className="form-label">Upload Image (PNG, JPG, JPEG)</label>
                                <input
                                    type="file"
                                    className={`form-control ${errors.images ? 'is-invalid' : ''}`}
                                    id="images"
                                    name="images"
                                    onChange={this.handleImageChange}
                                    accept=".png, .jpg, .jpeg"
                                    multiple
                                />
                                {imagePreviews.length > 0 && (
                                    <div className="image-preview-container" style={{ maxHeight: '100px', overflowY: 'auto' }}>
                                        {imagePreviews}
                                    </div>
                                )}
                                {formData.images.length < 5 && (
                                    <button type="button" className="btn btn-primary mt-2" onClick={this.handleAddImage}>
                                        + Tambah Foto
                                    </button>
                                )}
                                {errors.images && <div className="invalid-feedback">{errors.images}</div>}
                            </div>
                            {/* Category */}
                            <div className="mb-3">
                                <label htmlFor="category" className="form-label">Category</label>
                                <select
                                    className={`form-select ${errors.selectedCategories ? 'is-invalid' : ''}`}
                                    id="category"
                                    name="category"
                                    onChange={this.handleCategorySelect}
                                    value=""
                                >
                                    <option value="" disabled>Select Category</option>
                                    {categoriesNames.length > 0 ? categoriesNames.map((category, index) => (
                                        <option key={index} value={categoryCodes[index]}>{category}</option>
                                    )) : null}
                                </select>
                                {errors.selectedCategories && <div className="invalid-feedback">{errors.selectedCategories}</div>}
                            </div>



                            {/* Selected Categories  */}
                            <div className="mb-3">
                                <label>Selected Categories</label>
                                <div className="selected-categories">
                                    <ul>
                                        {formData.selectedCategories.length > 0 ? formData.selectedCategories.map((selectedCategory, index) => (
                                            <span key={index} className="badge bg-secondary me-2">
                                                {selectedCategory}
                                                <button
                                                    type="button"
                                                    className="btn-close btn-close-white"
                                                    aria-label="Close"
                                                    onClick={() => this.handleRemoveCategory(selectedCategory)}
                                                ></button>
                                            </span>
                                        )) : null}
                                    </ul>
                                </div>
                            </div>

                            {/* Tombol Submit */}
                            <button type="submit" className="btn btn-primary" style={{ marginRight: '10px' }}>Submit</button>
                            <Link to="/products"><button className="btn btn-danger">Back</button></Link>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        categories: state.categories,
        addProduct : state.addProduct
    };
};

export default connect(mapStateToProps)(TambahProduk);