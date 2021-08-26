var list = new Array();
var pageList = new Array();
var currentPage =1;
var numberPerPage = 10;

// Getting JSON data from the API
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json", true);
xhr.send();
xhr.onload = function(){
  
  // Storing the API JSON data in the variable data
  var data = JSON.parse(this.response);

  // Using foreach the value from the data is added into the array "list"
  data.forEach(user => {
    list.push(user);
    setCurrentPage(1)
  });

}


// SetPageNumber is used to set the prev, next and numerical buttons
function setPageNumber(){
  
  // The pageCounter var is used to collect the first div data of class pageCounter
  var pageCounter = document.querySelector(".pageCounter");

  //  *********FIRST PAGE BUTTON*********

  // Here firstpage is used to create a button that is going to redirect the page to firstpage
  var firstpage = document.createElement('a');
  firstpage.innerText = "First"
  firstpage.href = "#"

  // Here the class name for the button is set using serAttribute
  firstpage.setAttribute("class","btn btn-primary firstpage")

  // Onclick functionality s is given to the button and this will redirect it to firstPage method
  firstpage.onclick = function(){
    firstPage()
  }
  
  pageCounter.appendChild(firstpage)

  //  *********PREVIOUS PAGE BUTTON*********

  // Here prevPage is used to create a button that is going to redirect the page to previouspage
  // It has the same functionality as the previous page and here it redirects to firstpage
  var prevPage = document.createElement('a');
  prevPage.innerText = "Previous";
  prevPage.href = "#"
  
  // Here the class name for the button is set using serAttribute
  prevPage.setAttribute("class","btn btn-primary prevPage")

  // Onclick functionality s is given to the button and this will redirect it to previousPage method
  prevPage.onclick = function(){
    previousPage()
  }
  
  // the prevPage is now added to the div of class pageCounter
  pageCounter.appendChild(prevPage)

  // Using for loop have created multiple button having numeric values having same functionality as the above
  // Here the button's onclick will redirect to the setCurrentPage method using the paramter value of i
  for(let i=1; i<=10; i++){

    var page = document.createElement('a');
    page.innerText = i
    page.setAttribute("class","active")
    page.href= "#"
    page.onclick = function(){
      
      setCurrentPage(i)
    }
    
    pageCounter.appendChild(page)
  }
  
  // Here nextpage is used to create a button that is going to redirect the page to nextpage
  // It has the same functionality as the previous page and here it redirects to nextpage
  var nextpage = document.createElement('a');
  nextpage.innerText = "Next";
  nextpage.href = "#";
  nextpage.setAttribute("class","btn btn-primary nextpage");
  nextpage.onclick = function(){
    nextPage();
  }
  
  pageCounter.appendChild(nextpage)

  // Here lastpage is used to create a button that is going to redirect the page to lastpage
  // It has the same functionality as the previous page and here it redirects to lastpage
  var lastpage = document.createElement('a');
  lastpage.innerText = "Last";
  lastpage.href = "#";
  lastpage.setAttribute("class","btn btn-primary lastpage");
  lastpage.onclick = function(){
    lastPage();
  }
  
  pageCounter.appendChild(lastpage)

}

// nextPage function is used to moves one page backward from the current page
// It also checks if the current page is the last page and if yes the next page button is disabled
function nextPage(){
  if(currentPage<10){
    currentPage += 1;
    loadList();
  }else{
    var next = document.querySelector(".nextpage");
    next.style.disabled;
  }
  
}

// previousPage function is used to moves one page forward from the current page
// It also checks if the current page is the first page and if yes the previous page button is disabled
function previousPage() {
  if(currentPage >1){
    currentPage -= 1;
    loadList();
  }else{
    var prev = document.querySelector(".prevPage");
    prev.style.disabled;
  }
  
}

// This function jumps sets the current page to 1 so that user can jump directly to page 1
function firstPage() {
  currentPage = 1;
  loadList();
}

// This function jumps sets the current page to numberOfPages count so that user can jump directly to Last page
function lastPage() {
  currentPage = numberOfPages;
  loadList();
}

// This fuction is to set the values as per the page number
// It gets the value from the setPageNumber function based on the input it sets the current page value
// It redirects to the loadList function
function setCurrentPage(a){
  if(a== null || a==undefined){
    currentPage = 1;
    
  }else{
    currentPage = a;
  }
  loadList();
  
}

// this function checks the count of dipslaying content and remove displaying data
// also stores new data into pageList array 
function loadList() {

  // count is used to get all the values in the div class jsonContent
  var count = document.querySelectorAll(".jsonContent");

  // listCount is used to get all the values in the div id list
  var listCount = document.querySelector('#list');
  
  // Check if the count has values more than 10 
  // If yes all the values are removed as we don't need the existing page values, since the user requested
  // for other page
  if(count.length> 9){
    for(let i=0; i<count.length; i++){
      listCount.removeChild(count[i])
    }
    
  }

  // Based on the current page request the begin and end are set
  var begin = ((currentPage - 1) * numberPerPage);
  var end = begin + numberPerPage;

  // Based on the begin and end values we are only adding the required values into the pageList array
  pageList = list.slice(begin, end);

  drawList();
}

// This function is used to create new div and set class name jsonConten tand pass values as per user request
// into those fields
function drawList() {
  
  
  //using for loop and div is created 'pageList.length' times
  for (r = 0; r < pageList.length; r++) {

      var newDiv = document.createElement("div");
      newDiv.className += "jsonContent";
    
      // P element is created and the user id value is stored in it
      var newIdContent = document.createElement("p");
      newIdContent.innerHTML = "UserID : " + pageList[r].id;
    
      // P element is created and the user name value is stored in it
      var newNameContent = document.createElement("p");
      newNameContent.innerHTML = "Name : " + pageList[r].name;
    
      // P element is created and the user email value is stored in it
      var newEmailContent = document.createElement("p");
      newEmailContent.innerHTML = "Email : " + pageList[r].email;
    
      // Here all the elements are appedend with the div element
      newDiv.appendChild(newIdContent)
      newDiv.appendChild(newNameContent)
      newDiv.appendChild(newEmailContent)

      // The main div of id list is selected
      var main = document.querySelector('#list');
      
      // the div jsonContent is appended with the main div element
      main.appendChild(newDiv);
  }
}

// This is to call the functions on load 
function load() {
  loadList();
  setPageNumber();
}

// On window load it calls the load function
window.onload = load;
