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
});
