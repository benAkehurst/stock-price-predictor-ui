import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const Modal = ({ show, onClose, children, title }) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const modalWrapperRef = useRef();

  const backDropHandler = (e) => {
    if (!modalWrapperRef?.current?.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    setIsBrowser(true);
    window.addEventListener("click", backDropHandler);
    return () => window.removeEventListener("click", backDropHandler);
  }, []);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <StyledModalOverlay>
      <StyledModalWrapper ref={modalWrapperRef}>
        <StyledModal>
          <StyledModalHeader>
            <StyledModalCloseButton onClick={handleCloseClick}>
              Close
            </StyledModalCloseButton>
          </StyledModalHeader>
          {title && <StyledModalTitle>{title}</StyledModalTitle>}
          <StyledModalBody>{children}</StyledModalBody>
        </StyledModal>
      </StyledModalWrapper>
    </StyledModalOverlay>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
};

const StyledModalBody = styled.div`
  padding-top: 10px;
`;

const StyledModalHeader = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const StyledModalWrapper = styled.div`
  width: 600px;
  height: 600px;
`;

const StyledModal = styled.div`
  background: white;
  height: 100%;
  width: 100%;
  border-radius: 15px;
  padding: 15px;
`;

const StyledModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const StyledModalCloseButton = styled.button`
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  background-color: #38bdf8;
  color: white;
  cursor: pointer;
`;

export default Modal;
