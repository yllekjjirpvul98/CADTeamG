from google.cloud import datastore

builtinlist = list

def get_client():
    return datastore.Client()

def id_as_key(id):
    # convert string id to id if id is numeric
    try:
        return int(id)
    except Exception as e:
        return id

def from_datastore(entity):
    # convert entity object to dict
    if not entity:
        return None
    result = dict(entity.items())
    result['id'] = entity.key.id_or_name
    return result

def get(id, kind):
    ds = get_client()
    key = ds.key(kind, id_as_key(id))
    results = ds.get(key)
    return from_datastore(results)

def update(data, kind, id=None):
    ds = get_client()
    if id:
        key = ds.key(kind, id_as_key(id))
    else:
        key = ds.key(kind)
    entity = datastore.Entity(
        key = key
    )
    entity.update(data)
    ds.put(entity)
    return from_datastore(entity)

def delete(kind, id):
    ds = get_client()
    key = ds.key(kind, id_as_key(id))
    ds.delete(key)

def getbyname(kind, username):
    ds = get_client()
    query = ds.query(kind='user')
    query.add_filter('username', '=', username) 
    return list(query.fetch())

def getEventByUserId(kind, userid):
    ds = get_client()
    query = ds.query(kind='event')
    query.add_filter('userid', '=', userid)
    return list(query.fetch())

def getEventByEventId(kind, eventid):
    ds = get_client()
    query = ds.query(kind='event')
    query.add_filter('eventid', '=', eventid)
    return list(query.fetch())