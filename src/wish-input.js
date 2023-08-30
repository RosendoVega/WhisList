import { LitElement, css, html } from 'lit';

export class WishInputField extends LitElement {
  static styles = css`
    .inputAdd{
        font-size: 18px;
        margin-bottom: 10px;
        background-color: #bd8c6a;
        border: none;
        border-bottom: 2px dashed #285324;
        width: 95%;
    }

    #legend{
      text-align: left;
    }
  `;

  static properties = {
    miDato: { type: String },
  };

  constructor() {
    super();
    this.miDato = '';
  }


  checkEnter(event){
    if(event.key === "Enter"){
        //event.target.value se utiliza para obtener el valor de entrada donde se preciono la tecla enter
        this.miDato = event.target.value;
        //alert(this.miDato);
        /*Disparamos un evento personalizado llamado new-whish  que lleva el valor del dato agregado
        Si bubbles se establece en true, el evento se propagará desde el objetivo hacia arriba en la jerarquía de elementos
        composed sirve para que el evento pueda atravezar el shadow DOM y sea visible por otros elementos */
        this.dispatchEvent(new CustomEvent('new-wish', { detail: this.miDato, bubbles: true, composed: true }));
        //event.target.value = '';
        this.miDato = ''; 
        event.target.value = '';
    }
   }

  render() {
    return html`
      <fieldset>
        <legend id="legend"> New Wish<br></legend>
        <input
          type="text"
          .value=${this.miDato}
          @keydown=${this.checkEnter}
          class="inputAdd"
          id="inputAdd"
          placeholder="Enter your wish here"
        />
      </fieldset>
    `;
  }
}

customElements.define('wish-input', WishInputField);
