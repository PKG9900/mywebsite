// 表单提交（演示：弹出提示，实际需配置后端）
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('estimateForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // 这里可以添加前端验证
            alert('表单已提交！我们的客服会尽快联系您。\n（演示模式，实际需对接后端）');
            // 实际开发中，可使用fetch提交到后端API
            // fetch('/api/submit', { method: 'POST', body: new FormData(form) })
            //   .then(response => response.json())
            //   .then(data => { alert('提交成功'); form.reset(); })
            //   .catch(error => alert('提交失败，请稍后再试'));
        });
    }

    // 行情中心选项卡切换
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');
    if (tabs.length) {
        tabs.forEach(btn => {
            btn.addEventListener('click', function() {
                const cat = this.dataset.cat;
                tabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                contents.forEach(content => content.classList.remove('active'));
                document.getElementById(cat).classList.add('active');
            });
        });
    }
});