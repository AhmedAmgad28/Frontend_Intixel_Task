# Event Management System

## Overview

The Event Management System is a web application that allows users to manage and attend events. It features role-based access, with two distinct user roles: Organizer and Customer. 

- **Organizer**: Can create, delete, and update events, view the attendee list for each event, and update personal information.
- **Customer**: Can update personal information, search for events, add comments to events, and attend events.

## Features

- **Event Management**:
  - Organizers can create, update, and delete events.
  - Customers can view event details and add comments.
  - Both roles can search for events using various criteria.

- **User Roles**:
  - **Organizer**:
    - Create, update, and delete events.
    - View a list of attendees for events they organize.
    - Update personal information.
  - **Customer**:
    - Update personal information.
    - Search for events by name, organizer, location, date, or a combination.
    - Add comments to events.
    - Attend events.

- **Protected Routes**:
  - Routes are protected based on user roles:
    - Organizers have access to event creation, updating, and deletion routes.
    - Customers have access to event viewing, commenting, and attending routes.

## API Endpoints

### Event Endpoints

- **Create Event**: `POST /api/events`
- **Update Event**: `PUT /api/events/:id`
- **Delete Event**: `DELETE /api/events/:id`
- **Get Event by ID**: `GET /api/events/:id`
- **Get All Events**: `GET /api/events`
- **Search Events**: `GET /api/events/search`

### User Endpoints

- **Register**: `POST /api/users/register`
- **Login**: `POST /api/users/login`
- **Update Profile**: `PUT /api/users/profile`

### Comment Endpoints

- **Add Comment**: `POST /api/comments`
- **Get Comments for Event**: `GET /api/comments/event/:eventId`

### Attendee Endpoints

- **Add Attendee**: `POST /api/events/:id/attendees`
- **Remove Attendee**: `DELETE /api/events/:id/attendees`

## Search Features

Users can search for events using the following criteria:

- **Event Name**: Search by the name of the event.
- **Organizer**: Search by the name of the organizer.
- **Location**: Search by the event location.
- **Date**: Search by the event date.
- **Combination**: Combine multiple criteria to refine the search.

## Protected Routes

- **Organizer Routes**:
  - `/events/create` (Create Event)
  - `/events/:id/update` (Update Event)
  - `/events/:id/delete` (Delete Event)
  - `/events/:id/attendees` (View Attendees)
  - `/profile` (Update Personal Information)

- **Customer Routes**:
  - `/events` (Search and View Events)
  - `/events/:id` (Event Details and Commenting)
  - `/profile` (Update Personal Information)

## Technologies Used

- **Frontend**: React, Material-UI, Axios, React Router
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: JSON Web Tokens (JWT)

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## Contact

For any questions or feedback, please contact [iahmedelkady@yahoo.com](mailto:iahmedelkady@yahoo.com).