import React,{useState} from 'react';
import { DragDropContext,Droppable, Draggable } from 'react-beautiful-dnd';
import {Card} from 'react-bootstrap'

const Match=(props)=>{
    const ques = props.question;
    const qArr=[ques.choice1,ques.choice2,ques.choice3,ques.choice4]
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
          order+=elem[1]
        }
        
        props.onMatch(order)
    }
    // characters.sort(() => Math.random() - 0.5)
    return (
      <div>
        <div class='row' style={{padding:10}}>
        {
                qArr.map((item, index) => (
                  
                      <div class='col'  >
                        <Card >
                            <Card.Body>
                                <Card.Title>
                                    {item}
                                </Card.Title>
                            
                            </Card.Body>
                        </Card>
                      </div>
                ))
        }
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" direction="horizontal">
            {(provided) => (
              <div
                class="row"
                {...provided.droppableProps}
                ref={provided.innerRef}
                style = {{backgroundColor:"grey",height:"50vh"}}
                // style={getListStyle(snapshot.isDraggingOver)}
              >
                
                {
                characters.map((item, index) => (
                  <Draggable key={item[0]} draggableId={item[0]} index={index}>
                    {(provided) => (
                    <div class='col' 
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                      <div style={{position:"relative",top: "50%",transform: "translate(0, -50%)"}} >
                        <Card >
                            <Card.Img src={item[0]} style={{height:"40vh"}}/>
                    
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
      </div>
      );
}
export default Match;