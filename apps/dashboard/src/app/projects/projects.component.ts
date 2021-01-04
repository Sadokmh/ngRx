import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Customer, ProjectsFacade, Project, ProjectsService, NotificationsService, CustomersService, ProjectsState, initialProjects, selectAllProjects, selectCurrentProject } from '@workshop/core-data';
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
    private facade: ProjectsFacade,
    private store: Store<ProjectsState>,
    private ns: NotificationsService) { 
      
      this.projects$ = facade.projects$;
      this.currentProject$ = facade.currentProject$;
    }

  ngOnInit() {
    this.getProjects();
    this.getCustomers();
    this.resetCurrentProject();
  }

  resetCurrentProject() {
    this.facade.resetCurrentProject();
  }

  selectProject(project) {
    this.facade.selectProject(project);
  }

  cancel(project) {
    this.facade.cancel(project);
  }

  getCustomers() {
    this.customers$ = this.customerService.all();
  }

  getProjects() {
    //this.projects$ = this.projectsService.all();
    this.facade.getProjects();
  }

  saveProject(project) {
    if (!project.id) {
      this.createProject(project);
    } else {
      this.updateProject(project);
    }
  }

  createProject(project) {
    this.facade.createProject(project);


    // these will go away
    this.ns.emit('Project created!');
    this.resetCurrentProject();
  }

  updateProject(project) {
    this.facade.updateProject(project);
    this.ns.emit('Project saved!');
    this.resetCurrentProject();
  }

  deleteProject(project) {
    this.facade.deleteProject(project);
    this.projectsService.delete(project)
    this.ns.emit('Project deleted!');
    this.resetCurrentProject();    
  }
}

