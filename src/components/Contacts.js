import React, {useState, useEffect} from 'react'
import ContactsForm from './ContactsForm'
import firebaseDB from "../firebase";

const Contacts = () => {

    var [contacts, setContacts] = useState({})
    var [currentID, setCurrentID] = useState('')

    useEffect(() => {
      firebaseDB.child('contacts').on('value', snapshot => {
        if(snapshot.val() != null)
          setContacts({...snapshot.val()})
        else
          setContacts({})
      })
    },[])

    return (
      <React.Fragment>
        <div class="jumbotron jumbotron-fluid">
          <div class="container">
            <h1 class="display-4">Dev. Profile</h1>
          </div>
        </div>
        <div class="row">
          <div class="col-md-5">
            <ContactsForm id={currentID} cont={contacts}/>
          </div>

          <div class="col-md-7">
            <h1>Profile List.</h1>
            <table class="table table-border">
              <thead class="thead-light">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                   <th>Comapny</th>
                  <th>Designation</th>
                  <th>Salary</th>
                  <th>Update/Remove</th>
                </tr>
              </thead>
              <tbody>
                  {
                      Object.keys(contacts).map(id => {
                        return <tr key={id}>
                            <td>{contacts[id].name}</td>
                            <td><a href="https://www.gmail.com">{contacts[id].email}</a></td>
                            <td>{contacts[id].company}</td>
                            <td>{contacts[id].designation}</td>
                            <td>{contacts[id].package}</td>
                            <td>
                            <button class="btn text-primary" onClick={() => setCurrentID(id) }>
                              Edit
                            </button>
                            <button class="btn text-danger" onClick={() => {
                                // eslint-disable-next-line no-restricted-globals
                                      if (confirm('Really Want to delete this record?')) {
                                      firebaseDB.child(`contacts/${id}`).remove()
                                }}}>
                              Delete
                            </button>
                            </td>
                        </tr>
                      })
                  }
                <button className="btn btn-danger" onClick={() => {
                  // eslint-disable-next-line no-restricted-globals
                  if (confirm('Really Want to delete this record?')) {
                    firebaseDB.child(`contacts`).remove()
                    setContacts({})
                  }
                }}>Delete All</button>
              </tbody>
            </table>
          </div>
        </div>
      </React.Fragment>
    );
}

export default Contacts;