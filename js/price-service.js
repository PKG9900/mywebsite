// 价格查询服务
class PriceService {
    constructor() {
        this.priceData = [
            { name: '猴年纪念邮票', year: 2016, grade: '全品相', price: 128.00, trend: 5.2 },
            { name: '第二轮生肖羊票', year: 2003, grade: '上品', price: 86.00, trend: -2.1 },
            { name: '熊猫银币', year: 2020, grade: '全新', price: 268.00, trend: 3.8 },
            { name: '长城纪念币', year: 2018, grade: '全品相', price: 45.00, trend: 0.0 }
        ];
    }
    
    // 搜索价格
    searchPrice(keyword) {
        keyword = keyword.toLowerCase().trim();
        
        if (!keyword) {
            return this.priceData;
        }
        
        return this.priceData.filter(item => 
            item.name.toLowerCase().includes(keyword) ||
            item.year.toString().includes(keyword)
        );
    }
    
    // 格式化价格显示
    formatPrice(price) {
        return `¥${price.toFixed(2)}`;
    }
    
    // 格式化涨跌幅
    formatTrend(trend) {
        if (trend > 0) {
            return `↑ ${trend.toFixed(1)}%`;
        } else if (trend < 0) {
            return `↓ ${Math.abs(trend).toFixed(1)}%`;
        } else {
            return `— 0.0%`;
        }
    }
    
    // 获取趋势样式
    getTrendClass(trend) {
        if (trend > 0) return 'trend-up';
        if (trend < 0) return 'trend-down';
        return 'trend-flat';
    }
}

// 初始化价格查询
document.addEventListener('DOMContentLoaded', function() {
    const priceService = new PriceService();
    const searchInput = document.querySelector('#searchInput');
    const searchButton = document.querySelector('.btn-search');
    const resultsContainer = document.querySelector('#priceResults');
    
    // 渲染搜索结果
    function renderResults(data) {
        if (!resultsContainer) return;
        
        if (data.length === 0) {
            resultsContainer.innerHTML = '<p class="no-results">未找到相关邮币信息</p>';
            return;
        }
        
        let html = '<div class="price-table"><table><thead><tr><th>邮币名称</th><th>年份</th><th>品相</th><th>价格</th><th>趋势</th></tr></thead><tbody>';
        
        data.forEach(item => {
            html += `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.year}</td>
                    <td>${item.grade}</td>
                    <td>${priceService.formatPrice(item.price)}</td>
                    <td class="price-trend ${priceService.getTrendClass(item.trend)}">
                        ${priceService.formatTrend(item.trend)}
                    </td>
                </tr>
            `;
        });
        
        html += '</tbody></table></div>';
        resultsContainer.innerHTML = html;
    }
    
    // 搜索事件
    function handleSearch() {
        const keyword = searchInput.value;
        const results = priceService.searchPrice(keyword);
        renderResults(results);
    }
    
    // 绑定事件
    if (searchButton) {
        searchButton.addEventListener('click', handleSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }
    
    // 初始渲染
    renderResults(priceService.priceData);
});
