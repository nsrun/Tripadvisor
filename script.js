

 //index.html page  Filter Functionality//
function filterSelection(c, element) {
  var x, i, btns;
  x = document.getElementsByClassName("card");
  if (c == "all") c = "";
  // Remove 'active' class from all buttons
  btns = document.getElementsByClassName("category-item");
  for (i = 0; i < btns.length; i++) {
    btns[i].classList.remove("active");
  }
  // Add 'active' class to clicked button
  element.classList.add("active");
  for (i = 0; i < x.length; i++) {
    if (x[i].dataset.category.indexOf(c) > -1 || c === "") {
      x[i].style.display = "";
    } else {
      x[i].style.display = "none";
    }
  }
}

     // review.html page  Rating Functionality//  
        function rate(n) {
            const stars = document.querySelectorAll('.star-rating i');
            stars.forEach((star, index) => {
                if (index < n) {
                    star.classList.replace('fa-regular', 'fa-solid');
                    star.style.color = '#34E0A1';
                } else {
                    star.classList.replace('fa-solid', 'fa-regular');
                    star.style.color = '#ccc';
                }
            });
        }
    