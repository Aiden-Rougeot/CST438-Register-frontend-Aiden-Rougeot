import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';import 'react-toastify/dist/ReactToastify.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

class AddStudent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        student_id : null,
        name : "",
        email : "",
        statusCode : 0,
        status : null
    };
    }
 
    handleSubmit = () => {
        this.addStudent(this.state);
    }
      
    handleChange = (event) =>  {
        this.setState({[event.target.name]: event.target.value});
    }

    addStudent = (student) => {
        fetch(`http://localhost:8080/student`,
        {
          method: 'POST',
          
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify(student)
        })
      .then(res => {
          if (res.ok) {
            toast.success("Student successfully added", {
                position: toast.POSITION.BOTTOM_LEFT
            });
          } else {
            toast.error("Error when adding", {
                position: toast.POSITION.BOTTOM_LEFT
            });
            console.error('Post http status =' + res.status);
          }})
        .then(res => console.log(res))
      .catch(err => {
        toast.error("Error when adding", {
              position: toast.POSITION.BOTTOM_LEFT
          });
          console.error(err);
      })
    }
  
    render() {    
        return (
            <div>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <Typography variant="h6" color="inherit">
                            Add New student
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div>
                    <h3>Input Student Information </h3>
                    
                    <TextField autoFocus style = {{width:200}} label="Name" name="name" 
                        onChange={this.handleChange} value={this.state.name} /> 
                    <br/>
                    <br/>
                    <TextField style = {{width: 200}} label="Email" name="email" 
                        onChange={this.handleChange} value={this.state.email} /> 
                    <br/>
                    <br/>
                    <Button variant="outlined" color="primary" style={{margin: 10}}
                        onClick={this.handleSubmit} >Submit</Button>
                    
                    <ToastContainer autoClose={1500} />
                </div>
            </div>
        )
    }
}
export default AddStudent;