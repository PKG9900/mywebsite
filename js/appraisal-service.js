// 鉴定服务交互
class AppraisalService {
    constructor() {
        this.appraisalTypes = {
            quick: { name: '快速鉴定', price: 0, time: '24小时内' },
            professional: { name: '专业鉴定', price: 200, time: '3-5个工作日' },
            free: { name: '免费等级鉴定', price: 0, time: '3-5个工作日' }
        };
    }
    
    // 处理照片上传
    handlePhotoUpload(event) {
        const file = event.target.files[0];
        
        if (!file) return;
        
        // 验证文件类型
        if (!file.type.match('image.*')) {
            alert('请上传图片文件');
            return;
        }
        
        // 验证文件大小（最大5MB）
        if (file.size > 5 * 1024 * 1024) {
            alert('图片大小不能超过5MB');
            return;
        }
        
        // 显示上传预览
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.querySelector('.photo-preview');
            if (preview) {
                preview.src = e.target.result;
                preview.style.display = 'block';
            }
        };
        reader.readAsDataURL(file);
    }
    
    // 提交鉴定申请
    submitAppraisal(formData) {
        // 显示提交中状态
        const submitButton = document.querySelector('#submitAppraisal');
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = '提交中...';
        }
        
        // 模拟API调用
        setTimeout(() => {
            alert('鉴定申请提交成功！我们会在' + this.appraisalTypes[formData.type].time + '为您完成鉴定。');
            
            // 重置表单
            const form = document.querySelector('#appraisalForm');
            if (form) {
                form.reset();
            }
            
            // 恢复按钮状态
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = '提交鉴定';
            }
        }, 1500);
    }
}

// 初始化鉴定服务
document.addEventListener('DOMContentLoaded', function() {
    const appraisalService = new AppraisalService();
    
    // 照片上传事件
    const photoInput = document.querySelector('#photoUpload');
    if (photoInput) {
        photoInput.addEventListener('change', function(e) {
            appraisalService.handlePhotoUpload(e);
        });
    }
    
    // 表单提交事件
    const appraisalForm = document.querySelector('#appraisalForm');
    if (appraisalForm) {
        appraisalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                type: document.querySelector('#appraisalType').value,
                name: document.querySelector('#coinName').value,
                year: document.querySelector('#coinYear').value,
                grade: document.querySelector('#coinGrade').value
            };
            
            appraisalService.submitAppraisal(formData);
        });
    }
});
