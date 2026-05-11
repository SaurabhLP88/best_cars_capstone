import React from "react";

const ReviewModal = ({ show, onClose, children }) => {
  // if (!show) return null;

  return (
    <>
        {/* Modal */}
        <div className={`modal fade ${show ? "show d-block" : ""}`} id="reviewModal" role="dialog">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title font-weight-bold" style={{color: "#005db5"}}>Post Review</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                </div>
            </div>
        </div>

        {/* Backdrop */}
        {show && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default ReviewModal;