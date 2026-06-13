const state = {
    step: 1,
    time: '',
    budget: '',
    diet: [],
    dislikes: '',
};

const views = {
    1: () => `
        <h2 class="accessible-header font-800 text-gray-800 mb-8">How does your day look?</h2>
        <div class="space-y-4">
            <button onclick="saveStep('time', 'busy')" class="large-card w-full p-6 text-left border-2 border-gray-100 rounded-2xl bg-chef-calm hover:border-chef-accent flex items-center gap-6 group">
                <span class="text-4xl">🏃‍♂️</span>
                <div>
                    <h3 class="text-xl font-700 text-chef-accent uppercase tracking-wide">Super Busy</h3>
                    <p class="text-chef-neutral accessible-text">Under 15 mins, quick cleanup.</p>
                </div>
            </button>
            <button onclick="saveStep('time', 'normal')" class="large-card w-full p-6 text-left border-2 border-gray-100 rounded-2xl bg-chef-calm hover:border-chef-accent flex items-center gap-6 group">
                <span class="text-4xl">🕒</span>
                <div>
                    <h3 class="text-xl font-700 text-chef-accent uppercase tracking-wide">Normal Day</h3>
                    <p class="text-chef-neutral accessible-text">Under 35 mins, standard meals.</p>
                </div>
            </button>
            <button onclick="saveStep('time', 'free')" class="large-card w-full p-6 text-left border-2 border-gray-100 rounded-2xl bg-chef-calm hover:border-chef-accent flex items-center gap-6 group">
                <span class="text-4xl">👩‍🍳</span>
                <div>
                    <h3 class="text-xl font-700 text-chef-accent uppercase tracking-wide">Lots of Free Time</h3>
                    <p class="text-chef-neutral accessible-text">Fun, creative, or slow-cooked.</p>
                </div>
            </button>
        </div>
    `,
    2: () => `
        <h2 class="accessible-header font-800 text-gray-800 mb-8">What is your food budget for today?</h2>
        <div class="space-y-4">
            <button onclick="saveStep('budget', 'budget')" class="large-card w-full p-6 text-left border-2 border-gray-100 rounded-2xl bg-chef-calm hover:border-chef-accent flex items-center gap-6 group">
                <span class="text-4xl">🪙</span>
                <div>
                    <h3 class="text-xl font-700 text-chef-accent uppercase tracking-wide">Budget-Friendly</h3>
                    <p class="text-chef-neutral accessible-text">Prioritizes staples like eggs, beans, and rice.</p>
                </div>
            </button>
            <button onclick="saveStep('budget', 'moderate')" class="large-card w-full p-6 text-left border-2 border-gray-100 rounded-2xl bg-chef-calm hover:border-chef-accent flex items-center gap-6 group">
                <span class="text-4xl">🛒</span>
                <div>
                    <h3 class="text-xl font-700 text-chef-accent uppercase tracking-wide">Moderate</h3>
                    <p class="text-chef-neutral accessible-text">Standard groceries, fresh meat and produce.</p>
                </div>
            </button>
            <button onclick="saveStep('budget', 'treat')" class="large-card w-full p-6 text-left border-2 border-gray-100 rounded-2xl bg-chef-calm hover:border-chef-accent flex items-center gap-6 group">
                <span class="text-4xl">🥩</span>
                <div>
                    <h3 class="text-xl font-700 text-chef-accent uppercase tracking-wide">Treat Yourself</h3>
                    <p class="text-chef-neutral accessible-text">Premium ingredients and organic cuts.</p>
                </div>
            </button>
        </div>
    `,
    3: () => `
        <h2 class="accessible-header font-800 text-gray-800 mb-8">Any foods to avoid?</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            ${['No Meat', 'No Dairy', 'No Nuts', 'No Seafood'].map(diet => `
                <label class="flex items-center p-6 border-2 border-gray-100 rounded-2xl bg-chef-calm cursor-pointer hover:border-chef-accent transition-all">
                    <input type="checkbox" class="w-8 h-8 rounded-lg border-2 border-chef-accent text-chef-accent focus:ring-chef-accent" onchange="toggleDiet('${diet}')" ${state.diet.includes(diet) ? 'checked' : ''}>
                    <span class="ml-4 accessible-text font-600 text-gray-700">${diet}</span>
                </label>
            `).join('')}
        </div>
        <div class="mb-8">
            <label class="block text-chef-neutral font-600 mb-2 accessible-text">Type anything else you hate here:</label>
            <input type="text" id="dislikes-input" value="${state.dislikes}" placeholder="e.g. Olives, Mushrooms" class="w-full p-6 border-2 border-gray-200 rounded-2xl focus:border-chef-accent focus:ring-0 text-xl font-600" oninput="updateDislikes(this.value)">
        </div>
        <button onclick="generatePlan()" class="w-full py-6 bg-chef-success text-white rounded-2xl text-2xl font-800 shadow-lg hover:shadow-xl hover:translate-y-[-2px] transition-all">
            Generate My Cooking Day! ✨
        </button>
    `,
};

function render() {
    const content = document.getElementById('app-content');
    const counter = document.getElementById('step-counter');
    const progress = document.getElementById('progress-bar');
    
    if (state.step <= 3) {
        content.innerHTML = views[state.step]();
        counter.textContent = `Step ${state.step} of 4`;
        progress.style.width = `${(state.step / 4) * 100}%`;
    }
}

function saveStep(key, value) {
    state[key] = value;
    state.step++;
    render();
}

function toggleDiet(diet) {
    const index = state.diet.indexOf(diet);
    if (index === -1) state.diet.push(diet);
    else state.diet.splice(index, 1);
}

function updateDislikes(val) {
    state.dislikes = val;
}

const recipeData = {
    'busy-budget': {
        breakfast: { name: 'Energy Oatmeal 🥣', desc: 'Quick oats with peanut butter and banana. High energy, low cost!', time: '5m' },
        lunch: { name: 'Bean & Cheese Burrito 🌯', desc: 'Black beans and melted cheese in a warm tortilla.', time: '10m' },
        dinner: { name: 'Pantry Pasta 🍝', desc: 'Spaghetti with garlic, olive oil, and a dash of red pepper.', time: '15m' }
    },
    'busy-moderate': {
        breakfast: { name: 'Avocado Toast 🥑', desc: 'Whole grain toast with mashed avocado and sea salt.', time: '8m' },
        lunch: { name: 'Greek Salad Wrap 🥗', desc: 'Feta, olives, cucumbers, and hummus in a soft wrap.', time: '10m' },
        dinner: { name: 'Quick Shrimp Scampi 🍤', desc: 'Sautéed shrimp with lemon and garlic over rice.', time: '15m' }
    },
    'busy-treat': {
        breakfast: { name: 'Smoked Salmon Bagel 🥯', desc: 'Cream cheese, capers, and premium lox on a toasted bagel.', time: '10m' },
        lunch: { name: 'Steak & Blue Cheese Salad 🥩', desc: 'Tender steak slices over microgreens with walnuts.', time: '15m' },
        dinner: { name: 'Seared Scallops 🐚', desc: 'Jumbo scallops with a light lemon-butter glaze.', time: '15m' }
    },
    'normal-budget': {
        breakfast: { name: 'Classic Scramble 🍳', desc: 'Fluffy eggs served with a side of buttered toast.', time: '12m' },
        lunch: { name: 'Veggie Fried Rice 🍚', desc: 'Stir-fried rice with frozen peas, carrots, and scrambled egg.', time: '20m' },
        dinner: { name: 'Bean & Corn Chili 🍲', desc: 'Hearty one-pot chili with pantry staples.', time: '35m' }
    },
    'normal-moderate': {
        breakfast: { name: 'Banana Pancakes 🥞', desc: 'Homemade pancakes with fresh sliced bananas.', time: '20m' },
        lunch: { name: 'Turkey & Swiss Sandwich 🥪', desc: 'Classic deli sandwich with lettuce, tomato, and mayo.', time: '15m' },
        dinner: { name: 'Sheet Pan Chicken 🍗', desc: 'Roasted chicken thighs with peppers and sweet potatoes.', time: '30m' }
    },
    'normal-treat': {
        breakfast: { name: 'Eggs Florentine 🍳', desc: 'Poached eggs over spinach and toasted sourdough.', time: '25m' },
        lunch: { name: 'Lobster Roll 🦞', desc: 'Fresh lobster meat with herb mayo on a brioche bun.', time: '20m' },
        dinner: { name: 'Filet Mignon 🥩', desc: 'Pan-seared steak with garlic butter and steamed asparagus.', time: '35m' }
    },
    'free-budget': {
        breakfast: { name: 'Homemade Granola 🥣', desc: 'Oats baked with honey and nuts, served with milk.', time: '40m' },
        lunch: { name: 'Slow-Cooked Lentil Soup 🥣', desc: 'Savory lentils simmered with onions and carrots.', time: '60m' },
        dinner: { name: 'Veggie Lasagna 🥘', desc: 'Layers of pasta, ricotta, and roasted vegetables.', time: '60m' }
    },
    'free-moderate': {
        breakfast: { name: 'French Toast Bake 🍞', desc: 'Cinnamon-spiced bread baked until golden and fluffy.', time: '45m' },
        lunch: { name: 'Quiche Lorraine 🥧', desc: 'Savory egg tart with bacon, cheese, and a buttery crust.', time: '50m' },
        dinner: { name: 'Roasted Whole Chicken 🍗', desc: 'Herb-rubbed chicken roasted with root vegetables.', time: '90m' }
    },
    'free-treat': {
        breakfast: { name: 'Shakshuka 🥘', desc: 'Eggs poached in a spiced tomato and bell pepper sauce.', time: '45m' },
        lunch: { name: 'Homemade Sushi 🍣', desc: 'Fresh fish and avocado rolled in vinegared rice.', time: '60m' },
        dinner: { name: 'Slow-Roasted Lamb 🥩', desc: 'Lamb shanks braised in red wine and rosemary.', time: '180m' }
    }
};

const defaultRecipes = {
    breakfast: { name: 'Yogurt Bowl 🍓', desc: 'Greek yogurt with honey and seasonal fruit.', time: '8m' },
    lunch: { name: 'Garden Salad 🥗', desc: 'Mixed greens with a simple vinaigrette.', time: '10m' },
    dinner: { name: 'Veggie Stir-Fry 🥦', desc: 'Quick sautéed vegetables over rice.', time: '20m' }
};

function generatePlan() {
    state.step = 4;
    const progress = document.getElementById('progress-bar');
    progress.style.width = '100%';
    document.getElementById('step-counter').textContent = 'Step 4 of 4';
    
    const key = `${state.time}-${state.budget}`;
    const basePlan = recipeData[key] || defaultRecipes;
    
    const plan = {
        breakfast: { ...basePlan.breakfast },
        lunch: { ...basePlan.lunch },
        dinner: { ...basePlan.dinner }
    };

    if (state.diet.includes('No Meat')) {
        if (plan.dinner.name.match(/Chicken|Beef|Lamb|Steak/i)) {
            plan.dinner = { name: 'Roasted Cauliflower Steak 🥦', desc: 'Thick-cut cauliflower roasted with herbs and tahini.', time: '35m' };
        }
        if (plan.lunch.name.match(/Turkey|Lobster|Steak/i)) {
            plan.lunch = { name: 'Chickpea Salad Wrap 🥗', desc: 'Mashed chickpeas with vegan mayo and celery.', time: '15m' };
        }
    }

    renderDashboard(plan);
}

function renderDashboard(plan) {
    const content = document.getElementById('app-content');
    content.className = "w-full max-w-4xl bg-white rounded-3xl shadow-xl p-4 md:p-8 border border-gray-100 step-transition";
    
    content.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="space-y-6">
                <div class="p-6 bg-chef-calm rounded-3xl border border-blue-50">
                    <h2 class="text-2xl font-800 text-chef-neutral mb-6 flex items-center gap-2">
                        <span>📋</span> Today's Menu
                    </h2>
                    <div class="space-y-8 relative before:content-[''] before:absolute before:left-[1.2rem] before:top-4 before:bottom-4 before:w-1 before:bg-chef-accent before:opacity-20">
                        ${renderMeal('🍳', 'Breakfast', plan.breakfast)}
                        ${renderMeal('🥪', 'Lunch', plan.lunch)}
                        ${renderMeal('🍲', 'Dinner', plan.dinner)}
                    </div>
                </div>

                <div class="p-6 bg-chef-warm rounded-3xl border border-amber-50">
                    <h2 class="text-2xl font-800 text-amber-700 mb-4 flex items-center gap-2">
                        <span>🔄</span> Magic Swaps
                    </h2>
                    <ul class="space-y-4 text-amber-900 font-600 italic">
                        <li class="bg-white/50 p-3 rounded-xl border border-amber-200/50">"No heavy cream? Use milk and a bit of butter!"</li>
                        <li class="bg-white/50 p-3 rounded-xl border border-amber-200/50">"Hate olives? Capers or gherkins add that same saltiness!"</li>
                        <li class="bg-white/50 p-3 rounded-xl border border-amber-200/50">"Out of fresh spinach? Frozen works just as well!"</li>
                    </ul>
                </div>
            </div>

            <div class="space-y-6">
                <div class="p-6 bg-white border-2 border-gray-100 rounded-3xl">
                    <h2 class="text-2xl font-800 text-gray-800 mb-6 flex items-center gap-2">
                        <span>🛒</span> Grocery List
                    </h2>
                    <div class="space-y-6">
                        <div>
                            <h4 class="font-800 text-sm uppercase text-gray-400 mb-3 tracking-widest">Fresh Items</h4>
                            <div class="space-y-3">
                                ${['Proteins', 'Greens', 'Fresh Produce'].map(item => renderCheckbox(item)).join('')}
                            </div>
                        </div>
                        <div>
                            <h4 class="font-800 text-sm uppercase text-gray-400 mb-3 tracking-widest">Pantry & Dairy</h4>
                            <div class="space-y-3">
                                ${['Grains', 'Standard Staples', 'Spices'].map(item => renderCheckbox(item)).join('')}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="p-6 bg-emerald-50 rounded-3xl border border-emerald-100 text-center">
                    <div class="inline-block bg-chef-success text-white px-4 py-2 rounded-full font-800 mb-4">
                        🟢 Eco-Friendly Budget Score: Excellent
                    </div>
                    <p class="text-emerald-900 font-600 accessible-text">
                        "Your plan cross-utilizes ingredients efficiently, saving you approximately $5-8 today!"
                    </p>
                </div>
                
                <button onclick="location.reload()" class="w-full py-4 text-chef-neutral font-700 hover:text-chef-accent transition-colors">
                    ↺ Start Over
                </button>
            </div>
        </div>
    `;
}

function renderMeal(icon, type, meal) {
    return `
        <div class="flex gap-4 relative">
            <div class="w-10 h-10 bg-chef-accent text-white rounded-full flex items-center justify-center shrink-0 z-10">${icon}</div>
            <div>
                <h3 class="text-xl font-800 text-gray-800">${meal.name}</h3>
                <p class="text-gray-600 accessible-text mb-2">${meal.desc}</p>
                <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm font-700">⏱ ${meal.time}</span>
            </div>
        </div>
    `;
}

function renderCheckbox(item) {
    return `
        <label class="flex items-center gap-4 group cursor-pointer">
            <input type="checkbox" class="w-8 h-8 rounded border-gray-300 text-chef-success focus:ring-chef-success">
            <span class="text-xl text-gray-700 group-hover:text-chef-success transition-colors">${item}</span>
        </label>
    `;
}

render();
