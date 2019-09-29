$(function(){
  function buildHTML(post){
    var content = post.content ? `${ post.content }` : "";
    var img = post.image ? `<img class="lower-message__image" src="${post.image}" alt="Image">` : "";
    var html =`<div class="message">
                <div class="message__upper-info">
                  <p class="message__upper-info__talker">
                    ${post.name}
                  </p>
                  <p class="message__upper-info__date">
                    ${post.created_at}
                  </p>
                </div>
                  <p class="message__text">
                  </p><p class="lower-message__content">
                    ${content}
                  </p>
                    ${img}
              </div>`
    return html;
  }

  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "post",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(post){
      var html = buildHTML(post);
      $('.messages').append(html);
      $("form")[0].reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function(post){
      alert("エラー");
    })
    .always(function(post){
      $('.submit-btn').prop('disabled', false);　
    })
  })
});