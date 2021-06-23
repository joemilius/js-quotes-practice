document.addEventListener('DOMContentLoaded', () => {
    
    function getQuotes(){
        fetch(`http://localhost:3000/quotes?_embed=likes`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            data.forEach(renderQuotes)})
    }
    getQuotes()

    function renderQuotes(quote){
        let quoteList = document.querySelector('#quote-list')
        let quoteCard = document.createElement('li')
        let blockQuote = document.createElement('blockquote')
        let content = document.createElement('p')
        let footer = document.createElement('footer')
        let lineBreak = document.createElement('br')
        let likeButton = document.createElement('button')
        let deleteButton = document.createElement('button')
        let span = document.createElement('span')

        quoteCard.setAttribute('class', 'quote-card')
        blockQuote.setAttribute('class', 'blockquote')
        content.setAttribute('class', 'mb-0')
        footer.setAttribute('class', 'blockquote-footer')
        likeButton.setAttribute('class', 'btn-success')
        deleteButton.setAttribute('class', 'btn-danger')


        quoteList.appendChild(quoteCard)
        quoteCard.appendChild(blockQuote)
        blockQuote.appendChild(content)
        blockQuote.appendChild(footer)
        blockQuote.appendChild(lineBreak)
        blockQuote.appendChild(likeButton)
        blockQuote.appendChild(deleteButton)

        content.textContent = quote.quote
        footer.textContent = quote.author
        likeButton.innerHTML = `Likes: <span>${quote.likes.length}</span>`
        span.textContent = 0
        deleteButton.textContent = 'Delete'

        deleteButton.addEventListener('click', event => {
            quoteCard.remove()

            fetch(`http://localhost:3000/quotes/${quote.id}`, {
                method : 'DELETE'
            })
        })

        likeButton.addEventListener('click', event => {
            let likeId = parseFloat(quote.id)
            likeButton.innerHTML = `Likes: <span>${quote.likes.length + 1}</span>`
            
            fetch(`http://localhost:3000/likes`, {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    id : '',
                    quoteId : likeId,
                    createdAt : Date.now()
                })
            })
        })


    }

    let form = document.querySelector('#new-quote-form')
    

    form.addEventListener('submit', event => {
        event.preventDefault()
        let newQuote = event.target[0].value
        let newAuthor = event.target[1].value

        fetch(`http://localhost:3000/quotes`,{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                id : '',
                quote : newQuote,
                author : newAuthor
            })
        })
        .then(response => response.json())
        .then(data => renderQuotes(data))

    })


})