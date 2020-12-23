import { ok } from 'assert';
import { Project } from './../../projects/project.model';

const initialProjects: Project[] = [
  {
    id: '1',
    title: 'Project One',
    details: 'This is a sample project',
    percentComplete: 20,
    approved: false,
    customerId: null
  },
  {
    id: '2',
    title: 'Project Two',
    details: 'This is a sample project',
    percentComplete: 40,
    approved: false,
    customerId: null
  },
  {
    id: '3',
    title: 'Project Three',
    details: 'This is a sample project',
    percentComplete: 100,
    approved: true,
    customerId: null
  }
];

const createProject = (projects, project) => [...projects, project];
const updateProject = (projects, project) => projects.map(p => {
  return p.id === project.id ? Object.assign({}, project) : p;
});
const deleteProject = (projects, project) => projects.filter(w => project.id !== w.id);


// define the shape of my state
export interface ProjectsState {
  projects: Project[];
  selectedProject: string | null;
}

// define the initial state
export const initialState: ProjectsState = {
  projects: initialProjects,
  selectedProject: null
}

// build the most simplest reducer
export function projectsReducer(state = initialState, action) {
  switch(action.type) {
    default:
      return state;
    case 'select':
      return {
        ...state,
        selectedProject: action.payload
      }
    case 'update':
      return {
        selectedProject: state.selectedProject,
        projects: updateProject(state.projects, action.payload)
      };
    case 'delete':
      return {
        selectedProject: state.selectedProject,
        projects: deleteProject(state.projects, action.payload)
      };
    case 'create':
      return {
        selectedProject: state.selectedProject,
        projects: createProject(state.projects, action.payload)
      };
  }
}