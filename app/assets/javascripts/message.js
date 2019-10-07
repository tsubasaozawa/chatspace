$(function(){
  function buildHTML(message){
    var image = (message.image) ? `<img class= "lower-message__image" src=${message.image} >` : "";
    var html =`<div class="message" data-message-id="${message.id}">
                <div class="message__upper-info">
                  <p class="message__upper-info__talker">
                    ${message.name}
                  </p>
                  <p class="message__upper-info__date">
                    ${message.created_at}
                  </p>
                </div>
                  <p class="message__text">
                  </p>
                  <p class="lower-message__content">
                    ${message.content}
                  </p>
                    ${image}
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
      alert("送信エラー");
    })
    .always(function(post){
      $('.submit-btn').prop('disabled', false);　
    })
  })

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
    last_message_id = $('.message:last').data('message-id');
    $.ajax({
      url: 'api/messages',
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function(message){
        insertHTML = buildHTML(message);
        $('.messages').append(insertHTML);
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      })
    })
    .fail(function() {
      alert("自動更新に失敗しました")
    });
    };
  };
setInterval(reloadMessages, 5000);
});

