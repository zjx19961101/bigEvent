$(function() {
    const { form } = layui
    // 从服务器获取文章分类列表
    getCataLiast()

    function getCataLiast() {
        axios.get('/my/article/cates').then(res => {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg('获取失败!')
            }
            // 渲染下拉组件选项 
            res.data.forEach(item => {
                $('#cate-sel').append(`<option value="${item.Id}">${item.name}</option>`)
            })

            // 更新表单
            form.render();
        })
    }

    // 初始化富文本编辑器
    initEditor()


    // 1. 初始化图片裁剪器
    const $image = $('#image')

    // 2. 裁剪选项
    $image.cropper({
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    })

    // 为选择封面按钮绑定点击事件

    $('#choose-btn').click(function() {
        $('#file').click()
    })


    // 4. 监听文件框状态改变事件 change: file, checkbox, select
    $('#file').change(function() {
        // 4.1 获取用户上传的文件列表 
        console.log(this.files) // 伪数组

        // 判断用户是否上传
        if (this.files.length == 0) {
            return
        }

        // 4.2 把文件转成 url地址的形式
        const imgUrl = URL.createObjectURL(this.files[0])

        // 4.3 替换裁剪区的图片
        $image.cropper('replace', imgUrl)
    })
})