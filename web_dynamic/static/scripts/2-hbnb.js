
function statusRoom () {
  const urlStatus = 'http://0.0.0.0:5001/api/v1/status/'
  $.get(urlStatus, function (data, txtStatus) {
    if (txtStatus === 'success' && data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
}


$('document').ready(function () {
    let checks_amenities = {};
    // Evento change para cambiar el resultado del checkbox
    $('INPUT[type="checkbox"]').change(function () {
    // Si el checkbox tiene un check
      if ($(this).is(':checked')) {
          // Agrega al objeto checks_amenities
          // cada atributo de amenity con su id y nombre
        checks_amenities[$(this).attr('data-id')] = $(this).attr('data-name');
      } else {
          // Si no tiene el check eliminalo del objeto
        delete checks_amenities[$(this).attr('data-id')];
      }
      // Agrega los amenities(solo los nombres(valores))
      // (del objeto checks_amenities), seguido de una coma
      // dentro del tag H4 hijo de la clase amenities
      $('.amenities H4').text(Object.values(checks_amenities).join(', '));
    //   console.log(Object.values(checks_amenities));
    });

	statusRoom();
});
