import React, { useEffect, useState } from 'react';

function PresentationForm() {
    const [conferences, setConferences] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [title, setTitle] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const [conference, setConference] = useState('');

    const handleNameChange = async (event) => {
        const value = event.target.value;
        setName(value);
    }

    const handleEmailChange = async (event) => {
        const value = event.target.value;
        setEmail(value);
    }

    const handleCompanyNameChange = async (event) => {
        const value = event.target.value;
        setCompanyName(value);
    }

    const handleTitleChange = async (event) => {
        const value = event.target.value;
        setTitle(value);
    }

    const handleSynopsisChange = async (event) => {
        const value = event.target.value;
        setSynopsis(value);
    }

    const handleConferenceChange = async (event) => {
        const value = event.target.value;
        setConference(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            presenter_name: name,
            presenter_email: email,
            company_name: companyName,
            title,
            synopsis,
            conference,
        }

        const presentationUrl = `http://localhost:8000/api/conferences/${conference}/presentations/`;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        };
        const response = await fetch (presentationUrl, fetchConfig);
        if (response.ok) {
            setName('');
            setEmail('');
            setCompanyName('');
            setTitle('');
            setSynopsis('');
            setConference('');
        }
    }

    const fetchData = async () => {
        const url = 'http://localhost:8000/api/conferences/'
        const response = await fetch(url)

        if (response.ok) {
            const data = await response.json();
            setConferences(data.conferences);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container">
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Create a new presentation</h1>
              <form onSubmit={handleSubmit} id="create-presentation-form">
                  <div className="form-floating mb-3">
                    <input onChange={handleNameChange} value={name} placeholder="presenter_name" required type="text" name="presenter_name" id="presenter_name" className="form-control" />
                    <label htmlFor="presenter_name">Presenter name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={handleEmailChange} value={email} placeholder="presenter_email" required type="email" name="presenter_email" id="presenter_email" className="form-control" />
                    <label htmlFor="presenter_email">Presenter email</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={handleCompanyNameChange} value={companyName} placeholder="company_name" type="text" name="company_name" id="company_name" className="form-control" />
                    <label htmlFor="company_name">Company name</label>
                  </div>
                  <div className="form-floating mb-3">
                      <input onChange={handleTitleChange} value={title} placeholder="title" required type="text" name="title" id="title" className="form-control" />
                      <label htmlFor="title">Title</label>
                    </div>
                  <div className="mb-3">
                    <label htmlFor="synopsis" className="form-label">synopsis</label>
                    <textarea onChange={handleSynopsisChange} value={synopsis} className="form-control" name="synopsis" id="synopsis" rows="3"></textarea>
                  </div>
                  <div className="mb-3">
                    <select onChange={handleConferenceChange} value={conference} required id="conference" name="conference" className="form-select">
                      <option value="">Choose a conference</option>
                      {conferences.map(conference => {
                        return (
                            <option key={conference.id} value={conference.id}>
                                {conference.name}
                            </option>
                        );
                      })};
                    </select>
                  </div>
                  <button className="btn btn-primary">Create</button>
                </form>
            </div>
          </div>
        </div>
      </div>
    )
}

export default PresentationForm
