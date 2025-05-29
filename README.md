<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FinGuard Interactive Overview</title>
    <!-- Application Structure Plan: 
        The SPA is designed as a single-page dashboard with clear thematic sections: Dashboard Summary, Transaction Explorer, Spending Insights, and About FinGuard. 
        Navigation is handled by a header menu that shows/hides relevant sections.
        1. Dashboard Summary: Provides an immediate overview of key financial metrics (income, expenses, balance) and visual breakdowns (expense categories, income vs. expense trends). This directly addresses the "Dashboard Overview" feature of FinGuard.
        2. Transaction Explorer: Allows users to interact with a simulated transaction list, with filtering capabilities. This makes the "Income & Expense Tracking" and "Transaction History" features tangible.
        3. Spending Insights: Offers a deeper dive into spending patterns by category over selectable time periods, reflecting FinGuard's potential analytical capabilities based on "Categorization".
        4. About FinGuard: Presents information directly from the README (features, tech stack) to ground the SPA in its source.
        This structure was chosen for usability, guiding the user from a high-level overview to detailed data and insights, mimicking a logical flow for a financial tracking application. The goal is to make the information from the FinGuard README more engaging and understandable through interaction.
    -->
    <!-- Visualization & Content Choices:
        - Key Metric Cards (Total Income, Expenses, Balance): Report Info: "Dashboard Overview", "Income & Expense Tracking". Goal: Inform. Viz: Styled HTML text. Interaction: Static. Justification: Quick summary. Library: HTML/Tailwind.
        - Expense Breakdown (Donut Chart): Report Info: "Categorization", "Dashboard Overview". Goal: Inform/Compare proportions. Viz: Chart.js Donut. Interaction: Hover tooltips. Justification: Intuitive for parts-of-whole. Library: Chart.js (Canvas).
        - Income vs. Expense Trend (Line Chart): Report Info: "Income & Expense Tracking", "Dashboard Overview". Goal: Show change over time. Viz: Chart.js Line. Interaction: Hover tooltips. Justification: Best for trends. Library: Chart.js (Canvas).
        - Transaction Table & Filters: Report Info: "Transaction History", "Categorization". Goal: Organize & Explore. Viz: HTML Table + Dropdowns. Interaction: Filters update table. Justification: Standard for detailed data. Library: HTML/Tailwind, JS.
        - Spending by Category Over Time (Stacked Bar Chart): Report Info: "Categorization". Goal: Compare/Change. Viz: Chart.js Stacked Bar. Interaction: Time period buttons update chart. Justification: Good for category comparison over time. Library: Chart.js (Canvas), JS.
        - About FinGuard (Text Blocks): Report Info: "Features", "Technologies Used". Goal: Inform. Viz: Styled HTML lists/text. Interaction: Static, GitHub link. Justification: Direct from source. Library: HTML/Tailwind.
        - CONFIRMATION: NO SVG graphics used. NO Mermaid JS used.
    -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        body {
            font-family: 'Inter', sans-serif; /* Assuming Inter is a nice default, Tailwind uses system fonts */
        }
        .content-section {
            display: none; /* Hidden by default, shown by JS */
        }
        .content-section.active {
            display: block;
        }
        .nav-link {
            padding: 0.5rem 1rem;
            border-radius: 0.375rem;
            transition: background-color 0.3s ease, color 0.3s ease;
            cursor: pointer;
        }
        .nav-link.active, .nav-link:hover {
            background-color: #34D399; /* emerald-400 */
            color: white;
        }
        .chart-container {
            position: relative;
            width: 100%;
            margin-left: auto;
            margin-right: auto;
        }
        .chart-container-medium {
            height: 300px; /* Base height for small screens */
            max-height: 350px;
            max-width: 600px; /* max-w-2xl */
        }
        @media (min-width: 768px) { /* md */
            .chart-container-medium {
                height: 350px;
                max-height: 400px;
            }
        }
        .chart-container-small {
            height: 280px;
            max-height: 300px;
            max-width: 400px; /* narrower for donut */
        }
         @media (min-width: 768px) { /* md */
            .chart-container-small {
                height: 300px;
                max-height: 320px;
            }
        }

        .metric-card {
            background-color: white;
            border-radius: 0.5rem; /* rounded-lg */
            padding: 1.5rem; /* p-6 */
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* shadow-md */
            text-align: center;
        }
        .table th, .table td {
            padding: 0.75rem; /* p-3 */
            text-align: left;
            border-bottom: 1px solid #E5E7EB; /* border-gray-200 */
        }
        .table th {
            background-color: #F3F4F6; /* bg-gray-100 */
            font-weight: 600; /* font-semibold */
        }
        .filter-button {
             background-color: #A7F3D0; /* emerald-200 */
             color: #065F46; /* emerald-800 */
             padding: 0.5rem 1rem;
             border-radius: 0.375rem;
             margin-right: 0.5rem;
             font-size: 0.875rem;
             transition: background-color 0.2s;
        }
        .filter-button.active, .filter-button:hover {
            background-color: #34D399; /* emerald-400 */
            color: white;
        }
    </style>
</head>
<body class="bg-slate-100 text-slate-700 antialiased">

    <header class="bg-slate-800 text-white shadow-lg">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <h1 class="text-2xl font-bold">FinGuard Interactive Overview</h1>
                <nav class="flex space-x-2 sm:space-x-4">
                    <a href="#dashboard" data-section="dashboard" class="nav-link active">📊 Dashboard</a>
                    <a href="#transactions" data-section="transactions" class="nav-link">💳 Transactions</a>
                    <a href="#insights" data-section="insights" class="nav-link">💡 Insights</a>
                    <a href="#about" data-section="about" class="nav-link">ℹ️ About</a>
                </nav>
            </div>
        </div>
    </header>

    <main class="container mx-auto p-4 sm:p-6 lg:p-8">
        <section id="dashboard" class="content-section active">
            <div class="mb-6 p-4 bg-white rounded-lg shadow">
                <h2 class="text-2xl font-semibold text-slate-700 mb-2">Dashboard Summary</h2>
                <p class="text-slate-600">
                    This section provides a high-level overview of your financial health, summarizing key metrics typically managed by the FinGuard application.
                    Interact with the charts by hovering over data points to see details. This visual summary helps in quickly understanding your financial standing, reflecting the "Dashboard Overview" feature of FinGuard.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div class="metric-card">
                    <h3 class="text-lg font-semibold text-emerald-600 mb-1">Total Income</h3>
                    <p id="totalIncome" class="text-3xl font-bold text-slate-800">$0.00</p>
                    <p class="text-xs text-slate-500 mt-1">Last 30 days</p>
                </div>
                <div class="metric-card">
                    <h3 class="text-lg font-semibold text-red-500 mb-1">Total Expenses</h3>
                    <p id="totalExpenses" class="text-3xl font-bold text-slate-800">$0.00</p>
                    <p class="text-xs text-slate-500 mt-1">Last 30 days</p>
                </div>
                <div class="metric-card">
                    <h3 class="text-lg font-semibold text-sky-600 mb-1">Net Balance</h3>
                    <p id="netBalance" class="text-3xl font-bold text-slate-800">$0.00</p>
                     <p class="text-xs text-slate-500 mt-1">Current Savings/Deficit</p>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="bg-white p-4 sm:p-6 rounded-lg shadow">
                    <h3 class="text-xl font-semibold text-slate-700 mb-1">Expense Breakdown</h3>
                    <p class="text-sm text-slate-500 mb-3">Distribution of expenses by category for the current period. Hover over segments for details. This reflects FinGuard's "Categorization" feature.</p>
                    <div class="chart-container chart-container-small mx-auto">
                        <canvas id="expenseDonutChart"></canvas>
                    </div>
                </div>
                <div class="bg-white p-4 sm:p-6 rounded-lg shadow">
                    <h3 class="text-xl font-semibold text-slate-700 mb-1">Income vs. Expense Trend</h3>
                     <p class="text-sm text-slate-500 mb-3">Monthly trend of income and expenses. Hover over points for specific values. This illustrates "Income & Expense Tracking" over time.</p>
                    <div class="chart-container chart-container-medium">
                        <canvas id="incomeExpenseLineChart"></canvas>
                    </div>
                </div>
            </div>
        </section>

        <section id="transactions" class="content-section">
            <div class="mb-6 p-4 bg-white rounded-lg shadow">
                <h2 class="text-2xl font-semibold text-slate-700 mb-2">Transaction Explorer</h2>
                <p class="text-slate-600">
                    Explore and filter your financial transactions. Use the dropdowns to filter by type (Income/Expense) or category.
                    This simulates how users might interact with their detailed "Transaction History" in FinGuard, leveraging its "Categorization" for better organization.
                </p>
            </div>

            <div class="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
                <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
                    <div>
                        <label for="filterType" class="block text-sm font-medium text-slate-700 mb-1">Filter by Type:</label>
                        <select id="filterType" class="block w-full sm:w-auto p-2 border border-slate-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500">
                            <option value="all">All Types</option>
                            <option value="Income">Income</option>
                            <option value="Expense">Expense</option>
                        </select>
                    </div>
                    <div>
                        <label for="filterCategory" class="block text-sm font-medium text-slate-700 mb-1">Filter by Category:</label>
                        <select id="filterCategory" class="block w-full sm:w-auto p-2 border border-slate-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500">
                            <option value="all">All Categories</option>
                        </select>
                    </div>
                </div>
                <div class="overflow-x-auto">
                    <table class="min-w-full table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Description</th>
                                <th>Category</th>
                                <th>Type</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody id="transactionTableBody">
                        </tbody>
                    </table>
                </div>
                 <p id="noTransactionsMessage" class="text-center text-slate-500 py-4 hidden">No transactions match your filters.</p>
            </div>
        </section>

        <section id="insights" class="content-section">
            <div class="mb-6 p-4 bg-white rounded-lg shadow">
                <h2 class="text-2xl font-semibold text-slate-700 mb-2">Spending Insights</h2>
                <p class="text-slate-600">
                    Gain deeper insights into your spending patterns across different categories over time.
                    Use the buttons to change the time period for the chart. This section reflects FinGuard's potential analytical capabilities based on its "Categorization" feature, helping you understand where your money goes.
                </p>
            </div>
             <div class="bg-white p-4 sm:p-6 rounded-lg shadow">
                <h3 class="text-xl font-semibold text-slate-700 mb-2">Spending by Category Over Time</h3>
                <div class="mb-4">
                    <button data-period="3" class="filter-button active time-period-btn">Last 3 Months</button>
                    <button data-period="6" class="filter-button time-period-btn">Last 6 Months</button>
                    <button data-period="12" class="filter-button time-period-btn">Last 12 Months</button>
                </div>
                <div class="chart-container chart-container-medium">
                    <canvas id="spendingStackedBarChart"></canvas>
                </div>
            </div>
        </section>

        <section id="about" class="content-section">
            <div class="mb-6 p-4 bg-white rounded-lg shadow">
                <h2 class="text-2xl font-semibold text-slate-700 mb-2">About FinGuard</h2>
                <p class="text-slate-600">
                    This section provides information about the FinGuard project, its features, and the technologies used, as derived from its project README.
                    FinGuard aims to be a comprehensive tool for personal finance management.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-white p-6 rounded-lg shadow">
                    <h3 class="text-xl font-semibold text-slate-700 mb-3">Key Features</h3>
                    <ul id="featuresList" class="list-disc list-inside space-y-2 text-slate-600">
                    </ul>
                </div>
                <div class="bg-white p-6 rounded-lg shadow">
                    <h3 class="text-xl font-semibold text-slate-700 mb-3">Technologies Used</h3>
                    <div id="technologiesDiv" class="space-y-3">
                    </div>
                </div>
            </div>
            <div class="mt-8 text-center">
                 <a href="https://github.com/lovesharma2005/FinGuard-" target="_blank" rel="noopener noreferrer" class="inline-block bg-slate-700 hover:bg-slate-800 text-white font-semibold py-3 px-6 rounded-lg shadow transition-colors">
                    🔗 View on GitHub
                </a>
                <p class="text-sm text-slate-500 mt-2">Explore the source code and contribute to the FinGuard project.</p>
            </div>
        </section>
    </main>

    <footer class="text-center py-8 text-sm text-slate-500 border-t border-slate-200 mt-12">
        <p>&copy; <span id="currentYear"></span> FinGuard Interactive Overview. Inspired by the FinGuard Project.</p>
        <p>This is a conceptual dashboard for demonstration purposes.</p>
    </footer>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const currentYear = new Date().getFullYear();
            document.getElementById('currentYear').textContent = currentYear;

            const navLinks = document.querySelectorAll('.nav-link');
            const contentSections = document.querySelectorAll('.content-section');

            function setActiveSection(sectionId) {
                contentSections.forEach(section => {
                    section.classList.remove('active');
                    if (section.id === sectionId) {
                        section.classList.add('active');
                    }
                });
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.dataset.section === sectionId) {
                        link.classList.add('active');
                    }
                });
                window.location.hash = sectionId;
            }
            
            navLinks.forEach(link => {
                link.addEventListener('click', (event) => {
                    event.preventDefault();
                    const sectionId = link.dataset.section;
                    setActiveSection(sectionId);
                });
            });

            const initialSection = window.location.hash ? window.location.hash.substring(1) : 'dashboard';
            const validInitialSection = Array.from(navLinks).some(link => link.dataset.section === initialSection) ? initialSection : 'dashboard';
            setActiveSection(validInitialSection);


            const sampleTransactions = [
                { date: '2024-05-01', description: 'Salary Deposit', category: 'Income', type: 'Income', amount: 3000 },
                { date: '2024-05-01', description: 'Rent Payment', category: 'Housing', type: 'Expense', amount: 1200 },
                { date: '2024-05-02', description: 'Groceries', category: 'Food', type: 'Expense', amount: 150 },
                { date: '2024-05-03', description: 'Freelance Project A', category: 'Income', type: 'Income', amount: 500 },
                { date: '2024-05-05', description: 'Dinner Out', category: 'Food', type: 'Expense', amount: 60 },
                { date: '2024-05-07', description: 'Internet Bill', category: 'Utilities', type: 'Expense', amount: 70 },
                { date: '2024-05-10', description: 'Movie Tickets', category: 'Entertainment', type: 'Expense', amount: 30 },
                { date: '2024-05-12', description: 'Client B Payment', category: 'Income', type: 'Income', amount: 750 },
                { date: '2024-05-15', description: 'Transport Card Top-up', category: 'Transport', type: 'Expense', amount: 50 },
                { date: '2024-05-18', description: 'Gym Membership', category: 'Health', type: 'Expense', amount: 40 },
                { date: '2024-05-20', description: 'Book Purchase', category: 'Entertainment', type: 'Expense', amount: 25 },
                { date: '2024-05-22', description: 'Electricity Bill', category: 'Utilities', type: 'Expense', amount: 80 },
                { date: '2024-05-25', description: 'Savings Deposit', category: 'Savings', type: 'Expense', amount: 200 },
                { date: '2024-05-28', description: 'Birthday Gift', category: 'Gifts', type: 'Expense', amount: 50 },
            ];

            const categories = ['Housing', 'Food', 'Utilities', 'Entertainment', 'Transport', 'Health', 'Savings', 'Gifts', 'Income'];
            const filterCategorySelect = document.getElementById('filterCategory');
            categories.forEach(cat => {
                if (cat !== 'Income') { // Assuming 'Income' category is for income type only
                    const option = document.createElement('option');
                    option.value = cat;
                    option.textContent = cat;
                    filterCategorySelect.appendChild(option);
                }
            });

            let expenseDonutChartInstance, incomeExpenseLineChartInstance, spendingStackedBarChartInstance;

            function formatCurrency(amount) {
                return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
            }
            
            function wrapTicks(label, maxLength = 16) {
                if (typeof label !== 'string') return label;
                if (label.length <= maxLength) return label;
                const words = label.split(' ');
                let currentLine = '';
                const lines = [];
                for (const word of words) {
                    if ((currentLine + word).length > maxLength && currentLine.length > 0) {
                        lines.push(currentLine.trim());
                        currentLine = '';
                    }
                    currentLine += word + ' ';
                }
                if (currentLine) lines.push(currentLine.trim());
                return lines;
            }


            function updateDashboardSummary() {
                const totalIncome = sampleTransactions.filter(t => t.type === 'Income').reduce((sum, t) => sum + t.amount, 0);
                const totalExpenses = sampleTransactions.filter(t => t.type === 'Expense').reduce((sum, t) => sum + t.amount, 0);
                const netBalance = totalIncome - totalExpenses;

                document.getElementById('totalIncome').textContent = formatCurrency(totalIncome);
                document.getElementById('totalExpenses').textContent = formatCurrency(totalExpenses);
                document.getElementById('netBalance').textContent = formatCurrency(netBalance);
                
                const balanceElement = document.getElementById('netBalance');
                balanceElement.classList.toggle('text-red-500', netBalance < 0);
                balanceElement.classList.toggle('text-emerald-600', netBalance >= 0 && !balanceElement.classList.contains('text-red-500'));


                const expenseData = sampleTransactions.filter(t => t.type === 'Expense')
                    .reduce((acc, curr) => {
                        acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
                        return acc;
                    }, {});

                const expenseLabels = Object.keys(expenseData);
                const expenseValues = Object.values(expenseData);
                
                const donutColors = ['#34D399', '#F87171', '#60A5FA', '#FBBF24', '#A78BFA', '#EC4899', '#22D3EE', '#818CF8'];

                if (expenseDonutChartInstance) expenseDonutChartInstance.destroy();
                expenseDonutChartInstance = new Chart(document.getElementById('expenseDonutChart'), {
                    type: 'doughnut',
                    data: {
                        labels: expenseLabels,
                        datasets: [{
                            data: expenseValues,
                            backgroundColor: donutColors.slice(0, expenseLabels.length),
                            borderColor: '#FFFFFF',
                            borderWidth: 2
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { position: 'bottom', labels: { boxWidth: 12, padding: 15, font: {size: 10 } } },
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        let label = context.label || '';
                                        if (label) label += ': ';
                                        if (context.parsed !== null) {
                                            label += formatCurrency(context.parsed);
                                        }
                                        return label;
                                    }
                                }
                            }
                        },
                        cutout: '60%'
                    }
                });

                const monthlyTrend = {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    income: [1500, 1800, 2200, 2000, 3500, 3200],
                    expenses: [1000, 1100, 1300, 1250, 1800, 1700]
                };
                if (incomeExpenseLineChartInstance) incomeExpenseLineChartInstance.destroy();
                incomeExpenseLineChartInstance = new Chart(document.getElementById('incomeExpenseLineChart'), {
                    type: 'line',
                    data: {
                        labels: monthlyTrend.labels,
                        datasets: [
                            {
                                label: 'Income',
                                data: monthlyTrend.income,
                                borderColor: '#34D399', // emerald-400
                                backgroundColor: 'rgba(52, 211, 153, 0.1)',
                                tension: 0.3,
                                fill: true
                            },
                            {
                                label: 'Expenses',
                                data: monthlyTrend.expenses,
                                borderColor: '#F87171', // red-400
                                backgroundColor: 'rgba(248, 113, 113, 0.1)',
                                tension: 0.3,
                                fill: true
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: { 
                            y: { beginAtZero: true, ticks: { callback: value => formatCurrency(value) } },
                            x: { grid: { display: false } }
                        },
                        plugins: {
                            legend: { position: 'top' },
                            tooltip: { mode: 'index', intersect: false, callbacks: { label: ctx => `${ctx.dataset.label}: ${formatCurrency(ctx.parsed.y)}` } }
                        }
                    }
                });
            }

            function renderTransactions(transactionsToRender) {
                const tableBody = document.getElementById('transactionTableBody');
                const noTransactionsMessage = document.getElementById('noTransactionsMessage');
                tableBody.innerHTML = '';
                if (transactionsToRender.length === 0) {
                    noTransactionsMessage.classList.remove('hidden');
                    return;
                }
                noTransactionsMessage.classList.add('hidden');

                transactionsToRender.forEach(t => {
                    const row = tableBody.insertRow();
                    row.insertCell().textContent = t.date;
                    row.insertCell().textContent = t.description;
                    row.insertCell().textContent = t.category;
                    const typeCell = row.insertCell();
                    typeCell.textContent = t.type;
                    typeCell.className = t.type === 'Income' ? 'text-emerald-600 font-medium' : 'text-red-500 font-medium';
                    const amountCell = row.insertCell();
                    amountCell.textContent = formatCurrency(t.amount);
                    amountCell.className = 'font-medium';
                });
            }

            function filterTransactions() {
                const typeFilter = document.getElementById('filterType').value;
                const categoryFilter = document.getElementById('filterCategory').value;
                const filtered = sampleTransactions.filter(t => {
                    const typeMatch = typeFilter === 'all' || t.type === typeFilter;
                    const categoryMatch = categoryFilter === 'all' || t.category === categoryFilter;
                    return typeMatch && categoryMatch;
                });
                renderTransactions(filtered);
            }
            document.getElementById('filterType').addEventListener('change', filterTransactions);
            document.getElementById('filterCategory').addEventListener('change', filterTransactions);
            

            function updateSpendingInsights(months = 3) {
                const monthLabels = ['May', 'Apr', 'Mar', 'Feb', 'Jan', 'Dec', 'Nov', 'Oct', 'Sep', 'Aug', 'Jul', 'Jun'].slice(0, months).reverse();
                
                const expenseCategories = ['Housing', 'Food', 'Utilities', 'Entertainment', 'Transport', 'Health'];
                const datasets = expenseCategories.map((cat, index) => {
                    return {
                        label: cat,
                        data: Array(months).fill(0).map(() => Math.floor(Math.random() * (cat === 'Housing' ? 500 : 200)) + (cat === 'Housing' ? 800: 50) ), // Random data for demo
                        backgroundColor: ['#EF4444', '#F97316', '#FACC15', '#4ADE80', '#22D3EE', '#A855F7'][index % 6], // Muted but distinct colors
                    };
                });

                if (spendingStackedBarChartInstance) spendingStackedBarChartInstance.destroy();
                spendingStackedBarChartInstance = new Chart(document.getElementById('spendingStackedBarChart'), {
                    type: 'bar',
                    data: {
                        labels: monthLabels,
                        datasets: datasets
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            x: { stacked: true, grid: { display: false } },
                            y: { stacked: true, beginAtZero: true, ticks: { callback: value => formatCurrency(value) } }
                        },
                        plugins: {
                            legend: { position: 'bottom', labels: { boxWidth: 12, padding: 15, font: {size: 10 },  formatter: wrapTicks } },
                            tooltip: { 
                                mode: 'index', 
                                intersect: false,
                                callbacks: {
                                    label: function(context) {
                                        let label = context.dataset.label || '';
                                        if (label) label = wrapTicks(label, 20).join(' '); // Wrap label in tooltip if long
                                        if (label) label += ': ';
                                        if (context.parsed.y !== null) {
                                            label += formatCurrency(context.parsed.y);
                                        }
                                        return label;
                                    }
                                }
                            }
                        }
                    }
                });
            }

            document.querySelectorAll('.time-period-btn').forEach(button => {
                button.addEventListener('click', (event) => {
                    document.querySelectorAll('.time-period-btn').forEach(btn => btn.classList.remove('active'));
                    event.target.classList.add('active');
                    updateSpendingInsights(parseInt(event.target.dataset.period));
                });
            });

            function populateAboutSection() {
                const features = [
                    "Income & Expense Tracking: Easily record all your financial transactions.",
                    "Categorization: Organize transactions into custom categories.",
                    "Dashboard Overview: Quick snapshot of your financial status.",
                    "Transaction History: Detailed list of past transactions.",
                    "Responsive Design: Access on various devices.",
                    "Secure Data Handling: (Assumed standard practices)."
                ];
                const featuresListEl = document.getElementById('featuresList');
                features.forEach(featureText => {
                    const li = document.createElement('li');
                    li.textContent = featureText;
                    featuresListEl.appendChild(li);
                });

                const technologies = [
                    { name: "Frontend", items: ["React.js", "HTML", "CSS/Tailwind CSS"] },
                    { name: "Backend", items: ["Node.js", "Express.js", "MongoDB"] }
                ];
                const techDivEl = document.getElementById('technologiesDiv');
                technologies.forEach(techGroup => {
                    const groupTitle = document.createElement('h4');
                    groupTitle.className = "text-md font-semibold text-emerald-700";
                    groupTitle.textContent = techGroup.name;
                    techDivEl.appendChild(groupTitle);

                    const ul = document.createElement('ul');
                    ul.className = "list-disc list-inside space-y-1 text-sm text-slate-600 pl-4";
                    techGroup.items.forEach(item => {
                        const li = document.createElement('li');
                        li.textContent = item;
                        ul.appendChild(li);
                    });
                    techDivEl.appendChild(ul);
                });
            }

            updateDashboardSummary();
            renderTransactions(sampleTransactions);
            updateSpendingInsights(); 
            populateAboutSection();
        });
    </script>
</body>
</html>
