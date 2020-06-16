const render = {
    draw: (data) => {
        const div = document.createElement('div')
        div.innerHTML = `<div>${data.color}</div><div>${data.price}</div>`
        document.body.appendChild(div)
    }
}