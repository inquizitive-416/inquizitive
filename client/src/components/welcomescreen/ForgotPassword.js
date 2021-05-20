import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import { GETUSERBYEMAIL } from "./cache/queries";
import { RESET } from "./cache/mutation";

import { graphql,useLazyQuery,useMutation} from '@apollo/client';
import PassModal from "./PassModal"
//import "./RegisterModal.css";


// Modal.setAppElement('#root');
const ForgotPassword = ({isOpen,forModal}) => {
    const [email, setEmail] = useState("");
    const [sec1, setSec1] = useState("");
    const [sec2, setSec2] = useState("");
    const [pass, setPass] = useState(false);
    const [vienable, setVIEnable] = useState(true);
    const [password, setPassword] = useState("");

    const[resetPass]=useMutation(RESET);



    const [getUser,{loading, error, data}]=useLazyQuery(GETUSERBYEMAIL);

    const getPassword=async(e)=>{
        e.preventDefault()
        // if(email=="" || sec1=="" || sec2==""){
        //     setVIEnable(true)
        //     return
        // }
        console.log("hum",await getUser({ variables:  {email:email}  }));
        // console.log("ret",ret)
        if (error) { return `Error: ${error.message}` };
        if(loading){console.log("loading")}
        if (data=== null ) {
            // console.log("here");
            setVIEnable(false)
            console.log(true);
        }
        else if (typeof data==='undefined') {
            // console.log("here");
            setVIEnable(false)
            console.log(true);
        }
        else if (data.getUserByEmail._id===null) {
            // console.log("here");
            setVIEnable(false)
            console.log(true);
        }
        else if (data) {
            // console.log("imhere");
            // setCurrentUser(data.login);
            const User=data.getUserByEmail
            console.log("data",data);
            console.log("data",User);
            if(User.securityAnswerOne.toUpperCase()===sec1.toUpperCase() && User.securityAnswerTwo.toUpperCase()===sec2.toUpperCase()){
                setPass(!pass)
                setVIEnable(true)
            }
            else{
                console.log("error")
                setVIEnable(false)
            }

            
        //     // props.fetchUser();
        }
        // else{
        //     setVIEnable(false)
        // }
    }
    function validateEmail() {
        return email.length > 0 && email.indexOf('.')>0 && email.indexOf('@')>0 && email.length-1>email.indexOf('.');
    }
    const setP=(e)=>{
        setPassword(e.target.value)
        console.log(e.target.value)
    }
    function discard(){
        setVIEnable(true)
        setPass(false)
        setEmail("")
        setSec1("")
        setSec2("")
        forModal()
    }
    const closePass=async(e)=> {
        // console.log("email",email)
        // console.log("pass",password)
        const User=await resetPass({variables:{email:email,password:password}})
        setPass(!pass)
        setVIEnable(true)
        forModal()
    }
    
    return (
        <div style={{backgroundColor:"red", borderRadius:"5%"}}>
            
            <Modal
            style={{borderRadius:"5%"}}
            show={isOpen}
            centered
            >
                <Form style={{padding:20,backgroundColor:"#424242"}}>
                    <Form.Group size="lg" controlId="email">
                    <Form.Label style={{color:"white"}}>Email</Form.Label>
                        <Form.Control
                            autoFocus
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{backgroundColor:"#404040",color: validateEmail() ? "white":"red"}}
                        />
                    </Form.Group>
                    
                {/* <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Dropdown Button
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown> */} 
                <div className="sec" class="sec1">
                    <Form.Group size="lg">
                        <select style={{color:"white",backgroundColor:"#404040"}} class="custom-select" id="inputGroupSelect02">
                            <option style={{color:"white"}}  selected>Choose categories</option>
                            <option style={{color:"white"}} value="What was your childhood nickname?">What was your childhood nickname?</option>
                            <option style={{color:"white"}} value="What is the name of your favorite childhood friend?">What is the name of your favorite childhood friend?</option>
                            <option style={{color:"white"}} value="What was the name of your first stuffed animal?">What was the name of your first stuffed animal?</option>
                            <option style={{color:"white"}} value="What is your dream car?">What is your dream car?</option>
                        </select>

                        
                    </Form.Group>
                    <Form.Group controlId="sec1">
                        <Form.Control
                            type="sec1"
                            value={sec1}
                            //onClick={(e)=>setSec1("")}
                            placeholder={""}
                            style={{color:"white",backgroundColor:"#404040"}}
                            onChange={(e) => setSec1(e.target.value)}

                        />
                    </Form.Group>
                </div>
                <div className="sec" class="sec2">
                    <Form.Group size="lg">
                        <select style={{color:"white",backgroundColor:"#404040"}} class="custom-select" id="inputGroupSelect02">
                        <option  style={{color:"white"}} selected>Choose categories</option>
                        <option style={{color:"white"}} value="What is the location of your dream vacation?">What is the location of your dream vacation?</option>
                            <option style={{color:"white"}} value="What is the name of your favorite sports team?">What is the name of your favorite sports team?</option>
                            <option style={{color:"white"}} value="Where were you when you first heard about 9/11?">Where were you when you first heard about 9/11?</option>
                            <option style={{color:"white"}} value="What is the name of a college you applied to but didn't attend?">What is the name of a college you applied to but didn't attend?</option>
                        </select>
                    </Form.Group>
                    <Form.Group controlId="sec2">
                        <Form.Control
                            type="sec2"
                            value={sec2}
                            placeholder={""}
                            style={{color:"white",backgroundColor:"#404040"}}
                            onChange={(e) => setSec2(e.target.value)}
                        />
                    </Form.Group>
                    <small style={{color: vienable ? "#404040": "red"}} >Invalid Identity... Try again</small>
                </div>
                <Modal.Footer>
                    <Button style={{backgroundColor:"white",color:"orange"}} onClick={discard}>Close</Button>
                    <Button style={{backgroundColor:"orange",color:"white"}} onClick={getPassword}>Validate Identity</Button>
                </Modal.Footer>
                    <PassModal isOpen={pass} discard={discard}  close={closePass} password={password} setP={setP}/>
            
                </Form>

                {/* <h4>Centered Modal</h4>
                <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                consectetur ac, vestibulum at eros.
                </p> */}
                
                
            </Modal>
        </div>
     );
}

export default ForgotPassword;