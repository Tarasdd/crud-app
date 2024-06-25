import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import projectStore from '../../stores/projectStore';
import Header from '../../components/Header/Header';
import NewProjectModal from '../../components/NewProjectModal/NewProjectModal';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal/DeleteConfirmationModal';
import Grid from '../../components/Grid/Grid';
import NewButton from '../../components/NewButton/NewButton';
import SearchInput from '../../components/SearchInput/SearchInput';
import plusIcon from '../../icons/plus.svg';
import trash from '../../icons/trash.svg';
import classes from './HomePage.module.scss';

const HomePage: React.FC = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleDeleteSelected = () => {
    projectStore.removeSelectedProjects();
    setIsDeleteModalOpen(false);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      projectStore.selectAllProjects();
    } else {
      projectStore.deselectAllProjects();
    }
  };

  const filteredProjects = projectStore.projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProjectClick = (project: { id: string }) => {
    navigate(`/about/${project.id}`);
  };

  const projectCount = filteredProjects.length;

  return (
    <div>
      <Header />
      <div className={classes.controls}>
        <NewButton onClick={() => projectStore.toggleModal()} label="New Project" icon={plusIcon} />
        <SearchInput onSearchChange={setSearchTerm} placeholder="Search projects..." />
      </div>
      <div className={classes.gridContainer}>
        {projectStore.projects.length > 0 && (
          <div className={classes.deleteControl}>
            <input
              type="checkbox"
              onChange={handleSelectAll}
              checked={projectStore.selectedProjects.size === projectStore.projects.length}
            />
            {projectStore.selectedProjects.size > 0 && (
              <button
                className={classes.deleteSelectedButton}
                onClick={() => setIsDeleteModalOpen(true)}
              >
                <img src={trash} alt="Delete Selected" />
              </button>
            )}
            <div className={classes.itemCount}>{projectCount} items</div>
          </div>
        )}
        <Grid
          items={filteredProjects}
          onItemClick={handleProjectClick}
          renderItem={(project) => (
            <div key={project.id}>
              <div className={classes.actions}>
                <input
                  type="checkbox"
                  className={classes.checkbox}
                  onChange={() => projectStore.toggleSelectProject(project.id)}
                  onClick={e => e.stopPropagation()}
                  checked={projectStore.selectedProjects.has(project.id)}
                />
                <button onClick={(e) => { e.stopPropagation(); /* Реалізувати функціонал редагування */ }} className={classes.editButton}>⋮</button>
              </div>
              <div className={classes.itemName}>{project.name}</div>
              {/* <button onClick={(e) => { e.stopPropagation(); projectStore.removeProject(project.id); }} className={classes.deleteButton}>×</button> */}
            </div>
          )}
        />
      </div>
      {projectStore.isModalOpen && <NewProjectModal />}
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={handleDeleteSelected}
        />
      )}
    </div>
  );
};

export default observer(HomePage);