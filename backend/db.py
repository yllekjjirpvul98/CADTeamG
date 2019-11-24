from google.cloud import datastore

builtinlist = list

def get_client():
    return datastore.Client()

def from_datastore(entity):
    if not entity:
        return None
    if isinstance(entity, builtinlist):
        entity = entity.pop()
    entity['id'] = entity.key.id
    return entity

def get(id, kind):
    ds = get_client()
    key = ds.key(kind, int(id))
    results = ds.get(key)
    return from_datastore(results)

def update(data, kind, id=None):
    ds = get_client()
    if id:
        key = ds.key(kind, int(id))
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
    key = ds.key(kind, int(id))
    ds.delete(key)

def getbyname(kind, username):
    ds = get_client()
    query = ds.query(kind='user')
    query.add_filter('username', '=', username)
    return list(query.fetch())
