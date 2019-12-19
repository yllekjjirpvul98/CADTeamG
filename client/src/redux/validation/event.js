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
  const { starttime, endtime } = event;

  const errors = {};

  if (Date.parse(starttime) > Date.parse(endtime)) errors.endtime = 'End cannot occur before start';

  return { errors, validated: Object.values(errors).length === 0 };
}


export { validateEvent, validateUpdateEvent };
