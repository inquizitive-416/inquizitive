import React from 'react'
import { DragDropContext,Droppable, Draggable } from 'react-beautiful-dnd';
import {Card} from 'react-bootstrap'
const OrderQuestion=(props)=>{
    const myArr=["Title1","Title2","Title3","Title4"]
    return(
        //<div>
            <DragDropContext>
                <Droppable>
                    {(provided)=>(

                        <div  ref={provided.innerRef}
                        {...provided.droppableProps}
                        >
                            {
                                myArr.map((title,index)=>{
                                    return(
                                        <Draggable draggableId={index+1} key={index+1} index={index}>
                                        {(provided,snapshot) => (
                                            //<div class='col' >
                                                <Card style={{width:'100%',height:'100%'}} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    <Card.Body>
                                                        <Card.Title>
                                                            {title}
                                                        </Card.Title>
                                                        <Card.Text>
                                                            {title}
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            //</div>
                                        )}
                                        </Draggable>
                                    )
                                })
                            }
                            {/* <Draggable draggableId={1} key={1} index={0}>
                            {(provided) => (
                                //<div class='col' >
                                    <Card style={{width:'100%',height:'100%'}} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        <Card.Body>
                                            <Card.Title>
                                                Title 1
                                            </Card.Title>
                                            <Card.Text>
                                                Description 1
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                //</div>
                            )}
                            </Draggable> */}
                            {/* <Draggable draggableId={2} key={2} index={1}>
                            {(provided) => (
                                //<div class='col' >
                                    <Card style={{width:'100%',height:'100%'}} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        <Card.Body>
                                            <Card.Title>
                                                Title 2
                                            </Card.Title>
                                            <Card.Text>
                                                Description 2
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                //</div>
                            )}
                            </Draggable>
                            <Draggable draggableId={3} key={3} index={2}>
                            {(provided) => (
                                //<div class='col' >
                                    <Card style={{width:'100%',height:'100%'}} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        <Card.Body>
                                            <Card.Title>
                                                Title 3
                                            </Card.Title>
                                            <Card.Text>
                                                Description 3
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                //</div>
                            )}
                            </Draggable>
                            <Draggable draggableId={4} key={4} index={3}>
                            {(provided) => (
                                //<div class='col' >
                                    <Card style={{width:'100%',height:'100%'}} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        <Card.Body>
                                            <Card.Title>
                                                Title 4
                                            </Card.Title>
                                            <Card.Text>
                                                Description 4
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                //</div>
                            )}
                            </Draggable> */}
                            
                        </div>
                    )}
                    
                </Droppable>
            </DragDropContext>
        //</div>
    );
}
export default OrderQuestion;