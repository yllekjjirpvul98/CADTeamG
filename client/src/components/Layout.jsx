import React from 'react'

export default function Layout({children}) {
    return (
        <div>
            {children}
            <hr />
            this text is on every page
            <br />
            go to signup before you do anything and see that username is empty then go back, add some characters and press the button. redux state should have updated (you can check that in devtools). that means if you change route to signin (click the link) the data is going to be there without any fetching or passing props to children. once you see how it works delete this useless text
        </div>
    )
}
