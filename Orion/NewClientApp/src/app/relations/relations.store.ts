import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { addEntity, EntityState, withEntities } from '@ngrx/signals/entities';

type Relation = {
  id: string;
  name: string;
};

type RelationsState = {
  columns: string[];
  filter: { query: string; order: 'asc' | 'desc' };
  isLoading: boolean;
};

const initialState: RelationsState = {
  columns: ['id', 'name'],
  filter: {
    order: 'asc',
    query: '',
  },
  isLoading: false,
};

export const RelationsStore = signalStore(
  withState<RelationsState>(initialState),
  withEntities<Relation>(),
  withMethods((store) => ({
    addRelation(relation: Relation): void {
      patchState(store, addEntity(relation));
    },
  }))
);
