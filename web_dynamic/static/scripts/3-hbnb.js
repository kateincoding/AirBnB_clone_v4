function dataUsers () {
  $.ajax({
    url: `http://${window.location.hostname}:5001/api/v1/places_search`,
    type: 'POST',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({}),
    success: function (data) {
      for (const place of Object.values(data)) {
        $('section.places').append(`<article>
        <div class="title_box">
          <h2>${place.name}</h2>
          <div class="price_by_night">$${place.price_by_night}</div>
        </div>
        <div class="information">
          <div class="max_guest">
            <i class="fa fa-users fa-3x" aria-hidden="true"></i>
            </br>
            ${place.max_guest} Guests
          </div>
          <div class="number_rooms">
            <I class="fa fa-bed fa-3x" aria-hidden="true"></i>
            </br>
            ${place.number_rooms} Bedrooms
          </div>
          <div class="number_bathrooms">
            <I class="fa fa-bath fa-3x" aria-hidden="true"></i>
            </br>
            ${place.number_bathrooms} Bathrooms
          </div>
        </div>
        <div class="description">
          ${place.description}
        </div>
      </article>`);
      }
    }
  });
}

// const json5 = require("json5");

function statusRoom () {
  const urlStatus = 'http://0.0.0.0:5001/api/v1/status/';
  $.get(urlStatus, function (data, txtStatus) {
    if (txtStatus === 'success' && data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
}

$('document').ready(function () {
  const checksAmenities = {};
  // Evento change para cambiar el resultado del checkbox
  $('INPUT[type="checkbox"]').change(function () {
    // Si el checkbox tiene un check
    if ($(this).is(':checked')) {
      // Agrega al objeto checks_amenities
      // cada atributo de amenity con su id y nombre
      checksAmenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      // Si no tiene el check eliminalo del objeto
      delete checksAmenities[$(this).attr('data-id')];
    }
    // Agrega los amenities(solo los nombres(valores))
    // (del objeto checks_amenities), seguido de una coma
    // dentro del tag H4 hijo de la clase amenities
    $('.amenities H4').text(Object.values(checksAmenities).join(', '));
    //   console.log(Object.values(checks_amenities));
  });

  statusRoom();
  dataUsers();
});
