import React from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import InfoIcon from '@material-ui/icons/Info';
import Popup from './Popup'
import Slide from '@material-ui/core/Slide';

// import md with raw-loader webpack plugin, see react-app-rewired and config-overrides.js
/* eslint import/no-webpack-loader-syntax: off */
//import readme from '!raw-loader!../README.md'


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});


export default function HomePopup(props) {
    const content = (
        <>
            <p>This product is used to show 3D CAD.</p>
            <p>Generate intersection using X, Y, Z plane.</p>
            <p>Export to excel</p>
        </>
    );

    return (
        <Popup
            title="About this Product"
            innerContent={content}
            icon={<InfoIcon />}
            closeText="Close"
            transition = {Transition}
            {...props}
        />
    )
}
