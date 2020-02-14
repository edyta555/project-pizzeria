class BaseWidget{
  constructor(wrapperElement, initialValue){
    const thisWidget = this;

    thisWidget.dom = {};
    thisWidget.dom.wrapper = wrapperElement;

    thisWidget.correctValue = initialValue;
  }

  get value(){
  /* getter - method performed every time you try to read the value of the value property */
    const thisWidget = this;

    return thisWidget.correctValue;
  }

  set value(value){
  /* setter - method performed every time you try to set a new value for the value property */
  /* sets the new widget value, but only if it is a value from given range */
    const thisWidget = this;

    /* convert value to number */
    const newValue = thisWidget.parseValue(value);

    /* update value when the selected value is different from the previous one and is in the range from 1 to 9 */
    if (newValue != thisWidget.correctValue && thisWidget.isValid(newValue)){
      thisWidget.correctValue = newValue;
      thisWidget.announce();
    }
    thisWidget.renderValue();
  }

  setValue(value){
    const thisWidget = this;

    thisWidget.value = value;
  }

  parseValue(value){
  /* transforms value into the appropriate type or form */
    return parseInt(value);
  }

  isValid(value){
  /* check whether the widget value is correct in relation to the set criteria */
    return !isNaN(value);
  }

  renderValue(){
  /* display the current widget value on the page */
    const thisWidget = this;
    thisWidget.dom.wrapper.innerHTML = thisWidget.value;
  }

  announce(){
  /*trigger your own event*/
    const thisWidget = this;

    const event = new CustomEvent('updated', {
      /* passing the event on to parents */
      bubbles: true
    });
    thisWidget.dom.wrapper.dispatchEvent(event);
  }
}

export default BaseWidget;
