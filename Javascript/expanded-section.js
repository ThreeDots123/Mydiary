const cancel_button = document.querySelectorAll(".cancel")
const two_main = document.querySelector(".two-main")
const delete_button = document.querySelectorAll(".delete")
const delete_form = document.querySelector(".delete-form")


const cancel = (e) => {
    e.preventDefault()
    two_main.style.display = "none"
}

Array.from(delete_button).forEach(item => {
    item.addEventListener("click", (e) => {
        const delete_story_ID = item.attributes.valueId.value
        e.preventDefault()
        delete_form.action = `/my.diary.com/stories/delete${delete_story_ID}?_request=DELETE`
        two_main.style.display = "block"
    })
})

Array.from(cancel_button).forEach(item => {
    item.addEventListener("click", cancel)
})