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
                    "borderRadius": "10px",
                    "paddingBottom": "20px",
                    "alignSelf": "center",
                    "boxShadow": "0 0 2rem 0 rgba(var(--bluelib-foreground-r), var(--bluelib-foreground-g), var(--bluelib-foreground-b, .25)",
                    "opacity": "1",
                    "transition": "opacity 25ms 25ms ease",
                    "transform": "scale(1)",
                    "background": "rgba(var(--bluelib-background-r), var(--bluelib-background-g), var(--bluelib-background-b), 1.0)",
                }} className={styles.modal}>
                    <Button
                        onMouseDown={onClose}
                        style={{ width: 60, height: 40, position: 'absolute', top: 0, right: 0, margin: '1rem' }}
                        className={styles.close__btn}
                    >
                        <FontAwesomeIcon icon={faClose} className={styles.close__icon} height="20px" width="20px"/>
                    </Button>
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