function validateJoinSession(data) {
  const { code } = data;

  const errors = {};

  if (code.length === 0) errors.code = 'Code cannot be empty';

  return { errors, validated: Object.values(errors).length === 0 };
}

function validateHostSession(data) {
  const { title, location, starttime, endtime, votingtime, weekends } = data;

  const errors = {};

  if (title.length === 0) errors.title = 'Title cannot be empty';
  if (location.length === 0) errors.location = 'Location cannot be empty';
  if (starttime.length === 0) errors.starttime = 'Start time password cannot be empty';
  if (endtime.length === 0) errors.endtime = 'End time cannot be empty';
  if (votingtime.length === 0) errors.votingtime = 'Voting time cannot be empty';
  if (Date.parse(starttime) > Date.parse(endtime)) errors.endtime = 'End cannot occur before start';
  if (typeof weekends !== 'boolean') errors.weekends = 'Weekends must be a boolean';

  return { errors, validated: Object.values(errors).length === 0 };
}

export { validateJoinSession, validateHostSession };
