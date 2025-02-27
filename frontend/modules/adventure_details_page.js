import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  // console.log(search);

  const url = new URLSearchParams(search);
  const data = url.get('adventure');
  // console.log(data);

  return data;


  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
     const adv_details = await fetch(config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`);
     const data = await adv_details.json();
    //  console.log(data);
     return data;
  }
  catch(err){
    return null;
  }

  // Place holder for functionality to work in the Stubs
 
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  // console.log(adventure);
  let adventure_name = document.getElementById('adventure-name');
  adventure_name.append(`${adventure.name}`);

  let adventure_subtitle = document.getElementById('adventure-subtitle');
  adventure_subtitle.append(`${adventure.subtitle}`)

  adventure.images.forEach(ele =>{
    let div = document.createElement('div');
    let img = document.createElement('img');
    img.className = 'activity-card-image';
    img.src = ele;
    div.append(img);

    document.getElementById('photo-gallery').append(div);
    
  })
  document.getElementById('adventure-content').append(`${adventure.content}`);
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
// console.log(images);
  
const gall=document.getElementById('photo-gallery');

const photo=`
<div id="carouselExampleIndicators" class="carousel slide">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
  ${
    images.map((ele,index )=>`
    
    <div class = "carousel-item ${index ===0?'active' : ''}">
    <img src=${ele} class='activity-card-image'>
    
    </div>`
)
}
</div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
`
gall.innerHTML = photo;
// images.forEach((ele,index )=>{
//     let div = document.createElement('div');
//     div.className = `carousel-item ${index} ==0?'active : ''`;
//     div.innerHTML = `<img src=${ele} class='activity-card-image'>`;
//     document.getElementsByClassName('carousel-inner').append(div);
// })
  

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  // console.log(adventure);
  if(adventure.available == true)
  {
    document.getElementById('reservation-panel-sold-out').style.display="none";
    document.getElementById('reservation-panel-available').style.display = "block";
    document.getElementById('reservation-person-cost').innerHTML = adventure.costPerHead;
  }
  else{
    document.getElementById('reservation-panel-sold-out').style.display="block";
    document.getElementById('reservation-panel-available').style.display = "none";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  // console.log(persons);
  return document.getElementById("reservation-cost").innerHTML = persons * adventure.costPerHead
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".

  // let myform = document.getElementById('myForm');
  // myform.addEventListener('submit',async function (e){

  //   let ele =config.backendEndpoint+"/reservations/new";

    
  //   let formele = myform.elements;
  //   e.preventDefault();
  //   let arr = {
  //     name:formele["name"].value.trim(),
  //     date: formele["date"].value,
  //     person:formele["person"].value,
  //     adventure:adventure['id']
  //   }

  //   try{
  //     const rs = await fetch (ele,{
  //       method:"POST",
  //       body:JSON.Stringify(arr),
  //       headers:{
  //         "Content-Type":"application/json"
  //       }
  //     })
  //     alert("success");
  //   window.location.reload();
  //     // if(rs.ok)
  //     // alert("Success");
  //     // else
  //     // alert("Failed");
  //   }
  //   catch(e)
  //   {
  //     console.log(e);
  //    alert("failed");
  //   }
  // })
  
  const Form=document.getElementById("myForm");
 Form.addEventListener("submit",async(e)=>{
   e.preventDefault();
   let  data={
     name:Form.elements["name"].value,
     date:new Date(Form.elements["date"].value),
     person:Form.elements["person"].value,
     adventure:adventure["id"]
   }
   console.log(data);
   try{
     const url=`${config.backendEndpoint}/reservations/new`;
     const res=await fetch(url,{
       method:"POST",
      headers: {'Content-Type': 'application/json'},
       body:JSON.stringify(data)
     });
    alert("success");
    window.location.reload();
   }
   catch(error){
     console.log(error);
     alert("failed");

   }
 });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved)
  {
    document.getElementById("reserved-banner").style.display = "block";
  }
  else
  {
    document.getElementById('reserved-banner').style.display = "none"
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
