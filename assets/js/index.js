//1.获取用户的个人信息
function getUserInfo() {

    //发送ajax请求
    axios.get('/my/userinfo').then(res => {
        console.log(res);
        // 校验请求失败
        if (res.status !== 0) {
            return layer.meg('获取用户信息失败')
        }

        const { data } = res
        // 渲染用户信息
        const name = data.nickname || data.username

        // 渲染昵称
        $('.nickname').text(`欢迎 ${name}`).show()

        // 渲染头像
        if (data.user_pic) {
            $('.avater').prop('src', data.user_pic).show()
            $('.text-avater').hide()
        } else {
            $('.text-avater').text(name[0].toUpperCase()).show()
            $('.avater').hide()
        }
    })

}
$(function() {

    // 从layui中提取

    getUserInfo()

    const { layer } = layui

    // 点击退出
    $('#logout').click(function() {
        // 请求接口
        // 1.清除token
        localStorage.removeItem('token')

        // 2.跳转登录页
        location.href = './login.html'
    })
})