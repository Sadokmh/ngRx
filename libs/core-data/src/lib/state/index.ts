import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromCustomers from './customers/customers.reducer';
import * as fromProjects from './projects/projects.reducer';


// updated the shape of the entire application state
export interface AppState {
  customers: fromCustomers.CustomersState,
  projects: fromProjects.ProjectsState
}

// updated the reducer by adding the projectsReducer
export const reducers: ActionReducerMap<AppState> = {
  customers: fromCustomers.customersReducer,
  projects: fromProjects.projectsReducer
};

// -------------------------------------------------------------------
// Projects SELECTORS
// 

export const selectProjectsState = createFeatureSelector<fromProjects.ProjectsState>('projects');

export const selectAllProjects = createSelector(
  selectProjectsState,
  fromProjects.selectAllProjects
);

export const selectProject = createSelector(
  selectProjectsState,
  fromProjects.getSelectedProjectId
)

export const selectProjectsIds = createSelector(
  selectProjectsState,
  fromProjects.selectProjectIds
);

export const selectProjectsEntities = createSelector(
  selectProjectsState,
  fromProjects.selectProjectEntities
);



// -------------------------------------------------------------------
// CUSTOMERS SELECTORS
// -------------------------------------------------------------------
export const selectCustomersState = createFeatureSelector<fromCustomers.CustomersState>('customers');

export const selectAllCustomers = createSelector(
  selectCustomersState,
  fromCustomers.selectAllCustomers
);


