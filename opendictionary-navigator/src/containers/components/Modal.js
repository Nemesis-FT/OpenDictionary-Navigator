import React, { useEffect, useRef } from 'react';
import {Button} from "@steffo/bluelib-react";
import styles from './Modal.module.css';
import {faClose} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Modal = ({ modalStyle, children, show, onClose, backdropStyle }) => {
    const modalRef = useRef(null);
    useEffect(
        () => {
            if (show) {
                modalRef.current.classList.add(styles.visible);
            }
            else {
                modalRef.current.classList.remove(styles.visible);
            }
        },
        [
            show
        ]
    );
    return (
        <React.Fragment>
            <div ref={modalRef} style={backdropStyle} className={`${styles.modal__wrap}`}>
                <Button
                    onClick={onClose}
                    style={{ width: 60, height: 40, position: 'absolute', top: 0, right: 0, margin: '1rem' }}
                    className={styles.close__btn}
                >
                    <FontAwesomeIcon icon={faClose} className={styles.close__icon} height="20px" width="20px"/>
                </Button>
                <div style={{
                    "overflowX": "hidden",
                    "position": "relative",
                    "display": "block",
                    "width": "60vw",
                    //"height": "60%",
                    //"minHeight": "400px",
                    "minWidth": "400px",
                    "margin": "0 auto",
                    "marginTop": "20px",
                    "marginBottom": "20px",
                    "borderRadius": "4px",
                    "paddingBottom": "20px",
                    "alignSelf": "center",
                    "boxShadow": "0 0 2rem 0 rgba(199, 175, 189, .25)",
                    "opacity": "100",
                    "transition": "opacity 250ms 250ms ease, transform 300ms 250ms ease",
                    "transform": "scale(1)",
                    "background": document.body.style.background
                }} className={styles.modal}>
                    <div style={{
                        "margin":"20px",
                    }}>
                        {children}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Modal;