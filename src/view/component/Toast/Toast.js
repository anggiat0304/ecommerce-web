import { Component } from "react";

class Toast extends Component {
    render() {
        const { errorMessage } = this.props;
        console.log(errorMessage)
        return (
            <div>
                <div class="toast align-items-center" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="d-flex">
                        <div class="toast-body">
                            {errorMessage}
                        </div>
                        <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                </div>
            </div>
        )
    }
}
export default Toast;