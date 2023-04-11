import React, { useMemo, useState } from 'react';
import Popup from './Popup'
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import { useDropzone } from 'react-dropzone';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: "100%",
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};


const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

export default function HomePopup(props) {
    const classes = useStyles();
    const { setFile } = props

    const onDrop = (files) => {
        if(files.length >0) loadFile(files[0]);
    }

    const { acceptedFiles,
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
        open
    } = useDropzone({ onDrop });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    const loadFile = (file) => {
        props.setOpen(false)
        setFile(file)
        window.postMessage({
            type: 'import-cad',
            arg: {path:file.path}
        })
    }

    
    const content = (
        <DialogContent>
            <section>
                Select CAD file from your Local Directory.
                If your file is not loading properly, please send feadback to me?
                
            </section>
            <section>
                <h2>From disk</h2>
                <div {...getRootProps({ style })}>
                    <input {...getInputProps()} />
                    <p>Drag and drop a CAD file here</p>
                    <Button
                        type="button"
                        variant="contained"
                        >
                        Browse...
                    </Button>
                </div>
            </section>
        </DialogContent>
    );

    return (
        <Popup
            title="Import CAD File"
            innerContent={content}
            icon={<OpenInBrowserIcon />}
            closeText="Close"
            {...props}
        />
    )
}
