import { makeAutoObservable } from "mobx";

interface Drawing {
  id: string;
  name: string;
  image: string;
}

interface Project {
  id: string;
  name: string;
  measurement: string;
  drawings: Drawing[];
}

class ProjectStore {
  projects: Project[] = [];
  selectedProjects: Set<string> = new Set();
  selectedDrawings: Set<string> = new Set();
  isModalOpen = false;

  constructor() {
    makeAutoObservable(this);
    this.loadInitialData();
  }

  addProject(name: string, measurement: string) {
    const newProject = {
      id: Date.now().toString(),
      name,
      measurement,
      drawings: [],
    };
    this.projects.push(newProject);
  }

  removeProject(id: string) {
    this.projects = this.projects.filter(project => project.id !== id);
    this.selectedProjects.delete(id);
  }

  removeSelectedProjects() {
    this.projects = this.projects.filter(project => !this.selectedProjects.has(project.id));
    this.selectedProjects.clear();
  }

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  toggleSelectProject(id: string) {
    if (this.selectedProjects.has(id)) {
      this.selectedProjects.delete(id);
    } else {
      this.selectedProjects.add(id);
    }
  }

  selectAllProjects() {
    this.selectedProjects = new Set(this.projects.map(project => project.id));
  }

  deselectAllProjects() {
    this.selectedProjects.clear();
  }

  addDrawingToProject(projectId: string, drawingId: string, drawingName: string, drawingImage: string) {
    const project = this.projects.find(project => project.id === projectId);
    if (project) {
      const newDrawing = {
        id: drawingId,
        name: drawingName,
        image: drawingImage,
      };
      project.drawings.push(newDrawing);
    }
  }

  removeDrawing(projectId: string, drawingId: string) {
    const project = this.projects.find(project => project.id === projectId);
    if (project) {
      project.drawings = project.drawings.filter(drawing => drawing.id !== drawingId);
      this.selectedDrawings.delete(drawingId);
    }
  }

  toggleSelectDrawing(drawingId: string) {
    if (this.selectedDrawings.has(drawingId)) {
      this.selectedDrawings.delete(drawingId);
    } else {
      this.selectedDrawings.add(drawingId);
    }
  }

  selectAllDrawings(projectId: string) {
    const project = this.projects.find(project => project.id === projectId);
    if (project) {
      this.selectedDrawings = new Set(project.drawings.map(drawing => drawing.id));
    }
  }

  deselectAllDrawings() {
    this.selectedDrawings.clear();
  }

  removeSelectedDrawings(projectId: string) {
    const project = this.projects.find(project => project.id === projectId);
    if (project) {
      project.drawings = project.drawings.filter(drawing => !this.selectedDrawings.has(drawing.id));
      this.selectedDrawings.clear();
    }
  }

  loadInitialData() {
    const initialProjects = [
      {
        id: '1',
        name: 'Project Alpha',
        measurement: 'Metric',
        drawings: [
          { id: 'd1', name: 'Drawing 1', image: '/images/image1.png' },
          { id: 'd2', name: 'Drawing 2', image: '/images/image1.png' }
        ]
      },
      {
        id: '2',
        name: 'Project Beta',
        measurement: 'Imperial',
        drawings: [
          { id: 'd3', name: 'Drawing 3', image: '/images/image1.png' },
          { id: 'd4', name: 'Drawing 4', image: '/images/image1.png' }
        ]
      },
      {
        id: '3',
        name: 'Project Gamma',
        measurement: 'Metric',
        drawings: [
          { id: 'd5', name: 'Drawing 5', image: '/images/image1.png' },
          { id: 'd6', name: 'Drawing 6', image: '/images/image1.png' }
        ]
      }
    ];
    this.projects = initialProjects;
  }
}

const projectStore = new ProjectStore();
export default projectStore;



