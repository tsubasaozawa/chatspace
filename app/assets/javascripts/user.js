$(function(){

    var search_list = $("#user-search-result");
    var selected_list = $("#selected-append");

    function appendUser(user){
        var html =
                    `<div class="chat-group-user clearfix">
                      <p class="chat-group-user__name">${user.name}</p>
                      <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
                    </div>`;
                    search_list.append(html);
    }

    function appendErrMsgToHTML(msg){
        var html = 
                    `<div class="chat-group-user clearfix">
                        <p class="chat-group-user__name">${msg}</p>
                    </div>`;
                    search_list.append(html);
    }

    function appendList(selectNo,selectName) {
      var html = `<div class='chat-group-user js-chat-user'>
                    <input name='group[user_ids][]' type='hidden' value='${ selectNo }'>
                    <p class='chat-group-user__name'>${ selectName }</p>
                    <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove' data-user-id=${selectNo} data-user-name=${selectName}>削除</div>
                  </div>`
                  selected_list.append(html);
    }

  $("#user-search-field").on("keyup",function(){
    var input = $("#user-search-field").val();
    var group_id = $('.chat__group_id').val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input ,groupId: group_id },
      dataType: 'json'
    })
    .done(function(users){
      console.log(users);
      if (input.length === 0) {
          $('#user-search-result').empty();
        }

      else if (users.length !== 0){
          $('#user-search-result').empty();
          users.forEach(function(user){
            appendUser(user);
          });
      }

      else {
          $('#user-search-result').empty();
          appendErrMsgToHTML("一致するユーザーが見つかりません");
      }
    })

    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
    .always(function(user){
      $('#user-search-result').prop('disabled', false);　
    })
  });

  $("#user-search-result").on('click','.chat-group-user__btn--add', function() {
    var selectNo = $(this).data('user-id');
    var selectName = $(this).data('user-name');
    appendList(selectNo,selectName);
    $(this).parent().remove();
  });
  $("#selected-append").on('click','.chat-group-user__btn--remove', function() {
    $(this).parent().remove();
  });
  $(".chat-group-user").on('click','.chat-group-user__btn--remove', function() {
    $(this).parent().remove();
  });
});