import React, {useState, useEffect} from 'react'
import firebaseDB from "../firebase";

const ContactForm = (props) => {

    const initValues = {
        name: '',
        email: '',
        company: '',
        designation: '',
        package: ''
    }

    // to save user enterd value
    const [values, setValues] = useState(initValues)

    // 
    useEffect(() => {
      if(props.id == "")
        setValues({...initValues})
      else  
        setValues({
          ...props.cont[props.id]
        })
    },[props.id, props.cont])

    // to handle onChange event
    const handleChange = e => {
        var {name, value} = e.target
        setValues({...values, [name] : value}) 
    }
  
    // to handle submit 
    const handleSubmit = e =>{
        e.preventDefault()

        // API call to store data in firebase
        if (props.id == '')
          firebaseDB.child('contacts').push(values, err => {console.log(err)})
        else
          firebaseDB.child(`contacts/${props.id}`).set(values, err => { if (err) console.log(err);})

        // Pop-up success message
        alert(props.id == '' ? 'Record Added...' : 'Record Updated...')
    }
    
    return (
      <div>
        <h1>Form</h1> 
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div class="form-group input-group">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <span class="glyphicon glyphicon-user"></span>
              </div>
            </div>
            <input type="text" class="form-control" placeholder="Name" name="name" value={values.name} onChange={handleChange} required></input>
          </div>

          <div class="form-row">
            <div class="form-group input-group col-md-8">
                <div class="input-group-prepend">
                <div class="input-group-text">
                    <span class="glyphicon glyphicon-user"></span>
                </div>
                </div>
                <input type="email" class="form-control" placeholder="Email" name="email" value={values.email} onChange={handleChange} required></input>
            </div>

            <div class="form-group input-group col-md-4">
                <div class="input-group-prepend">
                <div class="input-group-text">
                    <span class="glyphicon glyphicon-user"></span>
                </div>
                </div>
              <input class="form-control" placeholder="Company" name="company" value={values.company} onChange={handleChange} required></input>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group input-group col-md-8">
                <div class="input-group-prepend">
                <div class="input-group-text">
                    <span class="glyphicon glyphicon-user"></span>
                </div>
                </div>
              <input class="form-control" placeholder="Designation" name="designation" value={values.designation} onChange={handleChange} required></input>
            </div>

            <div class="form-group input-group col-md-4">
                <div class="input-group-prepend">
                <div class="input-group-text">
                    <span class="glyphicon glyphicon-user"></span>
                </div>
                </div>
              <input type="number" class="form-control" placeholder="Package" name="package" value={values.package} onChange={handleChange} required></input>
            </div>
          </div>
            <input type="submit" value={props.id == '' ? 'Save' : 'Update'} class="btn btn-primary center"></input>
        </form>
      </div>
    );
}

export default ContactForm;