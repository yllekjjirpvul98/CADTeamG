def validate_join_session(code):
  errors = {}

  if(code is None): errors['code'] = 'Code is empty'

  return errors

def validate_host_session(title, location, starttime, endtime, duration, votingtime, weekends):
  errors = {}

  if(title is None): errors['title'] = 'Title is empty'
  if(location is None): errors['location'] = 'Location is empty'
  if(starttime is None): errors['starttime'] = 'Start time is empty'
  if(endtime is None): errors['endtime'] = 'End time is empty'
  if(duration is None): errors['duration'] = 'Duration is empty'
  if(votingtime is None): errors['votingtime'] = 'Voting time is empty'
  if(weekends is None): errors['weekends'] = 'Weekends is empty'

  return errors