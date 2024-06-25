import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import projectStore from '../../stores/projectStore';
import Header from '../../components/Header/Header';
import FileUploadModal from '../../components/FileUploadModal/FileUploadModal';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal/DeleteConfirmationModal';
import Grid from '../../components/Grid/Grid';
import NewButton from '../../components/NewButton/NewButton';
import SearchInput from '../../components/SearchInput/SearchInput';
import plusIcon from '../../icons/plus.svg';
import trash from '../../icons/trash.svg';
import classes from './AboutPage.module.scss';

const AboutPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projectStore.projects.find(p => p.id === projectId);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDeleteSelected = () => {
    projectStore.removeSelectedDrawings(projectId!);
    setIsDeleteModalOpen(false);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      projectStore.selectAllDrawings(projectId!);
    } else {
      projectStore.deselectAllDrawings();
    }
  };

  const filteredDrawings = project?.drawings.filter(drawing =>
    drawing.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const drawingCount = filteredDrawings.length;

  return (
    <div>
      <Header />
      <div className={classes.aboutPage}>
        {/* <h1>{project?.name}</h1> */}
        <div className={classes.controls}>
          <NewButton onClick={() => setIsUploadModalOpen(true)} label="New Drawing" icon={plusIcon} />
          <SearchInput onSearchChange={setSearchTerm} placeholder="Search drawings..." />
        </div>
        <div className={classes.gridContainer}>
          {filteredDrawings.length > 0 && (
            <div className={classes.deleteControl}>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={projectStore.selectedDrawings.size === filteredDrawings.length}
              />
              {projectStore.selectedDrawings.size > 0 && (
                <button
                  className={classes.deleteSelectedButton}
                  onClick={() => setIsDeleteModalOpen(true)}
                >
                  <img src={trash} alt="Delete Selected" />
                </button>
              )}
              <div className={classes.itemCount}>{drawingCount} items</div>
            </div>
          )}
          <Grid
            items={filteredDrawings}
            renderItem={(drawing, index) => (
              <div key={index} className={classes.gridItem}>
                <div className={classes.actions}>
                  <input
                    type="checkbox"
                    className={classes.checkbox}
                    onChange={() => projectStore.toggleSelectDrawing(drawing.id)}
                    onClick={e => e.stopPropagation()}
                    checked={projectStore.selectedDrawings.has(drawing.id)}
                  />
                  <button onClick={(e) => { e.stopPropagation(); /* Реалізувати функціонал редагування */ }} className={classes.editButton}>⋮</button>
                </div>
                <div className={classes.itemContent}>
                  <img src={drawing.image} alt={drawing.name} className={classes.drawingImage} />
                  <div className={classes.itemName}>{drawing.name}</div>
                </div>
                {/* <button onClick={(e) => { e.stopPropagation(); projectStore.removeDrawing(projectId!, drawing.id); }} className={classes.deleteButton}>×</button> */}
              </div>
            )}
          />
        </div>
        {isUploadModalOpen && <FileUploadModal projectId={projectId!} onClose={() => setIsUploadModalOpen(false)} />}
        {isDeleteModalOpen && (
          <DeleteConfirmationModal
            onClose={() => setIsDeleteModalOpen(false)}
            onDelete={handleDeleteSelected}
          />
        )}
      </div>
    </div>
  );
};

export default observer(AboutPage);





