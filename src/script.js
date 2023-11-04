let content = document.getElementById("content")

let create_ptag = function(text) {
    let p_tag = document.createElement("p");
    p_tag.textContent = text;
    content.innerHTML = ""
    content.appendChild(p_tag);
}
async function fetch_dog() {
    console.log("abcd")
    let response  =  await fetch("https://dog.ceo/api/breeds/image/random")
    let image =  (await response.json()).message
    let new_img = document.body.querySelector("img")
    new_img.src = image;
    content.innerHTML = "";
    content.appendChild(new_img);

}

async function fetch_by_breed() {
    console.log("abcd")
    let breed = document.getElementById("input-breed").value.toLowerCase()
    console.log(breed + "a")
    let response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
    let image = (await response.json()).message
    if (image != "Breed not found (master breed does not exist)") {
        let new_img = document.body.querySelector("img")
        new_img.src = image;
        content.innerHTML = "";
        content.appendChild(new_img);
    } else {
        create_ptag("Breed not found!");
    }
}
async function fetch_sub_breed() {
    let breed= document.getElementById("input-breed").value.toLowerCase();
    let response = await fetch(`https://dog.ceo/api/breed/${breed}/list`);
    let breed_list = (await response.json()).message;
    console.log(breed_list);
    if (Array.isArray(breed_list) && breed_list.length) {
        ol_tag = document.createElement("ol");
        for (let breed of breed_list) {
            li_tag = document.createElement("li");
            li_tag.textContent = breed;
            ol_tag.appendChild(li_tag);
        }
        content.innerHTML = ""
        content.appendChild(ol_tag);
    } else if (breed_list == "Breed not found (master breed does not exist)") {
        create_ptag("Breed not found!")
    }
    else {
        create_ptag("No sub-breeds found!")
    }
}

async function fetch_all_breeds() {
    let input = document.getElementById("input-breed").textContent.toLowerCase();
    let response = await fetch("https://dog.ceo/api/breeds/list/all");
    let all_breeds = (await response.json()).message;
    let ol_tag = document.createElement("ol");
    for (let breed in all_breeds) {
        let li_tag = document.createElement("li");
        li_tag.textContent = breed;
        if (all_breeds[breed].length) {
            let ul_tag = document.createElement("ul");
            for (let sub_breed of all_breeds[breed]) {
                let internal_li_tag = document.createElement("li");
                internal_li_tag.textContent = sub_breed;
                li_tag.textContent = sub_breed;
                ul_tag.appendChild(internal_li_tag);
            }
            li_tag.appendChild(ul_tag);
        }
        ol_tag.appendChild(li_tag);
    }
    content.innerHTML = "";
    content.appendChild(ol_tag);

}


document.getElementById("button-random-dog").addEventListener('click', fetch_dog)
document.getElementById("button-show-breed").addEventListener('click', fetch_by_breed)
document.getElementById("button-show-sub-breed").addEventListener("click", fetch_sub_breed)
document.getElementById("button-show-all").addEventListener("click", fetch_all_breeds)