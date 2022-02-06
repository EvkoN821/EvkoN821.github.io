$(document).ready(function(){ 
    $(".gallery").slick({ 
        slidesToShow: 4,
        slidesToScroll: 4,
		dots: true,  
        infinite: true,  
        responsive: [{
              breakpoint: 850,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
        }]
      });
  });