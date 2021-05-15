import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import CartCSS from './Cart.module.css';
import { AppStateContext } from './AppState';

interface Props {}

interface State {
  isOpen: Boolean;
}

class Cart extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(e.target);
    if ((e.target as HTMLElement).nodeName === 'SPAN') {
      console.log(e.target);
    }
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  };

  render() {
    return (
      <AppStateContext.Consumer>
        {(state) => {
            const itemsCount = state.cart.items.reduce((sum, item) => {
                return sum + item.quantity;
            }, 0)
          return (
            <div className={CartCSS.container}>
              <button
                className={CartCSS.button}
                type='button'
                onClick={this.handleClick}
              >
                <FiShoppingCart />
                <span>{itemsCount} pizzas</span>
              </button>
              <div
                style={{
                  display: this.state.isOpen ? 'block' : 'none',
                }}
                className={CartCSS.cartDropDown}
              >
                <ul>
                  {state.cart.items.map(item => {
                      return <li key={item.id}>{item.name} x {item.quantity}</li>
                  })}
                </ul>
              </div>
            </div>
          );
        }}
      </AppStateContext.Consumer>
    );
  }
}

export default Cart;
