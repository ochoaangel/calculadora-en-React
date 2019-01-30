import React from 'react'

export default class Calculadora extends React.Component {

    constructor() {
        super();
        this.state = {
            d0: "0",    // línea display 0
            d1: "",     // línea display 1
            h0: "",     // línea historial 0
            h1: "",     // línea historial 1
            h2: "",     // línea historial 2
            h3: "",     // línea historial 3
            h4: "",     // línea historial 4
            h5: "",     // línea historial 5
            h6: "",     // línea historial 6
            h7: "",     // línea historial 7
            h8: "",     // línea historial 8
            h9: "",     // línea historial 9
            inicio_funcion: false,      // indica si hay o no hay una operacion matematica en proceso.
        };
    };

    // ejecuta acciones solo al pulsar números del 0 al 9
    numero = (n) => {
        if (this.state.d0.toString() === "0") {
            this.setState({ d0: n, inicio_funcion: false })
        } else {
            if (this.state.inicio_funcion === true) {
                this.setState({ d0: n, inicio_funcion: false })
            } else {
                this.setState({ d0: this.state.d0.toString() + n.toString(), inicio_funcion: false })
            }
        };
    }

    // ejecuta mi_fncion_general de acuerdo a la tecla presionada en el teclado (código de tecla)
    handleKeyPress = (tecla_presionada) => {
        switch (tecla_presionada.keyCode) {
            case 48: case 96: this.mi_funcion_general('b0'); break;
            case 49: case 97: this.mi_funcion_general('b1'); break;
            case 50: case 98: this.mi_funcion_general('b2'); break;
            case 51: case 99: this.mi_funcion_general('b3'); break;
            case 52: case 100: this.mi_funcion_general('b4'); break;
            case 53: case 101: this.mi_funcion_general('b5'); break;
            case 54: case 102: this.mi_funcion_general('b6'); break;
            case 55: case 103: this.mi_funcion_general('b7'); break;
            case 56: case 104: this.mi_funcion_general('b8'); break;
            case 57: case 105: this.mi_funcion_general('b9'); break;
            case 110: case 190: this.mi_funcion_general('bpto'); break;
            case 107: case 187: this.mi_funcion_general('bmas'); break;
            case 109: case 189: this.mi_funcion_general('bmenos'); break;
            case 8: this.mi_funcion_general('bdel'); break;
            case 13: this.mi_funcion_general('bigual'); break;
            case 46: this.mi_funcion_general('bc'); break;
            case 106: this.mi_funcion_general('bmul'); break;
            case 111: this.mi_funcion_general('bdiv'); break;
            default:
        }
    }

    // ejecuta mi_fncion_general de acuerdo a la tecla clickeada con el mouse
    handleClick = (tecla_clickeada) => { this.mi_funcion_general(tecla_clickeada.target.id) }

    // ejecuta captura de teclas presionadas en el teclado
    componentDidMount = () => { document.addEventListener("keydown", this.handleKeyPress, false); }
    componentWillUnmount = () => { document.removeEventListener("keydown", this.handleKeyPress, false); }


    // acciones al pulsar el boton igual
    btn_igual = () => {
        let vd0 = this.state.d0.toString()
        let vd1 = this.state.d1.toString()
        // let vinif = this.state.inicio_funcion
        let vd0f = ""
        let vh0f = ""
        let vh1f = ""
        let ultimo = vd1.substring(vd1.length - 1, vd1.length)

        if (parseFloat(vd0) === 0 && ultimo === "/") {
            // caso de división entre cero
            vd0f = "0"
            vh0f = "No se puede dividir entre cero >> ( " + vd1 + " " + vd0 + " )"
            vh1f = "ERROR"
            // modifico el state final de pulsar el botón igual (rotando el historial)
            this.setState({
                d0: vd0f,
                d1: "",
                h0: vh0f,
                h1: vh1f,
                h2: this.state.h0,
                h3: this.state.h1,
                h4: this.state.h2,
                h5: this.state.h3,
                h6: this.state.h4,
                h7: this.state.h5,
                h8: this.state.h6,
                h9: this.state.h7,
                inicio_funcion: false,
            })
        } else {
            // caso de resto de operaciones

            if (vd1 !== "") {
                //eslint-disable-next-line
                let resultado = eval(vd1 + vd0)
                vd0f = resultado
                vh0f = vd1 + " " + vd0
                vh1f = resultado
                // modifico el state final de pulsar el botón igual (rotando el historial)
                this.setState({
                    d0: vd0f,
                    d1: "",
                    h0: vh0f,
                    h1: vh1f,
                    h2: this.state.h0,
                    h3: this.state.h1,
                    h4: this.state.h2,
                    h5: this.state.h3,
                    h6: this.state.h4,
                    h7: this.state.h5,
                    h8: this.state.h6,
                    h9: this.state.h7,
                    inicio_funcion: false,
                })
            }

        }

    }

    // acciones de cálculos matemáticos (suma,resta,multplicación y división)
    operacion = (simbolo) => {
        let vd0 = this.state.d0.toString()
        let vd1 = this.state.d1.toString()
        let vinif = this.state.inicio_funcion
        let ultimo = vd1.substring(vd1.length - 1, vd1.length)
        let vd1f = ""
        let vd0f = ""
        if (parseFloat(vd0) === 0 && ultimo === "/") {

            // caso de división entre cero y rotar el historial
            this.setState({
                d0: "0",
                d1: "",
                h0: "No se puede dividir entre cero >> ( " + vd1 + " " + vd0 + " )",
                h1: "ERROR",
                h2: this.state.h0,
                h3: this.state.h1,
                h4: this.state.h2,
                h5: this.state.h3,
                h6: this.state.h4,
                h7: this.state.h5,
                h8: this.state.h6,
                h9: this.state.h7,
                inicio_funcion: false,
            })
        } else {
            // caso de divisiones reales entre número distinto de cero 

            if (vinif === false) {
                // caso con Línea display 1 vacía (iniciando la calculadora)
                vd1f = vd1 + " " + vd0 + " " + simbolo
                vd0f = vd0

            } else {
                // caso iniciada una operacion y/o posibilidad de cambiar la ultima operación
                let residuo = vd1.substring(0, vd1.length - 1)
                switch (simbolo) {
                    case '+': vd1f = residuo + "+"; break;
                    case '-': vd1f = residuo + "-"; break;
                    case '*': vd1f = residuo + "*"; break;
                    case '/': vd1f = residuo + "/"; break;
                    default:
                }
                vd0f = vd0

            }

            // modifico el state final cuando hay operacion pendiente
            this.setState({
                inicio_funcion: true,
                d1: vd1f,
                d0: vd0f,
            })
        }
    }

    // acciones generales para cada tecla de la calculadora
    mi_funcion_general = (comando_tecla) => {
        let vd0 = this.state.d0.toString()
        switch (comando_tecla) {
            // caso teclas para números
            case 'b0': this.numero("0"); break;
            case 'b1': this.numero("1"); break;
            case 'b2': this.numero("2"); break;
            case 'b3': this.numero("3"); break;
            case 'b4': this.numero("4"); break;
            case 'b5': this.numero("5"); break;
            case 'b6': this.numero("6"); break;
            case 'b7': this.numero("7"); break;
            case 'b8': this.numero("8"); break;
            case 'b9': this.numero("9"); break;

            // caso teclas para operaciones matemáticas
            case 'bmenos': this.operacion("-"); break;
            case 'bmul': this.operacion("*"); break;
            case 'bdiv': this.operacion("/"); break;
            case 'bmas': this.operacion("+"); break;

            // caso teclas para borrar 
            case 'bce': this.setState({ d0: 0, }); break;                                   // borra display línea 0
            case 'bc': this.setState({ d0: 0, d1: "", inicio_funcion: false }); break;      // borra display línea 0 y 1 

            case 'bh':      // botón para borrar historial
                this.setState({ h0: "", h1: "", h2: "", h3: "", h4: "", h5: "", h6: "", h7: "", h8: "", h9: "" });
                break;

            case 'bdel':    // botón borrar último caracter
                if (vd0.length <= 1) {
                    // caso para borrar cuando hay un solo dígito
                    this.setState({ d0: 0 });
                } else {
                    // caso para borrar cuando hay varios dígitos
                    vd0 = vd0.substring(0, vd0.length - 1)
                    this.setState({ d0: vd0 });
                }
                break;

            // caso teclas otras 
            case 'bigual': this.btn_igual(); break;
            case 'bpto':
                let busca_pto = vd0.includes(".")
                // cuando ya hay punto no coloca mas
                if (!busca_pto) { this.setState({ d0: vd0 + "." }); }
                break;


            case 'bmm':  //boton masmenos (+/-)
                let primero = vd0.substring(0, 1)
                if (primero === "-") {
                    // caso que sea negativo antes de cambiar
                    this.setState({ d0: vd0.substring(1, vd0.length) });
                } else {
                    // caso que NO sea negativo antes de cambiar
                    if (vd0 !== "0") { this.setState({ d0: "-" + vd0 }); }
                }
                break;

            default:
                console.log("en mi_funcion_general() pasa por default")
        }
    }

    render = () => {
        return (
            <div id="calculadora">
                <div id="principal">
                    <div id="d1"><h2>{this.state.d1}</h2></div>
                    <div id="d0"><h1>{this.state.d0}</h1></div>
                    <div id="teclas">
                        <button className="boton" id="bce" onClick={this.handleClick}>     ce</button>
                        <button className="boton" id="bc" onClick={this.handleClick}>      c</button>
                        <button className="boton" id="bdel" onClick={this.handleClick}>    del</button>
                        <button className="boton" id="bdiv" onClick={this.handleClick}>    /</button>
                        <button className="boton" id="b7" onClick={this.handleClick}>      7</button>
                        <button className="boton" id="b8" onClick={this.handleClick}>      8</button>
                        <button className="boton" id="b9" onClick={this.handleClick}>      9</button>
                        <button className="boton" id="bmul" onClick={this.handleClick}>    *</button>
                        <button className="boton" id="b4" onClick={this.handleClick}>      4</button>
                        <button className="boton" id="b5" onClick={this.handleClick}>      5</button>
                        <button className="boton" id="b6" onClick={this.handleClick}>      6</button>
                        <button className="boton" id="bmas" onClick={this.handleClick}>    +</button>
                        <button className="boton" id="b1" onClick={this.handleClick}>      1</button>
                        <button className="boton" id="b2" onClick={this.handleClick}>      2</button>
                        <button className="boton" id="b3" onClick={this.handleClick}>      3</button>
                        <button className="boton" id="bmenos" onClick={this.handleClick}>  -</button>
                        <button className="boton" id="bmm" onClick={this.handleClick}>     +/-</button>
                        <button className="boton" id="b0" onClick={this.handleClick}>      0</button>
                        <button className="boton" id="bpto" onClick={this.handleClick}>    .</button>
                        <button className="boton" id="bigual" onClick={this.handleClick}>  =</button>
                    </div>
                </div>
                <div id="historial">
                    <div className="funcion" id="h0">   <h2>{this.state.h0}</h2></div>
                    <div className="resultado" id="h1"> <h1>{this.state.h1}</h1></div>
                    <div className="funcion" id="h2">   <h2>{this.state.h2}</h2></div>
                    <div className="resultado" id="h3"> <h1>{this.state.h3}</h1></div>
                    <div className="funcion" id="h4">   <h2>{this.state.h4}</h2></div>
                    <div className="resultado" id="h5"> <h1>{this.state.h5}</h1></div>
                    <div className="funcion" id="h6">   <h2>{this.state.h6}</h2></div>
                    <div className="resultado" id="h7"> <h1>{this.state.h7}</h1></div>
                    <div className="funcion" id="h8">   <h2>{this.state.h8}</h2></div>
                    <div className="resultado" id="h9"> <h1>{this.state.h9}</h1></div>
                    <button className="bh" id="bh" onClick={this.handleClick}>Borrar Historial</button>
                </div>
            </div >
        )
    }
}