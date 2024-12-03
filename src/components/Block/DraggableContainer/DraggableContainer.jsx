import React, { useMemo } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { HolderOutlined } from '@ant-design/icons';

import classes from '../Block.module.css';


const DraggableContainer = ({ children, onUpdate, ...props }) => {
  const [items, setItems] = React.useState(React.Children.toArray(children));

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedItems = Array.from(items);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);
    setItems(reorderedItems);

    // Отправка обновлений на API
    if (onUpdate) {
      onUpdate(reorderedItems.map((item, i) => item.props.id))
    }
  };

  const items_memo = useMemo(() => items.map((item, index) => {
    return <Draggable key={item.props.id} draggableId={String(item.props.id)} index={index} direcion>
      {(provided) => {
        // let transform = provided.draggableProps.style?.transform

        // if (transform) {
        //     transform = transform.replace(/[-+]*\d+px(?=,\s[-+]*\d+px\))/, "0px");

        //     provided.draggableProps.style = {
        //         ...provided.draggableProps.style,
        //         transform,
        //     }
        // }

        return <div ref={provided.innerRef} {...provided.draggableProps} className={classes.container}>
          <div style={{display: "flex", alignItems: "start"}}>
            <HolderOutlined
              {...provided.dragHandleProps} 
              style={{
                padding: '12px',
                cursor: 'grab',
              }}
            />
            {item}
          </div>
        </div>
      }}
    </Draggable>}
  ))

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className={classes.block_list}>
            {
              items_memo
            }
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableContainer;