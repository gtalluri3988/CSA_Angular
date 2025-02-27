// document.addEventListener("DOMContentLoaded", () => {
//   const sidebarLinks = document.querySelectorAll(".sidebar-link-item a");
//   const currentPath = window.location.pathname; // pathname
//   let activeSet = false;

//   const setActiveLink = (link) => {
//     document
//       .querySelectorAll(".sidebar-link-item")
//       .forEach((item) => item.classList.remove("active"));
//     link.parentElement.classList.add("active");
//     activeSet = true;
//   };

//   // Map [redirected_url: nav_menu_link_to_be_highlighted]
//   // For Server Hosting
//   const pathMapping = {
//     "/visitor-access-add.html": "/visitor-access.html",
//     "/add-new-community.html": "/community.html",
//     "/community-details.html": "/community.html",
//     "/resident-list.html": "/resident.html",
//     "/resident-details.html": "/resident.html",
//     "/resident-bulkupload.html": "/resident.html",
//     "/resident-bulkupload-new.html": "/resident.html",
//     "/resident-addnew.html": "/resident.html",
//     "/resident-access.html": "/resident.html",
//     "/resident-access-temp-addnew.html": "/resident.html",
//     "/facility-addnew.html": "/facility.html",
//     "/facility-details.html": "/facility.html",
//     "/Temporary_access.html": "/resident-access.html",
//     "/complaint-details.html": "/complaint.html",
//     "/Finance-Details.html": "/finance.html",
//     "/card-addnew.html": "/card.html",
//     "/content-addnew.html": "/content.html",
//     "/content-addnew.html?community=&Title=&STATUS=type&Upload+Photos=":
//       "/content.html", //:TODO temp - add other logic when connected with api server
//   };

//   sidebarLinks.forEach((link) => {
//     const linkPath = new URL(link.href, window.location.origin).pathname;

//     // Check if current path matches any key in the mapping
//     if (pathMapping[currentPath] && pathMapping[currentPath] === linkPath) {
//       setActiveLink(link);
//     }

//     // Normal case: Exact match or starts with (for nested routes)
//     if (currentPath === linkPath || currentPath.startsWith(linkPath + "/")) {
//       setActiveLink(link);
//     }

//     link.addEventListener("click", (event) => {
//       setActiveLink(event.currentTarget);
//     });
//   });

//   // If no active class was set based on path, retain the previously active link
//   if (!activeSet) {
//     const prevActive = document.querySelector(".sidebar-link-item.active");
//     if (prevActive) {
//       prevActive.classList.add("active");
//     }
//   }
// });

document.addEventListener("DOMContentLoaded", () => {
  const sidebarLinks = document.querySelectorAll(".sidebar-link-item a");
  const currentPath = window.location.href;
  let activeSet = false;

  const setActiveLink = (link) => {
    document
      .querySelectorAll(".sidebar-link-item")
      .forEach((item) => item.classList.remove("active"));
    link.parentElement.classList.add("active");
    activeSet = true;
  };

  // Map [redirected_url: nav_menu_link_to_be_highlighted]
  const pathMapping = {
    "visitor-access-add.html": "visitor-access.html",
    "add-new-community.html": "community.html",
    "community-details.html": "community.html",
    "resident-list.html": "resident.html",
    "resident-details.html": "resident.html",
    "resident-bulkupload.html": "resident.html",
    "resident-bulkupload-new.html": "resident.html",
    "resident-addnew.html": "resident.html",
    "resident-access.html": "resident.html",
    "resident-access-temp-addnew.html": "resident.html",
    "facility-addnew.html": "facility.html",
    "facility-details.html": "facility.html",
    "Temporary_access.html": "resident-access.html",
    "complaint-details.html": "complaint.html",
    "Finance-Details.html": "finance.html",
    "card-addnew.html": "card.html",
    "content-addnew.html": "content.html",
    // "content-addnew.html?community=&Title=&STATUS=type&Upload+Photos=": "content.html", //:TODO temp - add other logic when connected with api server
  };

  sidebarLinks.forEach((link) => {
    const linkPath = new URL(link.href).href;

    // Check if current path matches any key in the mapping
    if (
      pathMapping[new URL(currentPath).pathname.split("/").pop()] ===
      linkPath.split("/").pop()
    ) {
      setActiveLink(link);
    }

    // Normal case: Exact match or starts with (for nested routes)
    if (currentPath === linkPath || currentPath.startsWith(linkPath)) {
      setActiveLink(link);
    }

    link.addEventListener("click", (event) => {
      setActiveLink(event.currentTarget);
    });
  });

  // If no active class was set based on path, retain the previously active link
  if (!activeSet) {
    const prevActive = document.querySelector(".sidebar-link-item.active");
    if (prevActive) {
      prevActive.classList.add("active");
    }
  }
});
