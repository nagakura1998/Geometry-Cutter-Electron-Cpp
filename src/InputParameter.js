import React, { useMemo, useState } from 'react';
import Popup from './Popup'
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import DialogContent from '@material-ui/core/DialogContent';

export default function HomePopup(props) {
    const { setParam } = props;

    const [xPlane, setXPlane] = useState(0);
    const [yPlane, setYPlane] = useState(0);
    const [zPlane, setZPlane] = useState(0);

    const [xPlaneDisable, setXPlaneDisable] = useState(false);
    const [yPlaneDisable, setYPlaneDisable] = useState(false);
    const [zPlaneDisable, setZPlaneDisable] = useState(false);

    const [xChecked, setXCheck] = useState(true);
    const [yChecked, setYCheck] = useState(true);
    const [zChecked, setZCheck] = useState(true);

    const GetParam = () => {
        setParam({xPlane, yPlane, zPlane, xChecked, yChecked, zChecked})
    }
    const content = (
        <DialogContent>
            <section>
                <h2>Directory</h2>
                <div>
                    <div className='input-horizontal' style={{display: 'inline-flex', gap:10+'px'}}>
                        <label for="name">Log Dir</label>
                        <button onClick={()=>window.postMessage({
                                type: 'select-dirs'
                            })}>Select</button>
                       
                    </div>
                </div>
            </section>
            <section style={{width:300+'px'}}>
            <h2>Cut Plane</h2>
            <div className='input-vertical' style={{display: 'flex', flexDirection:'column', gap:10+'px'}}>
                <div className='input-horizontal' style={{display: 'inline-flex', justifyContent:'space-between' }}>
                    <input type="checkbox" id="x_checked" name="x_checked" checked={xChecked} onClick={e =>{setXCheck(e.target.checked); setXPlaneDisable(!e.target.checked)}}/>
                    <label for="x">x</label>
                    <input type="text"
                        id="xPlane"
                        value={xPlane}
                        onInput={e => setXPlane(e.target.value)}
                        disabled={xPlaneDisable}/>
                </div>
                <div className='input-horizontal' style={{display: 'inline-flex', justifyContent:'space-between'}}>
                    <input type="checkbox" id="y_checked" name="y_checked" checked={yChecked} onClick={e =>{setYCheck(e.target.checked); setYPlaneDisable(!e.target.checked)}}/>
                    <label for="y">y</label>
                    <input type="text" 
                        id="yPlane" 
                        value={yPlane}
                        onInput={e => setYPlane(e.target.value)}
                        disabled={yPlaneDisable}/>
                </div>
                <div className='input-horizontal' style={{display: 'inline-flex', justifyContent:'space-between'}}>
                    <input type="checkbox" id="z_checked" name="z_checked" checked={zChecked} onClick={e =>{setZCheck(e.target.checked); setZPlaneDisable(!e.target.checked)}}/>
                    <label for="z">z</label>
                    <input type="text" 
                        id="zPlane" 
                        value={zPlane}
                        onInput={e => setZPlane(e.target.value)}
                        disabled={zPlaneDisable}/>
                </div>
            </div>
                
            </section>
            
        </DialogContent>
    );

    return (
        <Popup
            title="Input Parameter"
            innerContent={content}
            icon={<OpenInBrowserIcon />}
            onClose={GetParam}
            closeText="Close"
            {...props}
        />
    )
}
