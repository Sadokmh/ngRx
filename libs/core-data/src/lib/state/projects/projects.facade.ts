import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { LoadProject, SelectProject, AddProject, UpdateProject, DeleteProject } from "@workshop/core-data";
import { Observable } from "rxjs";
import { selectAllProjects, selectCurrentProject } from "..";
import { Customer } from "../../customers/customer.model";
import { Project } from "../../projects/project.model";
import { ProjectsState } from "./projects.reducer";

@Injectable({
  providedIn: "root",
})
export class ProjectsFacade {
  projects$: Observable<Project[]>;
  currentProject$: Observable<Project>;

  constructor(private store: Store<ProjectsState>) {
    this.projects$ = this.store.pipe(select(selectAllProjects));
    this.currentProject$ = this.store.pipe(select(selectCurrentProject));
  }

  getProjects() {
    //this.projects$ = this.projectsService.all();
    this.store.dispatch(new LoadProject());
  }


  createProject(project) {
    this.store.dispatch(new AddProject(project));
  }

  updateProject(project) {
    this.store.dispatch(new UpdateProject(project));
  }

  deleteProject(project) {
    this.store.dispatch(new DeleteProject(project));
  }

  resetCurrentProject() {
    this.store.dispatch(new SelectProject(null));
  }

  selectProject(project) {
    this.store.dispatch(new SelectProject(project.id));
  }

  cancel(project) {
    this.resetCurrentProject();
  }
}
