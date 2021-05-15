import React, { createRef } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import CartCSS from './Cart.module.css';
import { AppStateContext } from './AppState';

interface Props {}

interface State {
  isOpen: Boolean;
}

class Cart extends React.Component<Props, State> {
  #containerRef: React.RefObject<HTMLDivElement>;
  constructor(props: Props) {
    super(props);
    this.state = {
      isOpen: false,
    };

    this.#containerRef = createRef();
  }

  handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(e.target);
    if ((e.target as HTMLElement).nodeName === 'SPAN') {
      console.log(e.target);
    }
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  };

  handleOutsideClick = (e: MouseEvent) => {
    if (
      this.#containerRef.current &&
      !this.#containerRef.current.contains(e.target as Node)
    ) {
      this.setState({ isOpen: false });
    }
  };
  componentDidMount() {
    document.addEventListener('mousedown', this.handleOutsideClick)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleOutsideClick);
  }

  render() {
    return (
      <AppStateContext.Consumer>
        {(state) => {
          const itemsCount = state.cart.items.reduce((sum, item) => {
            return sum + item.quantity;
          }, 0);
          return (
            <div className={CartCSS.container} ref={this.#containerRef}>
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
                  {state.cart.items.map((item) => {
                    return (
                      <li key={item.id}>
                        {item.name} x {item.quantity}
                      </li>
                    );
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
