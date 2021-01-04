import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { Project } from '../projects/project.model';

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


const emptyProject: Project = {
  id: null,
  title: '',
  details: '',
  percentComplete: 0,
  approved: false,
  customerId: null
}

export const selectProjectsState = createFeatureSelector<fromProjects.ProjectsState>('projects');

export const selectAllProjects = createSelector(
  selectProjectsState,
  fromProjects.selectAllProjects
);


export const selectCurrentProjectId = createSelector(
  selectProjectsState,
  fromProjects.getSelectedProjectId
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


/* select and reset */
export const selectCurrentProject = createSelector(
  selectProjectsEntities,
  selectCurrentProjectId,
  (projectEntities, projectId) => {
    return projectId ? projectEntities[projectId] : emptyProject;
  }
);


/* sample select */
// export const selectCurrentProject = createSelector(
//   selectProjectsEntities,
//   selectCurrentProjectId,
//   (projectEntities, projectId) => projectEntities[projectId] 
// );





// -------------------------------------------------------------------
// CUSTOMERS SELECTORS
// -------------------------------------------------------------------
export const selectCustomersState = createFeatureSelector<fromCustomers.CustomersState>('customers');

export const selectAllCustomers = createSelector(
  selectCustomersState,
  fromCustomers.selectAllCustomers
);


export const selectCustomersProjects = createSelector(
  selectAllCustomers, 
  selectAllProjects,
  (customers, projects) =>  {
    return customers.map(customer => {
      return Object.assign({}, {
        ...customer,
        projects: projects.filter(project => project.customerId === customer.id)
      });
    })
  }
) 