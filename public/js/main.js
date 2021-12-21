function getID(id) {
    document.getElementById('noteID').value = id
    //to get the id from the (noteID) in the EJS
    // it take the id from the frontend
}

function edit(id) {
    let title = document.getElementById('title' + id).innerText
    let desc = document.getElementById('desc' + id).innerText
    //innerText to show the value of the Text
    //get the element that have the id (title/desc)
    //make the id with the h3 / p in ejs
    //to get the text to the front end
    document.getElementById('titleInput').value = title
    document.getElementById('descInput').value = desc
    //to get it from the front to the input
    //make the id in the inputs html
    document.getElementById('editID').value = id
    //to get the id to the end point
}
