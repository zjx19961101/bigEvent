// 修改密码模块

$(function() {

    //对form表单校验
    const { form, layer } = layui

    form.verify({
        pass: [
            /^\w{6,12}$/,
            '昵称长度必须在1~6个字符之间'
        ],
        confirmPass: function(val) {
            if (val !== $('#pass').val()) {
                return '两次密码输入不一致'
            }
        }
    })

    // 表单提交
    $('.layui-form').submit(function(e) {
        e.preventDefault()

        // 发送ajax请求
        axios.post('/my/updatepwd', $(this).serialize())
            .then(res => {
                console.log(res);

                if (res.status !== 0) {
                    return layer.msg('修改密码失败')
                }

                layer.msg('修改密码成功')
            })
    })




})