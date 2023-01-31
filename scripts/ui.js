import { store } from './store.js'

// RECORDS


const indexRecordContainer = document.querySelector('#index-record-container')
const userMessageContainer = document.querySelector('#user-message-container')
const recordFormContainer = document.querySelector('.record-form-container')
const recordMessageContainer = document.querySelector('#record-message-container')
const showRecordContainer = document.querySelector('#show-record-container')
const linerNoteFormContainer = document.querySelector('#liner-note-form-container')
const deleteLinerNoteContainer = document.querySelector('#delete-liner-note-container')
const authContainer = document.querySelector('#auth-container')
const mainContainer = document.querySelector('#main-container')


// accessing the rating would look like this!!
// record.linerNotes[0].rating


export const onIndexRecordSuccess = (records) => {
    indexRecordContainer.style.display = "block"
    records.forEach(record => {
        const div = document.createElement('div')
        div.innerHTML = `
            <h2 id="show-record">&#10038; ${record.artistName} - "${record.albumTitle}"</h2>
            <button type="button" class="show-button btn btn-secondary" data-id="${record._id}">Show Record</button></br></br>
        `
        indexRecordContainer.appendChild(div)
    })
}

export const onHideIndexSuccess = () => {
    indexRecordContainer.style.display = "none"
}

export const onHideRecordSuccess = () => {
    showRecordContainer.style.display = "none"
    showRecordContainer.innerHTML = ``
}

export const onRecordFailure = (error) => {
    recordMessageContainer.innerHTML = `
        <h4>You've got a record error! :(</h4>
        <p id="error">${error}</p>
    `
    setTimeout(() => {recordMessageContainer.innerHTML = ``}, 1500)
}

export const onShowRecordSuccess = (record) => {
    showRecordContainer.style.display = "block"
    const recordDiv = document.createElement('div')
    recordDiv.innerHTML = `
        <h2 id="show-record-title">Selected Album</h2>
        <h3 id="show-record"><b>"${record.albumTitle}"</b></h3>
        <h5>Artist Name: <b>${record.artistName}</b></h5>
        <h5>Year Released: <b>${record.yearReleased}</b></h5>
        <h5>Comments: <b><i>"${record.comments}"</i></b></h5></br>

        <div class="record-form-container">
            <button class="btn btn-light" data-bs-toggle="collapse" data-bs-target="#record-form" aria-expanded="false" aria-controls="row" id="edit-record-button">Edit Record Info</button></br></br>
                <form id="record-form" class="collapse" data-id="${record._id}">
                    <div class="form-floating">
                        <input type="text" name="albumTitle" id="albumTitle" value="${record.albumTitle}" class="form-control" />
                        <label for="albumTitle" class="form-label" class="form-control">Album Title</label>
                    </div>
                    <div class="form-floating">
                        <input type="text" name="artistName" id="artistName" value="${record.artistName}" class="form-control" />
                        <label for="artistName" class="form-label" class="form-control">Artist Name</label>
                    </div>
                    <div class="form-floating">
                        <input type="number" name="yearReleased" id="yearReleased" value="${record.yearReleased}" class="form-control" />
                        <label for="yearReleased" class="form-label" class="form-control">Year Released</label>
                    </div>
                    <div class="form-floating">
                        <input type="text" name="comments" id="comments" value="${record.comments}" class="form-control" />
                        <label for="comments" class="form-label" class="form-control">Comments (if any)</label>
                    </div></br>
                    <button type="submit" class="btn btn-success" value="Update Record Info" />Update Record Info</button></br></br>
                </form>
        </div>
        <button type="button" class="delete-record btn btn-danger" value="Delete Record" data-id="${record._id}" />Delete Record</button></br>
        </div>
        `
/*
        <form data-id="${record._id}">
            <input type="text" name="albumTitle" value="${record.albumTitle}" />
            <input type="text" name="artistName" value="${record.artistName}" />
            <input type="number" name="yearReleased" value="${record.yearReleased}" />
            <input type="text" name="comments" value="${record.comments}" />
            <input type="submit" value="Update Record" />
        </form>

        <button data-id="${record._id}">Delete Record</button></br></br>
    `

*/
    showRecordContainer.appendChild(recordDiv)



    if (record.linerNotes.length == 1) {
        deleteLinerNoteContainer.style.display = "block"
        const linerNoteDiv = document.createElement('div')
        linerNoteDiv.innerHTML = `
            <h2 id="show-liner-note">Liner Notes:</h2>
            <h5>Album Rating: <b>${record.linerNotes[0].rating}/10</b></h5>
            <h5>Standout Track: <b>"${record.linerNotes[0].standoutTrack}"</b></h5>
            <h5>Thoughts: <b><i>"${record.linerNotes[0].thoughts}"</i></b></h5></br>

            <button class="btn btn-light" data-bs-toggle="collapse" data-bs-target=".update-liner-note-form" aria-expanded="false" aria-controls="row" id="edit-liner-note-button">Edit Liner Note Info</button></br></br>
                <form class="update-liner-note-form collapse" data-id="${record.linerNotes[0]._id}">
                    <div class="form-floating">
                        <input type="number" name="rating" id="rating" value="${record.linerNotes[0].rating}" class="form-control" />
                        <label for="rating" class="form-label" class="form-control">Record Rating (1-10)</label>
                    </div>
                    <div class="form-floating">
                        <input type="text" name="standoutTrack" id="standoutTrack" value="${record.linerNotes[0].standoutTrack}" class="form-control" />
                        <label for="standoutTrack" class="form-label" class="form-control">Standout Track</label>
                    </div>
                    <div class="form-floating">
                        <input type="text" name="thoughts" id="thoughts" value="${record.linerNotes[0].thoughts}" class="form-control" />
                        <label for="thoughts" class="form-label" class="form-control">Thoughts? (if any)</label>
                    </div>
                    <div class="form-floating">
                        <input type="text" name="recordId" id="recordId" value="${record._id}" class="form-control" disabled />
                        <label for="recordId" class="form-label" class="form-control">Record ID</label>
                    </div></br>
                    <button type="submit" class="btn btn-success" value="Update Liner Note" />Update Liner Note Info for "${record.albumTitle}"</button>
                </form>
        `
        linerNoteFormContainer.appendChild(linerNoteDiv)

        const deleteLinerNoteDiv = document.createElement('div')
        deleteLinerNoteDiv.innerHTML = `
        <div data-id="${record._id}" id="delete-container">
        <button type="button" class="delete-liner-note btn btn-danger" value="Delete Liner Note" data-id="${record.linerNotes[0]._id}" />Delete Liner Note</button></br>
    </div>
    `
        deleteLinerNoteContainer.appendChild(deleteLinerNoteDiv)

/*


// UPDATE LINER NOTE FORM
        <form data-id="${record.linerNotes[0]._id}">
            <input type="number" name="rating" value="${record.linerNotes[0].rating}" />
            <input type="text" name="standoutTrack" value="${record.linerNotes[0].standoutTrack}" />
            <input type="text" name="thoughts" value="${record.linerNotes[0].thoughts}" />
            <input type="text" name="recordId" value="${record._id}" disabled /></br></br>
            <input type="submit" value="Update Liner Note" /></br>
        </form>

// DELETE LINER NOTE BUTTON
        <button data-id="${record.linerNotes[0]._id}">Delete Liner Note</button>
    `
*/

    }

    else {
        deleteLinerNoteContainer.style.display = "none"
        const linerNoteDiv = document.createElement('div')
        linerNoteDiv.innerHTML = `
            <h4 id="show-liner-note"><b><i>Finished Listening?</i></b></h4></br>
            <button class="btn btn-light" data-bs-toggle="collapse" data-bs-target=".create-liner-note-form" aria-expanded="false" aria-controls="row" id="create-liner-note-button">Create New Liner Note</button></br></br>
                <form class="create-liner-note-form collapse">
                    <div class="form-floating">
                        <input type="number" name="rating" id="rating" placeholder="add rating here" class="form-control" />
                        <label for="rating" class="form-label" class="form-control">Record Rating (1-10)</label>
                    </div>
                    <div class="form-floating">
                        <input type="text" name="standoutTrack" id="standoutTrack" placeholder="add standout track here" class="form-control" />
                        <label for="standoutTrack" class="form-label" class="form-control">Standout Track</label>
                    </div>
                    <div class="form-floating">
                        <input type="text" name="thoughts" id="thoughts" placeholder="add any thoughts on the record here" class="form-control" />
                        <label for="thoughts" class="form-label" class="form-control">Thoughts? (if any)</label>
                    </div>
                    <div class="form-floating">
                        <input type="text" name="recordId" id="recordId" value="${record._id}" class="form-control" disabled />
                        <label for="recordId" class="form-label" class="form-control">Record ID</label>
                    </div></br>
                        <button type="submit" class="btn btn-success" value="Add Liner Note" />Add Liner Note to "${record.albumTitle}"</button></br>
                </form>
        `

/*

// UPDATE LINER NOTE FORMAT
            <form data-id="${record.linerNotes[0]._id}">
                <input type="number" name="rating" value="${record.linerNotes[0].rating}" />
                <input type="text" name="standoutTrack" value="${record.linerNotes[0].standoutTrack}" />
                <input type="text" name="thoughts" value="${record.linerNotes[0].thoughts}" />
                <input type="text" name="recordId" value="${record._id}" disabled /></br></br>
                <input type="submit" value="Update Liner Note" /></br>
            </form>
*/
        linerNoteFormContainer.appendChild(linerNoteDiv)
    }
}

export const onCreateRecordSuccess = () => {
    recordMessageContainer.innerHTML = `<h4><i>Now THAT'S a record!</i></h4>`
    setTimeout(() => {recordMessageContainer.innerHTML = ``}, 1500)
    
}

export const onUpdateRecordSuccess = () => {
    recordMessageContainer.innerHTML = `<h4><i>Record Successfully Updated!</i></h4>`
    setTimeout(() => {recordMessageContainer.innerHTML = ``}, 1500)
}

export const onDeleteRecordSuccess = () => {
    recordMessageContainer.innerHTML = `<h4><i>Record deletion successful!</i></h4>`
    setTimeout(() => {recordMessageContainer.innerHTML = ``}, 1500)
}



// LINER NOTES

export const onHideLinerNoteSuccess = () => {
    linerNoteFormContainer.style.display = "none"
    linerNoteFormContainer.innerHTML = ``
}

export const onLinerNoteFailure = (error) => {
    recordMessageContainer.innerHTML = `
        <h4>You've got a liner note error! :(</h4>
        <p id="error">${error}</p>
    `
    setTimeout(() => {recordMessageContainer.innerHTML = ``}, 1500)
}

export const onCreateLinerNoteSuccess = () => {
    recordMessageContainer.innerHTML = `<h4><i>You've just created a liner note!! :)</i></h4>`
    setTimeout(() => {recordMessageContainer.innerText = ``}, 1500)
}

export const onUpdateLinerNoteSuccess = () => {
    recordMessageContainer.innerHTML = `<h4><i>You've edited a liner note! :)</i></h4>`
    setTimeout(() => {recordMessageContainer.innerText = ``}, 1500)
}

export const onDeleteLinerNoteSuccess = () => {
    recordMessageContainer.innerHTML = `<h4><i>You just deleted a liner note! :O</i></h4>`
    setTimeout(() => {recordMessageContainer.innerText = ``}, 1500)
}

export const onSignUpSuccess = () => {
    userMessageContainer.innerHTML = `
    <h4>You've created a new user!</h4>
    <h4>Sign-in to your new account.</h4>`
    setTimeout(() => {userMessageContainer.innerHTML = ``}, 1500)
}

export const onSignInSuccess = (userToken) => {
    userMessageContainer.innerHTML = ''
    store.userToken = userToken
    authContainer.classList.add('d-none')
    mainContainer.classList.remove('d-none')
    recordFormContainer.classList = 'record-form-container'
}

export const onUserFailure = () => {
    userMessageContainer.innerHTML = `
    <h4>The email and password you have provided is not correct.</h4>
    <h4>Please sign in again.</h4>
`
setTimeout(() => {userMessageContainer.innerHTML = ``}, 1500)
}