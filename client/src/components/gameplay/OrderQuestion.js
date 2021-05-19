import React,{useState} from 'react';
import { DragDropContext,Droppable, Draggable } from 'react-beautiful-dnd';
import {Card} from 'react-bootstrap'

const OrderQuestion=(props)=>{
    const question = props.question;
    const myArr=[question.choice1,question.choice2,question.choice3,question.choice4]
    // const imgArr=[question.image1,question.image2,question.image3,question.image4]
    const [characters, updateCharacters] = useState(props.myArr);
    const onDragEnd=(result)=>{
        if (!result.destination) return;
    
        const items = Array.from(characters);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
    
        updateCharacters(items);

        var order=""
        for(const [index,elem] of items.entries()){
          // console.log("order",elem[2])
          order+=elem[2]
        }
        
        props.onOrder(order)
    }
    // characters.sort(() => Math.random() - 0.5)
    return (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" direction="horizontal">
            {(provided) => (
              <div
                class="row" style = {{height:"60vh",width:"100vw"}}
                {...provided.droppableProps}
                ref={provided.innerRef}
                
                // style={getListStyle(snapshot.isDraggingOver)}
              >
                
                {
                characters.map((item, index) => (
                  <Draggable key={item[0]} draggableId={item[0]} index={index}>
                    {(provided) => (
                    <div class='col' style={{alignContent:"center",width:"25vw",height:"60vh"}}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        
                    >
                      <div style={{height:"45vh",width:"22vw",position:"relative",top: "50%",left:"50%",transform: "translate(-50%, -50%)"}} >
                        <Card style={{}}>
                            <Card.Img src={item[1]} style={{height:"35vh"}}/>
                            <Card.Body style={{height:"10vh"}}>
                                <Card.Title>
                                    {item[0]}
                                </Card.Title>
                            
                            </Card.Body>
                        </Card>
                      </div>
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