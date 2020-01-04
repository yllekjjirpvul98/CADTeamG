def validate_login(username, password):
    errors = {}

    if(username is None): errors['username'] = 'Username must not be empty'
    if(password is None): errors['password'] = 'Password must not be empty'

    return errors

def validate_register(username, password):
    errors = {}
    specialChars = ['!','$','%','&','*','+','-','.','/','=','?','_','~', '#']
    specialString = "".join(specialChars)

    for letter in username:
        if not(str(letter).isalpha() or str(letter).isnumeric()):
            errors['username'] = 'Username can only contain characters a-Z and 0-9'
    
    for letter in password:
        if not(str(letter).isalpha() or str(letter).isnumeric() or (str(letter) in specialChars)):
            errors['password'] = 'Password can only contain characters a-Z, 0-9, and ' + specialString

    if(len(username) > 20 or len(username) < 6): errors['username'] = 'Username must contain 6-20 characters'
    if(len(password) > 20 or len(password) < 6): errors['password'] = 'Password must contain 6-20 characters'

    if(username is None): errors['username'] = 'Username must not be empty'
    if(password is None): errors['password'] = 'Password must not be empty'

    return errors
