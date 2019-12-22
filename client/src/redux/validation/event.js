function validateEvent(event) {
  const { title, location, starttime, endtime } = event;

  const errors = {};

  if (title.length === 0) errors.title = 'Title cannot be empty';
  if (location.length === 0) errors.location = 'Location cannot be empty';
  if (starttime.length === 0) errors.starttime = 'Start time cannot be empty';
  if (endtime.length === 0) errors.endtime = 'End time cannot be empty';
  if (Date.parse(starttime) > Date.parse(endtime)) errors.endtime = 'End cannot occur before start';

  return { errors, validated: Object.values(errors).length === 0 };
}

function validateUpdateEvent(event) {
  const { title, location, starttime, endtime } = event;

  const errors = {};

  if (!title && !location && !starttime && !endtime) errors.title = 'You have to update atleast one property';
  if (Date.parse(starttime) > Date.parse(endtime)) errors.endtime = 'End cannot occur before start';

  return { errors, validated: Object.values(errors).length === 0 };
}


export { validateEvent, validateUpdateEvent };
