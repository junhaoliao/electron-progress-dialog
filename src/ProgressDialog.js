import * as React from 'react';
import ProgressBar from './ProgressBar';

const {ipcRenderer} = window.require('electron');

const PADDING_VERTICAL = 20;
const PADDING_HORIZONTAL = 30;

class ProgressDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            indeterminate: true,
            text: 'In progress',
            detail: '‎',
            value: 0,
            maximum: 0
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const height = document.body.scrollHeight + PADDING_VERTICAL * 2;
        ipcRenderer.send('resize-window', height);
    }

    componentDidMount() {
        ipcRenderer.on('indeterminate', (_, arg) => {
            this.setState({indeterminate: arg});
        });
        ipcRenderer.on('text', (_, arg) => {
            this.setState({text: arg});
        });
        ipcRenderer.on('detail', (_, arg) => {
            this.setState({detail: arg});
        });
        ipcRenderer.on('value', (_, arg) => {
            this.setState({value: arg});
        });
        ipcRenderer.on('maximum', (_, arg) => {
            this.setState({maximum: arg});
        });
    }

    render() {
        const {text, detail, value, maximum, indeterminate} = this.state;

        const cappedValue = (value > maximum) ? maximum : value;
        const percentage = cappedValue / maximum * 100;

        return (
            <div
                style={{
                    paddingTop: PADDING_VERTICAL,
                    paddingLeft: PADDING_HORIZONTAL,
                    paddingRight: PADDING_HORIZONTAL,
                    paddingBottom: PADDING_VERTICAL
                }}>
                <div style={{
                    fontWeight:600,
                    marginBottom: 10,
                    fontSize: 24}}>
                    {text}
                </div>
                <div style={{
                    marginBottom: 10,
                    fontSize: 16}}>
                    {detail}
                </div>
                <ProgressBar variant={indeterminate?'indeterminate':'determinate'} value={percentage}/>
            </div>
        );
    }
}

export default ProgressDialog;