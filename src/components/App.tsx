import React from 'react';
import Pizza from './Pizza';
import Cart from './Cart';
import AppStateProvider from './AppState';
import pizzas from '../data/pizzas.json';
import AppCSS from './App.module.css';
import PizzaSVG from '../../svg/pizza.svg';

const App = () => {
  return (
    <AppStateProvider>
      <div className={AppCSS.container}>
        <div className={AppCSS.header}>
          <PizzaSVG width={120} height={120} />
          <div className={AppCSS.siteTitle}>Delicious Pizza</div>
          <Cart />
        </div>
        <ul>
          {pizzas.map((pizza) => {
            return <Pizza key={pizza.id} pizza={pizza} />;
          })}
        </ul>
      </div>
    </AppStateProvider>
  );
};

export default App;