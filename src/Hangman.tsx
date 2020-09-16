import React, {Component} from 'react'

const WIDTH = 300
const HEIGHT = 300

interface State {
    canvas: any,
    errorCount: number,
    life: number
}
interface Props {
    errorCount: number,
    life: number
}

class Hangman extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            canvas: React.createRef(),
            errorCount: props.errorCount,
            life: props.life
        }
    }

    componentDidMount(): void {
        this.updateCanvas()
    }

    componentDidUpdate(): void {
        this.updateCanvas()
    }

    reset(life: number): void {
        this.setState({
            errorCount: 0,
            life: life
        })

        const {canvas} = this.state
        const canvasElement = canvas.current.getContext('2d');

        canvasElement.beginPath();
        canvasElement.clearRect(0, 0, WIDTH, HEIGHT);
    }

    updateCanvas(): void {
        const {errorCount, life} = this.state

        if (errorCount === this.props.errorCount || life === 0) return

        const {canvas} = this.state
        const canvasElement = canvas.current.getContext('2d');

        switch (errorCount) {
            case 0:
                canvasElement.moveTo(0, 400);
                canvasElement.lineTo(200, 400);
                canvasElement.stroke();
                break;
            case 1:
                canvasElement.moveTo(100, 0);
                canvasElement.lineTo(100, 400);
                canvasElement.stroke();
                break;
            case 2:
                canvasElement.moveTo(100, 0);
                canvasElement.lineTo(200, 0);
                canvasElement.stroke();
                break;
            case 3:
                canvasElement.moveTo(200, 0);
                canvasElement.lineTo(200, 60);
                canvasElement.stroke();
                break;
            case 4:
                canvasElement.beginPath();
                canvasElement.arc(200, 90, 30, 0, 2 * Math.PI);
                canvasElement.stroke();
                break;
            case 5:
                canvasElement.moveTo(200, 120);
                canvasElement.lineTo(200, 250);
                canvasElement.stroke();
                break;
            case 6:
                canvasElement.moveTo(200, 150);
                canvasElement.lineTo(250, 200);
                canvasElement.stroke();
                break;
            case 7:
                canvasElement.moveTo(200, 150);
                canvasElement.lineTo(150, 200);
                canvasElement.stroke();
                break;
            case 8:
                canvasElement.moveTo(200, 250);
                canvasElement.lineTo(250, 300);
                canvasElement.stroke();
                break;
            case 9:
                canvasElement.moveTo(200, 250);
                canvasElement.lineTo(150, 300);
                canvasElement.stroke();
                break;
            default:
                break;
        }
        this.setState({
            errorCount: this.props.errorCount,
            life: this.props.life
        })
    }

    render() {
        const {life} = this.state
        const {canvas} = this.state
        return (
            <div>
                <h5>Vies restantes : {life}</h5>
                <canvas className="mt-2" ref={canvas} width={WIDTH} height={HEIGHT}/>
            </div>
        );
    }
}

export default Hangman