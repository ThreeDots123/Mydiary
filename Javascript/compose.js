const story_Validation = document.querySelector(".message-text-story > p")
const story = document.querySelector(".post > textarea")
let count = document.querySelector(".post > textarea").textContent.length
const publish = document.querySelector(".publish > input")

if(story.textContent.length < 200){
    story_Validation.style.color = "red"
    publish.disabled = true
}
else{
    story_Validation.style.color = "green"
    story_Validation.textContent = "Story Has Met The Minimum Character Length.."
}

story.addEventListener("input", (e) => { 
    count = document.querySelector(".post > textarea").value.length

    if(count < 200){
        story_Validation.style.color = "red"
        story_Validation.textContent = "Story Should Be At Least 200 Characters Long.."
        publish.disabled = true
    }
    else{
        story_Validation.style.color = "green"
        story_Validation.textContent = "Story Has Met The Minimum Character Length.."
        publish.disabled = false
    }
})