module.exports = {
    name: 'youtube',
    description: "Sends the youtube link!",
    execute(message, args){
        if(message.member.roles.cache.has('676241096837431296')){/*Nếu người có role này thì mới gửi tin này được*/
            message.channel.send('https://www.youtube.com/channel/UCMbIkBxWW1Hpb_T-gNTfmJQ?view_as=subscriber');
        } else {
            message.channel.send('Ohhh... Hình như bạn không có quyền hạn, hãy đọc luật và tôi sẽ cấp role cho bạn!');
            message.member.roles.add('676241096837431296');
        }
        
    }
}