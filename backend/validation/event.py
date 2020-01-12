import datetime

def validate_put_event(title, location, starttime, endtime):
    errors = {}

    present = datetime.datetime.now()

    if(starttime is None): 
      errors['starttime'] = 'Start time is empty'
      return errors

    if(endtime is None):
       errors['endtime'] = 'End time is empty'
       return errors

    starttimeiso = datetime.datetime.strptime(starttime, "%Y-%m-%dT%H:%M:%S.%fZ")
    endtimeiso = datetime.datetime.strptime(endtime, "%Y-%m-%dT%H:%M:%S.%fZ")

    if(starttimeiso < present): errors['starttime'] = 'Earliest start time cannot be in the past'
    if(endtimeiso < present): errors['starttime'] = 'Earliest end time cannot be in the past'
    if(endtime < starttime): errors['endtime'] = 'Earliest end time cannot occur before earliest start time'

    if(title is None): errors['title'] = 'Title is empty'
    if(location is None): errors['location'] = 'Location is empty'

    return errors

def validate_post_event(title, location, starttime, endtime):
    errors = {}

    present = datetime.datetime.now()
    starttimeiso = datetime.datetime.strptime(starttime, "%Y-%m-%dT%H:%M:%S.%fZ")
    endtimeiso = datetime.datetime.strptime(endtime, "%Y-%m-%dT%H:%M:%S.%fZ")

    if(starttimeiso < present): errors['starttime'] = 'Earliest start time cannot be in the past'
    if(endtimeiso < present): errors['starttime'] = 'Earliest end time cannot be in the past'
    if(endtime < starttime): errors['endtime'] = 'Earliest end time cannot occur before earliest start time'

    if(title is None): errors['title'] = 'Title is empty'
    if(location is None): errors['location'] = 'Location is empty'
    if(starttime is None): errors['starttime'] = 'Start time is empty'
    if(endtime is None): errors['endtime'] = 'End time is empty'

    return errors