import React, {Component} from 'react'

const WIDTH = 300
const HEIGHT = 300

class Hangman extends Component {

    state = {
        errorCount: this.props.errorCount,
        life: this.props.life
    }

    componentDidMount() {
        this.updateCanvas()
    }

    componentDidUpdate() {
        this.updateCanvas()
    }

    reset(life) {
        this.setState({
            errorCount: 0,
            life: life
        })
        const context = this.refs.canvas.getContext('2d');
        context.beginPath();
        context.clearRect(0, 0, WIDTH, HEIGHT);
    }

    updateCanvas() {
        const {errorCount, life} = this.state

        if (errorCount === this.props.errorCount || life === 0) return

        const context = this.refs.canvas.getContext('2d');
        switch (errorCount) {
            case 0:
                context.moveTo(0, 400);
                context.lineTo(200, 400);
                context.stroke();
                break;
            case 1:
                context.moveTo(100, 0);
                context.lineTo(100, 400);
                context.stroke();
                break;
            case 2:
                context.moveTo(100, 0);
                context.lineTo(200, 0);
                context.stroke();
                break;
            case 3:
                context.moveTo(200, 0);
                context.lineTo(200, 60);
                context.stroke();
                break;
            case 4:
                context.beginPath();
                context.arc(200, 90, 30, 0, 2 * Math.PI);
                context.stroke();
                break;
            case 5:
                context.moveTo(200, 120);
                context.lineTo(200, 250);
                context.stroke();
                break;
            case 6:
                context.moveTo(200, 150);
                context.lineTo(250, 200);
                context.stroke();
                break;
            case 7:
                context.moveTo(200, 150);
                context.lineTo(150, 200);
                context.stroke();
                break;
            case 8:
                context.moveTo(200, 250);
                context.lineTo(250, 300);
                context.stroke();
                break;
            case 9:
                context.moveTo(200, 250);
                context.lineTo(150, 300);
                context.stroke();
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
        return (
            <div>
                <h5>Vies restantes : {life}</h5>
                <canvas className="mt-2" ref="canvas" width={WIDTH} height={HEIGHT}/>
            </div>
        );
    }
}

export default Hangman