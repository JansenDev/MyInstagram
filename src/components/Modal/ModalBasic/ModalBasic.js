import React from 'react';
import { Modal } from "semantic-ui-react";
import "./ModalBasic.scss";

export default function ModalBasic(props) {
    const {show, setShow, title, children} = props;
    // console.log(props);
    const onClose= ()=>{
        setShow(false);
    };

    return (
        <Modal size="mini" open={show} onClose={onClose} className="modal-basic" >
            {/* <h2>Modal Basic</h2> */}
            { title && (<Modal.Header>{ title }</Modal.Header>)}
            { children }
        </Modal>
    )
}
