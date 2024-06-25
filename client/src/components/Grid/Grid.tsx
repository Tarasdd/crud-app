import React from 'react';
import classes from './Grid.module.scss';

interface GridProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  onItemClick?: (item: T) => void;
}

const Grid = <T,>({ items, renderItem, onItemClick }: GridProps<T>) => {
  return (
    <div className={classes.grid}>
      {items.map((item, index) => (
        <div
          key={index}
          className={classes.gridItem}
          onClick={() => onItemClick && onItemClick(item)}
        >
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
};

export default Grid;



