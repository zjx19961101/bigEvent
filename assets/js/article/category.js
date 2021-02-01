$(function() {
    // 定义弹出层的id号
    let index
    const { form } = layui

    // 从服务器获取文章列表数据，渲染到页面
    getCateList()

    // 封装一个函数，使用模板引擎拼接数据
    function getCateList() {
        axios.get('/my/article/cates').then(res => {
            console.log(res);

            // 判断请求失败
            if (res.status !== 0) {
                return layer.msg('获取分类列表失败')
            }

            // 使用模板引擎渲染页面.引入插件，准备模板，调用模板函数
            const htmlStr = template('tpl', res)
            console.log(htmlStr);

            $('tbody').html(htmlStr)
        })
    }


    // 点击添加按钮，添加一个文章分类
    $('.add-btn').click(function() {
        index = layer.open({
            type: 1,
            title: '添加',
            content: $('.add-form-container').html(),
            area: ['400px', '350px']
        });
    })

    // 监听添加表单提交事件
    $(document).on('submit', '.add-form', function(e) {
        e.preventDefault()


        // 发送请求，把表单数据提交到服务器
        axios.post('/my/article/addcates', $(this).serialize()).then(res => {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg('提交失败!')
            }
            // 成功TODO，关闭弹出层
            layer.close(index)

            // 更新外层分类表和数据，重新调用方法渲染
            getCateList()
        })

    })

    // 点击编辑按钮，弹出编辑表单
    $(document).on('click', '.edit-btn', function(e) {

        index = layer.open({
            type: 1,
            title: '修改文章分类',
            content: $('.edit-form-container').html(),
            area: ['400px', '350px']
        });

        // 获取自定义属性的值
        console.log($(this).data('id'));
        const id = $(this).data('id')

        // 发送请求，获取当前的分类数据
        axios.get(`/my/article/cates/${id}`).then(res => {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg('获取失败!')
            }
            // 对编辑表单进行赋值
            form.val('edit-form', res.data)
        })


    })

    // 监听编辑表单的提交事件
    $(document).on('submit', '.edit-form', function(e) {
        e.preventDefault()


        // 发送请求，把表单数据提交到服务器
        axios.post('/my/article/updatecate', $(this).serialize()).then(res => {
            console.log(res);

            if (res.status !== 0) {
                return layer.msg('提交失败!')
            }
            // 成功TODO，关闭弹出层
            layer.close(index)

            // 更新外层分类表和数据，重新调用方法渲染
            getCateList()
        })

    })

    // 点击删除按钮，删除当前表单
    $(document).on('click', '.del-btn', function() {

        // 获取自定义属性的值
        const id = $(this).data('id')


        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {

            // 发送请求，删除当前的分类数据
            axios.get(`/my/article/deletecate/${id}`).then(res => {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('删除失败!')
                }

                layer.msg('删除成功!')

                // 更新外层分类表和数据，重新调用方法渲染
                getCateList()
            })
            layer.close(index);
        });
    })
})