import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Customer, Project, ProjectsService, NotificationsService, CustomersService, ProjectsState, initialProjects, selectAllProjects, selectCurrentProject } from '@workshop/core-data';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { CreateProject, DeleteProject, LoadProject, SelectProject, UpdateProject } from 'libs/core-data/src/lib/state/projects/projects.actions';



@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects$: Observable<Project[]>;
  customers$: Observable<Customer[]>;
  currentProject$: Observable<Project>;


  constructor(
    private projectsService: ProjectsService,
    private customerService: CustomersService,
    private store: Store<ProjectsState>,
    private ns: NotificationsService) { 
      
      this.projects$ = this.store.pipe(select(selectAllProjects));
      this.currentProject$ = this.store.pipe(select(selectCurrentProject));
    }

  ngOnInit() {
    this.getProjects();
    this.getCustomers();
    this.resetCurrentProject();
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

  getCustomers() {
    this.customers$ = this.customerService.all();
  }

  getProjects() {
    //this.projects$ = this.projectsService.all();
    this.store.dispatch(new LoadProject());
  }

  saveProject(project) {
    if (!project.id) {
      this.createProject(project);
    } else {
      this.updateProject(project);
    }
  }

  createProject(project) {
    this.store.dispatch(new CreateProject(project));


    // these will go away
    this.ns.emit('Project created!');
    this.resetCurrentProject();
  }

  updateProject(project) {
    this.store.dispatch(new UpdateProject(project));
    this.ns.emit('Project saved!');
    this.resetCurrentProject();
  }

  deleteProject(project) {
    this.store.dispatch(new DeleteProject(project));
    this.projectsService.delete(project)
    this.ns.emit('Project deleted!');
    this.resetCurrentProject();    
  }
}

