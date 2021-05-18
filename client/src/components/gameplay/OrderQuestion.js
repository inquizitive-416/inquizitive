import React,{useState} from 'react';
import { DragDropContext,Droppable, Draggable } from 'react-beautiful-dnd';
import {Card} from 'react-bootstrap'

const OrderQuestion=(props)=>{
    const myArr=["Title1","Title2","Title3","Title4"]
    const [characters, updateCharacters] = useState(myArr);
    const onDragEnd=(result)=>{
        if (!result.destination) return;
    
        const items = Array.from(characters);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
    
        updateCharacters(items);
    }
    return (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" direction="horizontal">
            {(provided) => (
              <div
                class="row"
                {...provided.droppableProps}
                ref={provided.innerRef}
                style = {{backgroundColor:"grey",height:"100%"}}
                // style={getListStyle(snapshot.isDraggingOver)}
              >
                {characters.map((item, index) => (
                  <Draggable key={item} draggableId={item} index={index}>
                    {(provided) => (
                    <div class='col' style={{paddinLeft:"10px",backgroundColor:"red"}}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <Card>
                            <Card.Img src="https://i.imgur.com/A8eQsll.jpg"/>
                            <Card.Body>
                                <Card.Title>
                                    {item}
                                </Card.Title>
                                <Card.Text>
                                    {item}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      );
}
export default OrderQuestion;