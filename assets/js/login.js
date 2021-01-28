$(function() {
    // var form = layui.form
    const { form, layer } = layui

    $('.links a').click(function() {
        $('.layui-form').toggle()
    })

    // 校验表单项
    form.verify({
        pass: [
            /^\w{6,12}$/, '密码必须6到12位'
        ],
        samePass: function(value) {
            if (value !== $('#pass').val()) {
                return '两次密码输入不一致'
            }
        }
    })

    // 实现注册功能
    $('.reg-form').submit(function(e) {
        e.preventDefault()

        // 发送ajax
        axios.post('http://api-breakingnews-web.itheima.net/api/reguser', $(this).serialize())
            .then(res => {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('注册失败')
                }
                // 自动跳转到登录
                layer.msg('注册成功')
                $('.login-form a').click()
            })
    })

    // 实现登录功能
    $('.login-form').submit(function(e) {
        e.preventDefault()

        // 发送ajax
        axios.post('/api/login', $(this).serialize())

        .then(res => {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg('登录失败')
            }
            // 登录成功后，吧个人令牌保存到本地存储
            localStorage.setItem('token', res.token)
            layer.msg('登录成功')

            location.href = './index.html'
        })
    })




})