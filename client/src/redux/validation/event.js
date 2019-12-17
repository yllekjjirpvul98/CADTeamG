function validateEvent(event) {
    const { title, location, starttime, endtime } = event;
  
    const errors = {};
  
    if (title.length === 0) errors.title = 'Title cannot be empty';
    if (location.length === 0) errors.location = 'Location cannot be empty';
    if (starttime.length === 0) errors.starttime = 'Start time cannot be empty';
    if (endtime.length === 0) errors.endtime = 'End time cannot be empty';
    if (Date.parse(`01/01/2011 ${starttime}:00`) > Date.parse(`01/01/2011 ${endtime}:00`)) errors.endtime = 'End cannot occur before start'

    return errors;
}
  
export { validateEvent };
  