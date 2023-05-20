/* Set the width of the side navigation to 250px */
function openCloseNav() {
    const sidebar = document.getElementById("mySidenav");
    console.log(sidebar.style.width);
    if (!sidebar.style.width || sidebar.style.width === "0px")
        sidebar.style.width ="250px"; 
    else sidebar.style.width = "0px";
  }

  function openCloseLoginName() {
    const signout = document.getElementById("signoutBtn");
    if (!signout.style.height || signout.style.height === "0px")
        signout.style.height ="50px"; 
    else signout.style.height = "0px";
  }
  
  