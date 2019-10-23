function toggleNav(){
    document.getElementById("sidenav").classList.toggle("wid250");
    // document.querySelector(".header").classList.toggle("mar250");
};
window.addEventListener('dblclick', ()=>{
    const sideNav = document.querySelector('#sidenav');
    if(sideNav.classList.contains("wid250")){
        window.onclick = sideNav.classList.remove("wid250");
        console.log(sideNav);
    }
});
// nav scroll to element
function scrollFn(targetElement){
    let targetScroll = document.getElementById(`${targetElement}`);
    targetScroll.scrollIntoView();
}
// slider function
function rollClass(){
    const cards = document.querySelector('.widgets .widget-cards');

    for(i=0; i < cards.children.length; i++){
        if (cards.children[i].classList.contains('card-2')){

            cards.children[i].classList.replace("card-2", "card-3");
        }else if (cards.children[i].classList.contains('card-1')){

            cards.children[i].classList.replace("card-1", "card-2");
            //cards.children[i].style.zIndex = 20;
        }else{

            cards.children[i].classList.replace("card-3", "card-1");

        }
    }
}

window.addEventListener("load",() =>{
    //preloder stops
    const preloader = document.querySelector('.preloader');
        preloader.classList.add('preload-fin');

    let long;
    let lat;
    let headerDegree =  document.querySelector(".header .header-phone .inner-content #header-degree");
    let headerCity =  document.querySelector(".header .header-phone .inner-content #header-cityName");
    let headerCountry =  document.querySelector(".header .header-phone .inner-content #header-countryName");
    let headerStatu =  document.querySelector(".header .header-phone .inner-content #header-statu");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            // console.log(position)
            lat = position.coords.latitude;
            long = position.coords.longitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/6e33730bfb1a97e2b2a445df28c28f64/${lat},${long}`;

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data =>{
                // console.log(data);
                const{temperature, summary} = data.currently;
                
                let celsius = Math.floor((temperature - 32) * (5 / 9));
                //setting dom elements from api
               headerDegree.textContent = celsius + "°";
               headerCity.textContent = data.timezone;
               headerCountry.textContent = data.timezone;
               headerStatu.textContent = summary;

            });
        },
        error => {
          if (error.code == error.PERMISSION_DENIED)
            alert(`You denied location I can't show you the whether 😢
            ساد ورب العباد`);
        });

    }
    // calling slider function 
    setInterval(rollClass, 3000);
    //scroll page down button
    let scrollBtn = document.querySelector("#scroll-btn");
    scrollBtn.addEventListener("click", () => {
        window.scrollBy(0,innerHeight);
    });
});

