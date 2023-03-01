import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './Nav';
import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
import ConferenceForm from './ConferenceForm';
import AttendeeForm from './AttendeeForm';
import PresentationForm from './PresentationForm';
import MainPage from './MainPage'

function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <BrowserRouter>
        <Nav />
          <Routes>
            <Route index element={<MainPage />} />
            <Route path="locations">
              <Route path="new" element={<LocationForm />} />
            </Route>
            <Route path="conferences">
              <Route path="new" element={<ConferenceForm />} />
            </Route>
            <Route path="attendees">
              <Route element={<AttendeesList attendees={props.attendees} />} />
              <Route path="new" element={<AttendeeForm />} />
            </Route>
            <Route path="presentations">
              <Route path="new" element={<PresentationForm /> } />
            </Route>
          </Routes>
    </BrowserRouter>
  );
}

export default App;
