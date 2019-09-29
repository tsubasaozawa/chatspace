$(function(){
  function buildHTML(post){
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
                    ${post.content}
                  </p>
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
      $('.input-box__text').val('');
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