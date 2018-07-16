import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromPizzas from '../reducers/pizzas.reducer';
import * as fromToppings from './toppings.selectors';

import { Pizza } from '../../models/pizza.model';
import { getToppingEntities } from '../reducers/toppings.reducer';

export const getPizzaState = createSelector(
  fromFeature.getProductState,
  (state: fromFeature.ProductState) => state.pizzas,
);

export const getPizzasEntities = createSelector(
  getPizzaState,
  fromPizzas.getPizzasEntities,
);
export const getAllPizzas = createSelector(getPizzasEntities, entities => {
  return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
});

export const getPizzasLoading = createSelector(
  getPizzaState,
  fromPizzas.getPizzasLoading,
);

export const getPizzasLoaded = createSelector(
  getPizzaState,
  fromPizzas.getPizzasLoaded,
);

export const getSelectedPizza = createSelector(
  getPizzasEntities,
  fromRoot.getRouterState,
  (entities, router): Pizza => {
    return router.state && entities[router.state.params.pizzaId];
  },
);

export const getPizzaVisualised = createSelector(
  getSelectedPizza,
  fromToppings.getToppingsEntities,
  fromToppings.getSelectedToppings,
  (pizza, toppingEntities, selectedToppings) => {
    const toppings = selectedToppings.map(id => toppingEntities[id]);
    return { ...pizza, toppings };
  },
);
