$(document).ready(main);
const HOST = '0.0.0.0';
// const HOST = ${window.location.hostname};
const checksAmenities = {};
const checksStates = {};
const checkCities = {};
const obj = {};

function main () {
  readAmenities();
  readStates();
  readCities();
  statusRoom();
  dataUsers();
  $(':button').click(function () {
    dataUsers();
  });
  showReviews();
}

function dataUsers () {
  $.ajax({
    url: `http://${HOST}:5001/api/v1/places_search/`,
    type: 'POST',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({
      amenities: Object.values(checksAmenities),
      states: Object.values(checksStates),
      cities: Object.values(checkCities)
    }),
    success: function (data) {
      // console.log(data);
      $('.places').empty();
      for (const place of data) {
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
        <div class="reviews"><h2>
          <span id="${place.id}n" class="treview">Reviews</span>
          <span id="${place.id}" onclick="showReviews(this)">Show</span>
            <ul id="${place.id}"></ul>
        </div>
      </article>`);
      }
    }
  });
}

function statusRoom () {
  const urlStatus = `http://${HOST}:5001/api/v1/status/`;
  $.get(urlStatus, function (data, txtStatus) {
    if (txtStatus === 'success' && data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
}

function readAmenities () {
  // Evento change para cambiar el resultado del checkbox
  $('.amenities .popover INPUT[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      // Agrega al dict checks_amenities con su id y nombre
      checksAmenities[$(this).attr('data-name')] = $(this).attr('data-id');
    } else {
      // Si no tiene el check eliminalo del objeto
      delete checksAmenities[$(this).attr('data-name')];
    }
    // Agrega los amenities(solo los nombres(valores))
    const namesh4 = Object.keys(checksAmenities);
    $('.amenities h4').text(namesh4.sort().join(', '));
    // console.log(Object.keys(checksAmenities)); console.log(checksAmenities);
  });
}

function readStates () {
  $('.state_box').change(function () {
    if ($(this).is(':checked')) {
      checksStates[$(this).attr('data-name')] = $(this).attr('data-id');
    } else {
      delete checksStates[$(this).attr('data-name')];
    }
    const namesh4 = Object.keys(checksStates);
    $('.h4_states').text(namesh4.sort().join(', '));
  });
}

function readCities () {
  $('.city_box').change(function () {
    if ($(this).is(':checked')) {
      checkCities[$(this).attr('data-name')] = $(this).attr('data-id');
    } else {
      delete checkCities[$(this).attr('data-name')];
    }
    const namesh4 = Object.keys(checkCities);
    $('.h4_cities').text(namesh4.sort().join(', '));
  });
}

function showReviews (obj) {
  if (obj === undefined) {
    return;
  }
  if (obj.textContent === 'Show') {
    obj.textContent = 'Hide';
    $.get(`http://${HOST}:5001/api/v1/places/${obj.id}/reviews`, (data, textStatus) => {
      if (textStatus === 'success') {
        $(`#${obj.id}n`).html(data.length + ' Reviews');
        for (const review of data) {
          printReview(review, obj);
        }
      }
    });
  } else {
    obj.textContent = 'Show';
    $(`#${obj.id}n`).html('Reviews');
    $(`#${obj.id}r`).empty();
  }
}

function printReview (review, obj) {
  const date = new Date(review.created_at);
  const month = date.toLocaleString('en', { month: 'long' });
  const day = dateOrdinal(date.getDate());

  if (review.user_id) {
    $.get(`http://${HOST}:5001/api/v1/users/${review.user_id}`, (data, textStatus) => {
      if (textStatus === 'success') {
        $(`#${obj.id}r`).append(
          `<li><h3>From ${data.first_name} ${data.last_name} the ${day + ' ' + month + ' ' + date.getFullYear()}</h3>
          <p>${review.text}</p>
          </li>`);
      }
    });
  }
}

function dateOrdinal (dom) {
  if (dom === 31 || dom === 21 || dom === 1) return dom + 'st';
  else if (dom === 22 || dom === 2) return dom + 'nd';
  else if (dom === 23 || dom === 3) return dom + 'rd';
  else return dom + 'th';
}
