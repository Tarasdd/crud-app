import React, { useState } from 'react';
import projectStore from '../../stores/projectStore';
import classes from './FileUploadModal.module.scss';

interface FileUploadModalProps {
  onClose: () => void;
  projectId: string;
}

const FileUploadModal: React.FC<FileUploadModalProps> = ({ onClose, projectId }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [drawingName, setDrawingName] = useState('');
  const [drawingFile, setDrawingFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDrawingFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!drawingFile || !drawingName) {
      alert("Please provide both a file and a name for the drawing.");
      return;
    }

    setIsProcessing(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const drawingId = `${projectId}-${drawingFile.name}`; // Генеруємо drawingId

      setTimeout(() => {
        projectStore.addDrawingToProject(projectId, drawingId, drawingName, dataUrl);
        setIsProcessing(false);
        onClose();
      }, 4000); // Спінер на 4 секунди
    };
    reader.readAsDataURL(drawingFile); // Читаємо файл як Data URL
  };

  return (
    <div className={classes.modalBackdrop}>
      <div className={classes.modalContent}>
        {isProcessing ? (
          <div className={classes.spinner}>Processing...</div>
        ) : (
          <>
            <h2>Upload Drawing</h2>
            <input 
              type="text" 
              value={drawingName} 
              onChange={(e) => setDrawingName(e.target.value)} 
              placeholder="Enter drawing name" 
              className={classes.input}
            />
            <input type="file" onChange={handleFileChange} className={classes.input} />
            <div className={classes.buttonsContainer}>
              <button onClick={handleUpload} className={classes.uploadButton}>Upload</button>
              <button onClick={onClose} className={classes.cancelButton}>Cancel</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUploadModal;




