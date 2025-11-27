// Toggle de campos condicionais
document.addEventListener('DOMContentLoaded', function() {
    // Percentual de gordura
    const knowBodyFat = document.querySelectorAll('input[name="knowBodyFat"]');
    const bodyFatGroup = document.getElementById('bodyFatGroup');

    knowBodyFat.forEach(radio => {
        radio.addEventListener('change', function() {
            bodyFatGroup.style.display = this.value === 'yes' ? 'block' : 'none';
        });
    });

    // Musculação
    const weightTraining = document.querySelectorAll('input[name="weightTraining"]');
    const weightTrainingFreq = document.getElementById('weightTrainingFreq');

    weightTraining.forEach(radio => {
        radio.addEventListener('change', function() {
            weightTrainingFreq.style.display = this.value === 'yes' ? 'block' : 'none';
        });
    });

    // Cardio
    const cardio = document.querySelectorAll('input[name="cardio"]');
    const cardioFreq = document.getElementById('cardioFreq');

    cardio.forEach(radio => {
        radio.addEventListener('change', function() {
            cardioFreq.style.display = this.value === 'yes' ? 'block' : 'none';
        });
    });

    // Método de macros
    const macroMethod = document.querySelectorAll('input[name="macroMethod"]');
    const gramsMethod = document.getElementById('gramsMethod');
    const percentageMethod = document.getElementById('percentageMethod');

    macroMethod.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'grams') {
                gramsMethod.style.display = 'block';
                percentageMethod.style.display = 'none';
            } else {
                gramsMethod.style.display = 'none';
                percentageMethod.style.display = 'block';
            }
        });
    });

    // Proteína personalizada
    const proteinSelect = document.getElementById('protein');
    const proteinCustom = document.getElementById('proteinCustom');

    proteinSelect.addEventListener('change', function() {
        proteinCustom.style.display = this.value === 'custom' ? 'block' : 'none';
    });

    // Gordura personalizada
    const fatSelect = document.getElementById('fat');
    const fatCustom = document.getElementById('fatCustom');

    fatSelect.addEventListener('change', function() {
        fatCustom.style.display = this.value === 'custom' ? 'block' : 'none';
    });

    // Déficit personalizado
    const deficitSelect = document.getElementById('deficit');
    const deficitCustom = document.getElementById('deficitCustom');

    deficitSelect.addEventListener('change', function() {
        deficitCustom.style.display = this.value === 'custom' ? 'block' : 'none';
    });

    // Mostrar/ocultar déficit baseado no objetivo
    const goalRadios = document.querySelectorAll('input[name="goal"]');
    const deficitGroup = document.getElementById('deficitGroup');

    function updateDeficitVisibility() {
        const selectedGoal = document.querySelector('input[name="goal"]:checked');
        
        if (!selectedGoal) return;
        
        if (selectedGoal.value !== 'maintain') {
            deficitGroup.style.display = 'block';
            
            // Atualizar label baseado no objetivo
            const deficitLabel = document.querySelector('#deficitGroup label');
            if (selectedGoal.value === 'cut') {
                deficitLabel.textContent = 'Déficit calórico desejado (kcal/dia)';
            } else if (selectedGoal.value === 'bulk') {
                deficitLabel.textContent = 'Superávit calórico desejado (kcal/dia)';
            }
        } else {
            deficitGroup.style.display = 'none';
        }
    }

    goalRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            updateDeficitVisibility();
        });
    });

    // Verificar estado inicial ao carregar a página
    updateDeficitVisibility();
    
    // Carregar dados da URL ou localStorage
    loadFromURL();

    // Form submit
    const form = document.getElementById('calculatorForm');
    form.addEventListener('submit', calculateMacros);
});

function calculateMacros(e) {
    e.preventDefault();

    // Obter valores do formulário
    const formData = {
        gender: document.querySelector('input[name="gender"]:checked').value,
        age: parseInt(document.getElementById('age').value),
        weight: parseFloat(document.getElementById('weight').value),
        height: parseInt(document.getElementById('height').value),
        knowBodyFat: document.querySelector('input[name="knowBodyFat"]:checked').value,
        bodyFat: document.getElementById('bodyFat').value,
        activityLevel: parseFloat(document.getElementById('activityLevel').value),
        weightTraining: document.querySelector('input[name="weightTraining"]:checked').value,
        trainingDays: parseInt(document.getElementById('trainingDays').value),
        cardio: document.querySelector('input[name="cardio"]:checked').value,
        cardioDays: parseInt(document.getElementById('cardioDays').value),
        goal: document.querySelector('input[name="goal"]:checked').value,
        deficit: document.getElementById('deficit').value,
        deficitCustom: document.getElementById('deficitCustom').value,
        macroMethod: document.querySelector('input[name="macroMethod"]:checked').value,
        protein: document.getElementById('protein').value,
        proteinCustom: document.getElementById('proteinCustom').value,
        fat: document.getElementById('fat').value,
        fatCustom: document.getElementById('fatCustom').value,
        proteinPercent: document.getElementById('proteinPercent').value,
        fatPercent: document.getElementById('fatPercent').value,
        carbPercent: document.getElementById('carbPercent').value,
        meals: parseInt(document.getElementById('meals').value),
        bmrFormula: document.querySelector('input[name="bmrFormula"]:checked').value
    };
    
    // Salvar no localStorage
    localStorage.setItem('calculatorData', JSON.stringify(formData));
    
    // Atualizar URL
    updateURL(formData);

    const gender = formData.gender;
    const age = formData.age;
    const weight = formData.weight;
    const height = formData.height;
    const activityLevel = formData.activityLevel;
    const goal = formData.goal;
    const macroMethod = formData.macroMethod;
    const meals = formData.meals;

    // Verificar se tem percentual de gordura
    const knowBodyFat = document.querySelector('input[name="knowBodyFat"]:checked').value;
    let bmr;
    let bmrFormula;
    let leanMass = 0;
    let fatMass = 0;
    let bodyFatPercent = 0;
    
    if (knowBodyFat === 'yes') {
        // Usar fórmula Katch-McArdle (mais precisa com BF%)
        bodyFatPercent = parseFloat(document.getElementById('bodyFat').value);
        fatMass = weight * (bodyFatPercent / 100);
        leanMass = weight - fatMass;
        bmr = 370 + (21.6 * leanMass);
        bmrFormula = `370 + (21.6 × ${leanMass.toFixed(1)} kg de massa magra)`;
    } else {
        // Escolher fórmula TMB (Mifflin-St Jeor ou Harris-Benedict)
        const formulaChoice = document.querySelector('input[name="bmrFormula"]:checked').value;
        
        if (formulaChoice === 'harris') {
            // Harris-Benedict
            if (gender === 'male') {
                bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
                bmrFormula = `88.362 + (13.397 × ${weight}) + (4.799 × ${height}) - (5.677 × ${age})`;
            } else {
                bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
                bmrFormula = `447.593 + (9.247 × ${weight}) + (3.098 × ${height}) - (4.330 × ${age})`;
            }
        } else {
            // Mifflin-St Jeor (padrão)
            if (gender === 'male') {
                bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
                bmrFormula = `(10 × ${weight}) + (6.25 × ${height}) - (5 × ${age}) + 5`;
            } else {
                bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
                bmrFormula = `(10 × ${weight}) + (6.25 × ${height}) - (5 × ${age}) - 161`;
            }
        }
    }

    // Calcular TDEE (Total Daily Energy Expenditure)
    let tdee = bmr * activityLevel;
    let tdeeFormula = `${Math.round(bmr)} × ${activityLevel}`;
    let tdeeDetails = '';

    // Ajustar para musculação (ajuste mais conservador)
    const weightTraining = document.querySelector('input[name="weightTraining"]:checked').value;
    if (weightTraining === 'yes') {
        const trainingDays = parseInt(document.getElementById('trainingDays').value);
        const trainingAdjustment = trainingDays * 30;
        tdee += trainingAdjustment;
        tdeeDetails += ` + ${trainingAdjustment} kcal (musculação)`;
    }

    // Ajustar para cardio (ajuste mais conservador)
    const cardio = document.querySelector('input[name="cardio"]:checked').value;
    if (cardio === 'yes') {
        const cardioDays = parseInt(document.getElementById('cardioDays').value);
        const cardioAdjustment = cardioDays * 70;
        tdee += cardioAdjustment;
        tdeeDetails += ` + ${cardioAdjustment} kcal (cardio)`;
    }
    
    if (tdeeDetails) {
        tdeeFormula += tdeeDetails;
    }

    // Ajustar calorias baseado no objetivo
    let targetCalories;
    let adjustmentFormula = '';
    let adjustmentDescription = '';
    
    if (goal === 'cut') {
        // Obter déficit personalizado
        let deficitValue = parseFloat(document.getElementById('deficit').value);
        if (deficitValue === 0 || isNaN(deficitValue)) {
            deficitValue = parseFloat(document.getElementById('deficitCustom').value) || 500;
        }
        targetCalories = tdee - deficitValue;
        adjustmentFormula = `${Math.round(tdee)} - ${deficitValue}`;
        adjustmentDescription = `Déficit de ${deficitValue} kcal/dia para perda de gordura`;
    } else if (goal === 'bulk') {
        // Obter superávit personalizado
        let surplusValue = parseFloat(document.getElementById('deficit').value);
        if (surplusValue === 0 || isNaN(surplusValue)) {
            surplusValue = parseFloat(document.getElementById('deficitCustom').value) || 500;
        }
        targetCalories = tdee + surplusValue;
        adjustmentFormula = `${Math.round(tdee)} + ${surplusValue}`;
        adjustmentDescription = `Superávit de ${surplusValue} kcal/dia para ganho de massa`;
    } else {
        targetCalories = tdee; // Manutenção
        adjustmentDescription = 'Manutenção (sem ajuste)';
    }

    // Calcular macros
    let proteinGrams, fatGrams, carbGrams;

    if (macroMethod === 'grams') {
        // Método gramas por kg
        let proteinPerKg = parseFloat(document.getElementById('protein').value);
        if (proteinPerKg === 0 || isNaN(proteinPerKg)) {
            proteinPerKg = parseFloat(document.getElementById('proteinCustom').value);
        }

        let fatPerKg = parseFloat(document.getElementById('fat').value);
        if (fatPerKg === 0 || isNaN(fatPerKg)) {
            fatPerKg = parseFloat(document.getElementById('fatCustom').value);
        }

        proteinGrams = weight * proteinPerKg;
        fatGrams = weight * fatPerKg;

        // Calorias de proteína e gordura
        const proteinCalories = proteinGrams * 4;
        const fatCalories = fatGrams * 9;

        // Carboidratos com as calorias restantes
        const carbCalories = targetCalories - proteinCalories - fatCalories;
        carbGrams = carbCalories / 4;

    } else {
        // Método porcentagem
        const proteinPercent = parseFloat(document.getElementById('proteinPercent').value) / 100;
        const fatPercent = parseFloat(document.getElementById('fatPercent').value) / 100;
        const carbPercent = parseFloat(document.getElementById('carbPercent').value) / 100;

        proteinGrams = (targetCalories * proteinPercent) / 4;
        fatGrams = (targetCalories * fatPercent) / 9;
        carbGrams = (targetCalories * carbPercent) / 4;
    }

    // Validações nutricionais
    const warnings = [];
    const proteinPerKg = proteinGrams / weight;
    const fatPerKg = fatGrams / weight;
    
    if (goal === 'cut' && proteinPerKg < 1.8) {
        warnings.push('⚠️ Em cutting, sugere-se no mínimo 1.8g de proteína por kg para preservar massa muscular. Consulte um nutricionista.');
    }
    
    if (fatPerKg < 0.5) {
        warnings.push('⚠️ Gordura muito baixa pode afetar produção hormonal. Mínimo sugerido: 0.5g/kg. Consulte um nutricionista.');
    }
    
    const deficitPercent = goal === 'cut' ? ((tdee - targetCalories) / tdee * 100) : 0;
    if (deficitPercent > 25) {
        warnings.push('⚠️ Déficit muito agressivo (>' + Math.round(deficitPercent) + '%). Pode causar perda de massa muscular e fadiga.');
    }
    
    if (goal === 'bulk') {
        const surplusPercent = ((targetCalories - tdee) / tdee * 100);
        if (surplusPercent > 15) {
            warnings.push('⚠️ Superávit muito alto pode resultar em ganho excessivo de gordura.');
        }
    }
    
    // Calcular hidratação e fibras
    const waterIntake = Math.round(weight * 35); // 35ml por kg
    const fiberIntake = Math.round(14 * (targetCalories / 1000)); // 14g por 1000 kcal
    
    // Exibir resultados
    displayResults(
        targetCalories, 
        proteinGrams, 
        carbGrams, 
        fatGrams, 
        meals,
        {
            bmr: bmr,
            bmrFormula: bmrFormula,
            tdee: tdee,
            tdeeFormula: tdeeFormula,
            adjustmentFormula: adjustmentFormula,
            adjustmentDescription: adjustmentDescription,
            gender: gender === 'male' ? 'Masculino' : 'Feminino',
            leanMass: leanMass,
            fatMass: fatMass,
            bodyFat: bodyFatPercent,
            warnings: warnings,
            waterIntake: waterIntake,
            fiberIntake: fiberIntake,
            weight: weight,
            goal: goal
        }
    );
}

function displayResults(calories, protein, carbs, fat, meals, equations) {
    // Arredondar valores
    calories = Math.round(calories);
    protein = Math.round(protein);
    carbs = Math.round(carbs);
    fat = Math.round(fat);

    // Exibir equações
    document.getElementById('bmrEquation').textContent = `${equations.gender}: ${equations.bmrFormula}`;
    document.getElementById('bmrResult').textContent = `${Math.round(equations.bmr)} kcal/dia`;
    
    document.getElementById('tdeeEquation').textContent = equations.tdeeFormula;
    document.getElementById('tdeeResult').textContent = `${Math.round(equations.tdee)} kcal/dia`;
    
    if (equations.adjustmentFormula) {
        document.getElementById('adjustmentBox').style.display = 'block';
        document.getElementById('adjustmentEquation').textContent = equations.adjustmentFormula;
        document.getElementById('adjustmentResult').textContent = equations.adjustmentDescription;
    } else {
        document.getElementById('adjustmentBox').style.display = 'none';
    }

    // Calcular porcentagens
    const proteinCal = protein * 4;
    const carbCal = carbs * 4;
    const fatCal = fat * 9;
    const totalCal = proteinCal + carbCal + fatCal;

    const proteinPercent = Math.round((proteinCal / totalCal) * 100);
    const carbPercent = Math.round((carbCal / totalCal) * 100);
    const fatPercent = Math.round((fatCal / totalCal) * 100);

    // Atualizar DOM
    document.getElementById('totalCalories').textContent = calories;
    document.getElementById('proteinResult').textContent = protein + 'g';
    document.getElementById('proteinPercent').textContent = proteinPercent + '%';
    document.getElementById('carbResult').textContent = carbs + 'g';
    document.getElementById('carbPercent').textContent = carbPercent + '%';
    document.getElementById('fatResult').textContent = fat + 'g';
    document.getElementById('fatPercent').textContent = fatPercent + '%';

    // Calcular por refeição
    const caloriesPerMeal = Math.round(calories / meals);
    const proteinPerMeal = Math.round(protein / meals);
    const carbsPerMeal = Math.round(carbs / meals);
    const fatPerMeal = Math.round(fat / meals);

    // Criar cards de refeições
    const mealsGrid = document.getElementById('mealsGrid');
    mealsGrid.innerHTML = '';

    for (let i = 1; i <= meals; i++) {
        const mealCard = document.createElement('div');
        mealCard.className = 'meal-card';
        mealCard.innerHTML = `
            <h4>Refeição ${i}</h4>
            <p><strong>${caloriesPerMeal}</strong> kcal</p>
            <p>Proteína: <strong>${proteinPerMeal}g</strong></p>
            <p>Carboidratos: <strong>${carbsPerMeal}g</strong></p>
            <p>Gordura: <strong>${fatPerMeal}g</strong></p>
        `;
        mealsGrid.appendChild(mealCard);
    }

    // Exibir composição corporal se disponível
    const bodyCompSection = document.getElementById('bodyComposition');
    if (equations.leanMass > 0) {
        bodyCompSection.style.display = 'block';
        document.getElementById('leanMassResult').textContent = equations.leanMass.toFixed(1) + ' kg';
        document.getElementById('fatMassResult').textContent = equations.fatMass.toFixed(1) + ' kg';
        document.getElementById('bodyFatResult').textContent = equations.bodyFat.toFixed(1) + '%';
    } else {
        bodyCompSection.style.display = 'none';
    }
    
    // Exibir recomendações adicionais
    document.getElementById('waterIntake').textContent = equations.waterIntake + ' ml';
    document.getElementById('fiberIntake').textContent = equations.fiberIntake + ' g';
    
    // Taxa sugerida de perda/ganho
    let rateRecommendation = '';
    if (equations.goal === 'cut') {
        rateRecommendation = 'Sugestão: 0.5-1kg por semana (máximo 1% do peso corporal). Consulte um nutricionista para ajustes personalizados.';
    } else if (equations.goal === 'bulk') {
        rateRecommendation = 'Sugestão: 0.25-0.5kg por semana para minimizar acúmulo de gordura. Consulte um nutricionista para ajustes personalizados.';
    } else {
        rateRecommendation = 'Sugestão: Manter o peso estável, variando no máximo ±0.5kg. Consulte um nutricionista para acompanhamento.';
    }
    document.getElementById('rateRecommendation').textContent = rateRecommendation;
    
    // Adicionar dica específica para bulking
    const tipsList = document.getElementById('tipsList');
    const bulkingTip = tipsList.querySelector('.bulking-warning');
    if (bulkingTip) bulkingTip.remove();
    
    if (equations.goal === 'bulk') {
        const li = document.createElement('li');
        li.className = 'bulking-warning';
        li.innerHTML = '<strong>Atenção:</strong> Tenha em mente que quanto maior a meta de ganho semanal, mais comida você precisará comer e maiores serão as chances de acumular gordura desnecessariamente.';
        tipsList.appendChild(li);
    }
    
    // Exibir avisos
    const warningsContainer = document.getElementById('warningsContainer');
    if (equations.warnings.length > 0) {
        warningsContainer.style.display = 'block';
        const warningsList = document.getElementById('warningsList');
        warningsList.innerHTML = equations.warnings.map(w => `<li>${w}</li>`).join('');
    } else {
        warningsContainer.style.display = 'none';
    }
    
    // Guardar dados para exportar
    window.lastCalculation = {
        calories, protein, carbs, fat, meals, equations
    };
    
    // Mostrar seção de resultados
    document.getElementById('results').style.display = 'block';

    // Scroll suave para os resultados
    document.getElementById('results').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Função para exportar resultados
function exportResults(event) {
    if (!window.lastCalculation) return;
    
    const data = window.lastCalculation;
    const text = `
===============================================
  CALCULADORA DE MACROS - RESULTADOS
===============================================

DADOS CALCULADOS:
- Calorias Diarias: ${data.calories} kcal
- Proteinas: ${data.protein}g
- Carboidratos: ${data.carbs}g
- Gorduras: ${data.fat}g
- Numero de Refeicoes: ${data.meals}

POR REFEICAO:
- Calorias: ${Math.round(data.calories / data.meals)} kcal
- Proteinas: ${Math.round(data.protein / data.meals)}g
- Carboidratos: ${Math.round(data.carbs / data.meals)}g
- Gorduras: ${Math.round(data.fat / data.meals)}g

CALCULOS:
- Formula: ${data.equations.leanMass > 0 ? 'Katch-McArdle' : 'Mifflin-St Jeor'}
- TMB/BMR: ${Math.round(data.equations.bmr)} kcal/dia
- TDEE: ${Math.round(data.equations.tdee)} kcal/dia
${data.equations.adjustmentDescription ? '- Ajuste: ' + data.equations.adjustmentDescription : ''}

RECOMENDACOES:
- Hidratacao: ${data.equations.waterIntake} ml/dia
- Fibras: ${data.equations.fiberIntake}g/dia

${data.equations.warnings.length > 0 ? 'AVISOS:\n' + data.equations.warnings.join('\n') : ''}

Link para editar: ${window.location.href}

Data: ${new Date().toLocaleDateString('pt-BR')}
===============================================
    `.trim();
    
    const btn = event ? event.target : null;
    
    // Copiar para clipboard primeiro
    navigator.clipboard.writeText(text).then(() => {
        // Depois fazer download
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'meus-macros-' + new Date().toISOString().split('T')[0] + '.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        // Pequeno delay antes de revogar URL
        setTimeout(() => URL.revokeObjectURL(url), 100);
        
        // Feedback visual
        if (btn) {
            const originalText = btn.innerHTML;
            btn.innerHTML = '✅ Copiado e Exportado!';
            setTimeout(() => {
                btn.innerHTML = originalText;
            }, 2000);
        }
    }).catch(err => {
        console.error('Erro ao copiar:', err);
        // Se clipboard falhar, apenas faz download
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'meus-macros-' + new Date().toISOString().split('T')[0] + '.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 100);
        
        // Feedback
        if (btn) {
            const originalText = btn.innerHTML;
            btn.innerHTML = '✅ Arquivo Exportado!';
            setTimeout(() => {
                btn.innerHTML = originalText;
            }, 2000);
        }
    });
}

// Função para compartilhar no WhatsApp
function shareWhatsApp(event) {
    if (!window.lastCalculation) return;
    
    const data = window.lastCalculation;
    const text = `🏋️ *MEUS RESULTADOS - CIA DA SAÚDE* 🏋️

📊 *CALORIAS E MACROS DIÁRIOS*
• Calorias: *${data.calories} kcal*
• Proteínas: *${data.protein}g*
• Carboidratos: *${data.carbs}g*
• Gorduras: *${data.fat}g*

🍽️ *POR REFEIÇÃO* (${data.meals}x ao dia)
• Calorias: ${Math.round(data.calories / data.meals)} kcal
• Proteínas: ${Math.round(data.protein / data.meals)}g
• Carboidratos: ${Math.round(data.carbs / data.meals)}g
• Gorduras: ${Math.round(data.fat / data.meals)}g

💧 *HIDRATAÇÃO*
• ${data.equations.waterIntake} ml/dia

🌾 *FIBRAS*
• ${data.equations.fiberIntake}g/dia

🔗 *Editar meus dados:*
${window.location.href}

_Calculado em ${new Date().toLocaleDateString('pt-BR')}_
_Cia da Saúde Ilhota 🍃_`;

    const encodedText = encodeURIComponent(text);
    const whatsappURL = `https://api.whatsapp.com/send?text=${encodedText}`;
    
    // Abrir WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Feedback visual
    if (event) {
        const btn = event.target;
        const originalText = btn.innerHTML;
        btn.innerHTML = '✅ Abrindo WhatsApp!';
        setTimeout(() => {
            btn.innerHTML = originalText;
        }, 2000);
    }
}

// Atualizar URL com parâmetros
function updateURL(data) {
    const params = new URLSearchParams();
    
    // Adicionar apenas os campos essenciais na URL
    params.set('g', data.gender === 'male' ? 'm' : 'f');
    params.set('a', data.age);
    params.set('w', data.weight);
    params.set('h', data.height);
    params.set('al', data.activityLevel);
    params.set('goal', data.goal);
    params.set('meals', data.meals);
    
    if (data.knowBodyFat === 'yes' && data.bodyFat) {
        params.set('bf', data.bodyFat);
    }
    
    if (data.weightTraining === 'yes') {
        params.set('wt', data.trainingDays);
    }
    
    if (data.cardio === 'yes') {
        params.set('cd', data.cardioDays);
    }
    
    if (data.goal !== 'maintain') {
        params.set('def', data.deficit === 'custom' ? data.deficitCustom : data.deficit);
    }
    
    params.set('mm', data.macroMethod);
    
    if (data.macroMethod === 'grams') {
        params.set('p', data.protein === 'custom' ? data.proteinCustom : data.protein);
        params.set('f', data.fat === 'custom' ? data.fatCustom : data.fat);
    } else {
        params.set('pp', data.proteinPercent);
        params.set('fp', data.fatPercent);
        params.set('cp', data.carbPercent);
    }
    
    params.set('bmrf', data.bmrFormula);
    
    // Atualizar URL sem recarregar a página
    const newURL = window.location.pathname + '?' + params.toString();
    window.history.pushState({}, '', newURL);
}

// Carregar dados da URL
function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    
    // Se não tem parâmetros, tentar carregar do localStorage
    if (!params.has('g')) {
        const saved = localStorage.getItem('calculatorData');
        if (saved) {
            const data = JSON.parse(saved);
            fillForm(data);
        }
        return;
    }
    
    // Preencher formulário com dados da URL
    const data = {
        gender: params.get('g') === 'm' ? 'male' : 'female',
        age: params.get('a') || 30,
        weight: params.get('w') || 70,
        height: params.get('h') || 170,
        activityLevel: params.get('al') || 1.375,
        goal: params.get('goal') || 'maintain',
        meals: params.get('meals') || 4,
        knowBodyFat: params.has('bf') ? 'yes' : 'no',
        bodyFat: params.get('bf') || '',
        weightTraining: params.has('wt') ? 'yes' : 'no',
        trainingDays: params.get('wt') || 3,
        cardio: params.has('cd') ? 'yes' : 'no',
        cardioDays: params.get('cd') || 3,
        deficit: params.get('def') || '500',
        deficitCustom: '',
        macroMethod: params.get('mm') || 'grams',
        protein: params.get('p') || '1.8',
        proteinCustom: '',
        fat: params.get('f') || '1.0',
        fatCustom: '',
        proteinPercent: params.get('pp') || '30',
        fatPercent: params.get('fp') || '25',
        carbPercent: params.get('cp') || '45',
        bmrFormula: params.get('bmrf') || 'mifflin'
    };
    
    fillForm(data);
}

// Preencher formulário com dados
function fillForm(data) {
    // Gênero
    document.querySelector(`input[name="gender"][value="${data.gender}"]`).checked = true;
    
    // Dados básicos
    document.getElementById('age').value = data.age;
    document.getElementById('weight').value = data.weight;
    document.getElementById('height').value = data.height;
    
    // Body fat
    document.querySelector(`input[name="knowBodyFat"][value="${data.knowBodyFat}"]`).checked = true;
    document.getElementById('bodyFatGroup').style.display = data.knowBodyFat === 'yes' ? 'block' : 'none';
    if (data.knowBodyFat === 'yes' && data.bodyFat) {
        document.getElementById('bodyFat').value = data.bodyFat;
    }
    
    // Atividade
    document.getElementById('activityLevel').value = data.activityLevel;
    
    // Musculação
    document.querySelector(`input[name="weightTraining"][value="${data.weightTraining}"]`).checked = true;
    document.getElementById('weightTrainingFreq').style.display = data.weightTraining === 'yes' ? 'block' : 'none';
    if (data.weightTraining === 'yes') {
        document.getElementById('trainingDays').value = data.trainingDays;
    }
    
    // Cardio
    document.querySelector(`input[name="cardio"][value="${data.cardio}"]`).checked = true;
    document.getElementById('cardioFreq').style.display = data.cardio === 'yes' ? 'block' : 'none';
    if (data.cardio === 'yes') {
        document.getElementById('cardioDays').value = data.cardioDays;
    }
    
    // Objetivo
    document.querySelector(`input[name="goal"][value="${data.goal}"]`).checked = true;
    document.getElementById('deficitGroup').style.display = data.goal !== 'maintain' ? 'block' : 'none';
    if (data.goal !== 'maintain') {
        document.getElementById('deficit').value = data.deficit;
    }
    
    // Método de macros
    document.querySelector(`input[name="macroMethod"][value="${data.macroMethod}"]`).checked = true;
    if (data.macroMethod === 'grams') {
        document.getElementById('gramsMethod').style.display = 'block';
        document.getElementById('percentageMethod').style.display = 'none';
        document.getElementById('protein').value = data.protein;
        document.getElementById('fat').value = data.fat;
    } else {
        document.getElementById('gramsMethod').style.display = 'none';
        document.getElementById('percentageMethod').style.display = 'block';
        document.getElementById('proteinPercent').value = data.proteinPercent;
        document.getElementById('fatPercent').value = data.fatPercent;
        document.getElementById('carbPercent').value = data.carbPercent;
    }
    
    // Refeições
    document.getElementById('meals').value = data.meals;
    
    // Fórmula BMR
    if (data.bmrFormula) {
        document.querySelector(`input[name="bmrFormula"][value="${data.bmrFormula}"]`).checked = true;
    }
}

// Copiar link
function copyLink(event) {
    const url = window.location.href;
    const btn = event ? event.target : null;
    
    // Método 1: Tentar clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => {
            if (btn) {
                const originalText = btn.innerHTML;
                btn.innerHTML = '✅ Link Copiado!';
                btn.style.pointerEvents = 'none';
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.pointerEvents = '';
                }, 2000);
            }
        }).catch(err => {
            console.log('Clipboard API falhou, tentando método alternativo:', err);
            fallbackCopyLink(url, btn);
        });
    } else {
        // Método alternativo se clipboard API não disponível
        fallbackCopyLink(url, btn);
    }
}

// Método alternativo para copiar (funciona mesmo sem foco)
function fallbackCopyLink(url, btn) {
    const textArea = document.createElement('textarea');
    textArea.value = url;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (btn) {
            const originalText = btn.innerHTML;
            if (successful) {
                btn.innerHTML = '✅ Link Copiado!';
                btn.style.pointerEvents = 'none';
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.pointerEvents = '';
                }, 2000);
            } else {
                btn.innerHTML = '❌ Erro ao copiar';
                setTimeout(() => {
                    btn.innerHTML = originalText;
                }, 2000);
            }
        }
    } catch (err) {
        console.error('Erro ao copiar:', err);
        if (btn) {
            const originalText = btn.innerHTML;
            btn.innerHTML = '❌ Erro ao copiar';
            setTimeout(() => {
                btn.innerHTML = originalText;
            }, 2000);
        }
    } finally {
        document.body.removeChild(textArea);
    }
}
