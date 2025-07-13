let def=document.getElementById("def");
let Search_btn=document.getElementById("Search-btn");
let Search_txt=document.getElementById("search-txt");
let definition=document.getElementById("definition");
let pictures=document.getElementById("pictures");
function search(data){
    const URL=`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(data)}`
    definition.classList.remove("pourNone");
    pictures.classList.remove("pourNone");
    fetch(URL)
    .then(resolve=>resolve.json())
    .then(res=>{
        if(res.extract){
            def.textContent=res.extract;
        }else{
            def.textContent="Nothing found. Try again!";
        }
    })
    .catch(err=>{
        console.log(`Error : ${err.message}`);
        def.textContent = "An error occurred. Please try again later.";
    })
}
function fetchImage(query){
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=30&prop=imageinfo&iiprop=url&format=json&origin=*`;
    fetch(url)
    .then(reponse=>reponse.json())
    .then(data=>{
        pictures.innerHTML='<div class="title_def">Pictures</div>'
        if(data.query&&data.query.pages){
            const pages = Object.values(data.query.pages);
            pages.forEach(page=>{
                if(page.imageinfo&&page.imageinfo[0].url){
                    const Imgurl=page.imageinfo[0].url;
                    const img=document.createElement("img");
                    img.src=Imgurl;
                    img.alt=query;
                    img.style.width='200px';
                    img.style.margin='10px';
                    pictures.appendChild(img);
                }
            });
        }else{
            pictures.innerHTML='<p>Aucun page Trouvée </p>';
        }
    })
    .catch(err=>{
        console.log("Erreur de recuperation des images");
        pictures.innerHTML='<p>Erreur lors de chargement  des images </p>';
    })
}
Search_btn.addEventListener("click",()=>{
    let query=Search_txt.value.trim();
    if(query!==""){
        fetchImage(query);
        search(query);
    }
})
document.addEventListener("keypress",(event)=>{
    if (event.key === "Enter") {
        let query=Search_txt.value.trim();
        if(query!==""){
            fetchImage(query);
            search(query);
    }
    }
})