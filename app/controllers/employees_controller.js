const express = require('express');
const _ = require('lodash');
const router = express.Router();

const { Employee } = require('../models/employee');
const { validateID } =require('../middlewares/utilities');


router.get('/', (req, res) => {
    Employee.find().then((employees) => {
        res.send(employees); 
    }).catch((err) => {
        res.send(err); 
    });
});

router.get('/:id', validateID, (req, res) => {
    let id = req.params.id; 
    Employee.findById(id).then((employee) => {
        if(employee) {
            res.send(employee); 
        } else {
            res.send({
                notice: 'Employee not found'
            })
        }
    }).catch((err) => {
        res.send(err);
    })
});

router.post('/', (req,res) => {
    let body = _.pick(req.body, ['name']);
    let employee = new Employee(body);
    employee.save().then((employee) => {
        res.send({
            employee
        });
    }).catch((err) => { 
        res.send((err))
    })
})


module.exports = {
    employeesController: router
}