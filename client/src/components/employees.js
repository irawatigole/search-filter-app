import React from 'react';
import axios from 'axios';
// import Select from 'react-select';

class Employees extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            employees: [],
            serachText:'',
            filteredEmployees: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/employees').then((response) => {
            this.setState({
                employees: response.data,
                filteredEmployees: response.data
            })
        }).catch((err) => {
            console.log(err);
        })
     }
     
    // handleChange(selectedOption) {
    //     this.setState({ selectedOption });    
    //   }

    handleSearchChange(e){
        e.persist();
        this.setState(prevState => ({
            serachText: e.target.value,
            filteredEmployees: prevState.employees.filter(employee => 
                employee.name.indexOf(e.target.value) >= 0)       
        }))
    }

   
    render(){
        // let options = this.state.employees.map((employee) => {
        //     return  { value: employee.name, label: employee.name };
        //   })
        return (
            <div>
                <h2>Listing employees - {this.state.employees.length}</h2>
                {/* <Select
                    value={this.state.value}
                    onChange={this.handleChange}
                    options={options}
                />
                    */}
  
                     <input type="text" placeholder="search by name" value={this.state.serachText} onChange={this.handleSearchChange.bind(this)}/> <br/>
                      { this.state.filteredEmployees.map((employee,index) => <li key={index}> {employee.name}</li>)}     
            </div>
        )
    }
}


export default Employees;