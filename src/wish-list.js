import { LitElement,css, html } from 'lit';
import './wish-input.js'

export class WishList extends LitElement {

  static get styles(){
    return css`
    :host {
      color: #285324;
      font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    }

    .container{
        display: flex;
        padding: 20px;
        //background-color: red;
        justify-content: center;
        text-align: center;
        align-items: center;
        height: 100%;
    }

    #labelList{
        color: black;
        font-size: 20px;
    }

    #title{
        margin-top: 0px;
        font-size: 30px;
        margin-bottom: 15px;
    }
    .containerSec{
        overflow: scroll;
        padding: 30px;
        width: 400px;
        max-width: 60vw;
        max-height: 90vh;
        border-radius: 3px;
        background-color: #bd8c6a
    }
    .list{
        //background-color: black;
        padding: 3px;
        text-align: left;
        font-size: 22px;
    }
    
    .listCheckbox{
        padding: 20px;
        cursor: pointer;
        height: 16px;
        width: 16px;
        background-color: #285324;
        //accent-color: red;
    }
    #lisCheck{
      color: black;
    }

    .btn{
        cursor: pointer;
        margin-top: 5px;
        border-color: #285324;
        border-radius: 10px;
        transition-duration: 0.5s;
        padding: 10px;
        width: 90%;
    }

    .btn:hover{
        background-color: #285324; /* Green */
        color: white;
    }
    `;
  }

  static properties = {
    //actividades es el arreglo principal
    activities:{type: Array},
    //variable para saber si se limpia el arreglo
    inculdeActivities: {state: true},
    //variable para manejar los valores
    miDato: {type: String},
  }

  constructor() {
    super();
    this.activities = [];
    this.inculdeActivities = true;
    this.timeouts = [];
  }

  limpiar(){
   //location.reload();
    this.activities =[];
  }
 
   updateLabelColor(index, color) {
    //cambiar el color pasando como valor la posicion del elemento y el color
    /* this.shadowRoot.querySelectorAll('.listCheckbox + label') busca todos los
     elementos <label> que están después de un elemento con la clase .listCheckbox 
     dentro del shadow DOM del componente WishList. Luego, la función updateLabelColor(index, color)
     cambia el color de estos elementos <label> según el índice proporcionado y el color especificado. */
     try{
      const labels = this.shadowRoot.querySelectorAll('.listCheckbox + label');
      labels[index].style.color = color;
     }catch{
      //console.error('Error')
     }
    }
     

  CheckboxChange(event, index) {
    //obtiene el valor de la list
    const labels = this.shadowRoot.querySelectorAll('.listCheckbox + label');
    const checkbox = event.target;
    
    if (checkbox.checked) {
      //Selecciona el label en la posicion donde se selecciono el inpu
      labels[index].style.color = 'black';
      //console.log(labels[index]);
      labels[index].style.textDecoration = 'line-through'; 
      clearTimeout(this.timeouts[index].timeout1);
      clearTimeout(this.timeouts[index].timeout2);
      clearTimeout(this.timeouts[index].timeout3);
    } else {
      //this.isCheckboxSelected = false;
      labels[index].style.textDecoration = 'none'; 
      labels[index].style.color = 'red';
    }
  }

  /*handleNewWish(event) maneja el evento personalizado 'new-wish' 
  disparado por WishInputFieldset. Agrega el nuevo deseo a la lista de actividades 
  y solicita una actualización del componente. */
  handleNewWish(event) {
    this.activities.push(event.detail);
    this.requestUpdate();
  }

  render() {
    let listActv = [];

    if (this.inculdeActivities) {
      this.activities.forEach((actv, index) => {
        //Agrega lo elemento a una nueva lista para agregarlos al html
        listActv.push(html`
          <input
            id="checkbox"
            class="listCheckbox"
            type="checkbox"
            @change=${(event) => this.CheckboxChange(event, index)}
          />
          <label id="lisCheck">${actv}</label><br />
        `);
        if (index === this.activities.length - 1) {
          /*
          //utilizamos el time out para que afecte a los elelemtos en cierto tiempo
         this.timeouts[index]= setTimeout(() => this.updateLabelColor(index, 'green'), 2000); // Cambia a verde después de 2 segundos
         this.timeouts[index]=  setTimeout(() => this.updateLabelColor(index, 'yellow'), 5000); // Cambia a amarillo después de 5 segundos
         this.timeouts[index]=  setTimeout(() => this.updateLabelColor(index, 'red'), 8000); // Cambia a rojo después de 8 segundos
      */
        this.timeouts[index] = { 
        timeout1: setTimeout(() => { this.updateLabelColor(index, 'green'); }, 2000), 
        timeout2: setTimeout(() => { this.updateLabelColor(index, 'yellow'); }, 5000), 
        timeout3: setTimeout(() => { this.updateLabelColor(index, 'red'); }, 8000) }; 
        }
      });
    }

    return html`
      <div class="container">
        <section class="containerSec">
          <h2 id="title">My Wish List</h2>
          <!-- Se escucha el evento personalizado que trae el componente-->
          <wish-input @new-wish=${this.handleNewWish}></wish-input>
          <div class="list">
            ${listActv}
          </div>
          <!--Llama a la funcion para vacear el arreglo-->
          <button @click=${() => this.limpiar()} class="btn">Archive Done</button>
        </section>
      </div>
    `;
  }
}

customElements.define('wish-list', WishList);