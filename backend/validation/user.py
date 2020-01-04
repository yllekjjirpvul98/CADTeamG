def validate_login(username, password):
    errors = {}
    
    if(username is None): errors['username'] = 'Username is empty'
    if(password is None): errors['password'] = 'Password is empty'

    return errors
