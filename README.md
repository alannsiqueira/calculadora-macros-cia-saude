# 🧮 Calculadora de Macros e TMB

Uma calculadora completa de macronutrientes, calorias e composição corporal desenvolvida para auxiliar no planejamento nutricional de forma profissional e precisa.

## 📋 Funcionalidades Implementadas

### ✅ Cálculos Base
- **TMB (Taxa Metabólica Basal)** usando duas fórmulas:
  - **Mifflin-St Jeor**: Padrão para quando não há dados de composição corporal
  - **Katch-McArdle**: Mais precisa quando o percentual de gordura é conhecido
- **TDEE (Gasto Energético Total Diário)** com multiplicadores de atividade física
- Ajustes personalizados para treino de musculação (30 kcal/dia por sessão)
- Ajustes personalizados para cardio (70 kcal/dia por sessão)

### 🎯 Objetivos Nutricionais
- **Cutting (Perda de Gordura)**: Déficit calórico personalizável (150/250/500/custom kcal)
- **Bulking (Ganho de Massa)**: Superávit calórico personalizável (150/250/500/custom kcal)
- **Manutenção**: Manter peso corporal estável

### 🥗 Distribuição de Macronutrientes
Dois métodos disponíveis:

**1. Gramas por kg de peso corporal**
- Proteína: 1.6g/kg, 1.8g/kg, 2.0g/kg, 2.2g/kg ou customizado
- Gordura: 0.8g/kg, 1.0g/kg, 1.2g/kg ou customizado
- Carboidratos: Calculado automaticamente com calorias restantes

**2. Porcentagem de calorias**
- Distribuição livre entre proteínas, carboidratos e gorduras
- Validação de soma = 100%

### 📊 Análise de Composição Corporal
- Massa magra (kg)
- Massa gorda (kg)
- Percentual de gordura corporal
- Visualização apenas quando percentual de gordura é informado

### ⚠️ Validações Nutricionais Inteligentes
- Alerta se proteína < 1.8g/kg em cutting (preservação muscular)
- Alerta se gordura < 0.5g/kg (saúde hormonal)
- Alerta se déficit > 25% do TDEE (muito agressivo)
- Alerta se superávit > 15% do TDEE (ganho excessivo de gordura)

### 💡 Recomendações Profissionais
- **Hidratação**: 35ml por kg de peso corporal
- **Fibras**: 14g por 1000 kcal consumidas
- **Taxa saudável de perda/ganho**:
  - Cutting: 0.5-1kg/semana (máx 1% do peso)
  - Bulking: 0.25-0.5kg/semana
  - Manutenção: ±0.5kg de variação

### 🍽️ Distribuição por Refeições
- Divisão automática dos macros entre 3-6 refeições diárias
- Cards visuais com calorias e macros por refeição

### 🔗 Persistência e Compartilhamento
- **URL Parametrizada**: Compartilhe cálculos via link
- **LocalStorage**: Auto-save dos dados do formulário
- **Copiar Link**: Botão para copiar URL atual
- **Exportar TXT**: Download de arquivo com todos os dados e link

### 🎨 Interface
- Design moderno com gradiente roxo/azul
- Campos condicionais (aparecem/somem conforme seleção)
- Scroll suave até resultados
- Feedback visual em ações (ex: "Link Copiado!")
- Responsivo e clean

### 📐 Transparência nos Cálculos
- Exibição das equações utilizadas
- Fórmula do TMB/BMR com valores substituídos
- Fórmula do TDEE com multiplicadores
- Descrição dos ajustes aplicados

## 🚀 Como Usar

### 1. Dados Básicos
- Selecione seu **gênero** (Masculino/Feminino)
- Informe **idade**, **peso** e **altura**

### 2. Composição Corporal (Opcional)
- Se souber seu **percentual de gordura**, informe para cálculos mais precisos
- Isso habilitará a fórmula Katch-McArdle e análise de composição

### 3. Nível de Atividade
- Escolha seu nível base de atividade física diária:
  - **Sedentário**: Pouco ou nenhum exercício
  - **Levemente ativo**: Exercício leve 1-3 dias/semana
  - **Moderadamente ativo**: Exercício moderado 3-5 dias/semana
  - **Muito ativo**: Exercício intenso 6-7 dias/semana
  - **Extremamente ativo**: Exercício muito intenso, trabalho físico

### 4. Treinos
- Informe se faz **musculação** e a frequência semanal (1-7 dias)
- Informe se faz **cardio** e a frequência semanal (1-7 dias)

### 5. Objetivo
- Escolha entre **Cutting** (perder gordura), **Bulking** (ganhar massa) ou **Manter peso**
- Para cutting/bulking, defina o déficit/superávit desejado

### 6. Distribuição de Macros
- Escolha o método de cálculo (gramas/kg ou porcentagens)
- Ajuste conforme suas preferências ou recomendação do nutricionista

### 7. Refeições
- Informe quantas refeições faz por dia (3-6)

### 8. Calcular
- Clique em **"Calcular Macros"**
- Veja todos os resultados, equações, avisos e recomendações
- **Exporte** o resultado para arquivo TXT
- **Copie o link** para salvar ou compartilhar

### 9. Compartilhar/Editar
- O link na URL contém todos os dados do cálculo
- Cole o link em outro navegador para ver/editar os mesmos dados
- Dados também são salvos automaticamente no navegador

## 🛣️ Roadmap de Melhorias

### 🎯 Curto Prazo
- [ ] **Gráfico de macros** (pizza/barras) usando Chart.js ou D3.js
- [ ] **Modo escuro** com toggle
- [ ] **Impressão otimizada** dos resultados (CSS @media print)
- [ ] **Histórico de cálculos** salvos localmente
- [ ] **Comparador**: visualizar múltiplos cenários lado a lado
- [ ] **Calculadora reversa**: "Tenho X kcal, distribua os macros"

### 🔧 Médio Prazo
- [ ] **Integração com APIs de alimentos** (TACO, USDA)
- [ ] **Sugestão de alimentos** para atingir macros
- [ ] **Plano de refeições** automático baseado nos macros
- [ ] **Ajuste semanal progressivo**: reduzir/aumentar calorias gradualmente
- [ ] **Calculadora de cutting/bulking periódico**: ciclos de 4-12 semanas
- [ ] **Meta de peso**: estimar tempo para atingir objetivo
- [ ] **Rastreamento de progresso**: gráficos de evolução de peso/medidas
- [ ] **PWA (Progressive Web App)**: funcionar offline, instalar no celular

### 🚀 Longo Prazo
- [ ] **Conta de usuário**: salvar dados na nuvem
- [ ] **Integração com balança inteligente**: atualizar peso automaticamente
- [ ] **Integração com apps de treino**: sincronizar TDEE real
- [ ] **IA para ajuste automático**: sugerir mudanças baseado em progresso
- [ ] **Versão mobile nativa** (React Native / Flutter)
- [ ] **Comunidade**: compartilhar planos e resultados
- [ ] **Consultoria integrada**: conectar com nutricionistas
- [ ] **Análise de micronutrientes**: vitaminas e minerais

### 🧪 Recursos Avançados
- [ ] **Suporte a dietas específicas**:
  - Cetogênica (low-carb)
  - Vegetariana/Vegana
  - Paleo
  - Jejum intermitente (janelas alimentares)
- [ ] **Calculadora de suplementos**: whey, creatina, cafeína
- [ ] **Refeição livre (cheat meal)**: calcular impacto semanal
- [ ] **Ajuste por termogênese**: NEAT, TEF
- [ ] **Calculadora de bioimpedância**: interpretar dados de balança
- [ ] **Cronômetro de refeições**: alarmes para horários programados
- [ ] **Scanner de rótulos**: câmera para ler tabelas nutricionais

### 📱 UX/UI
- [ ] **Onboarding interativo**: tutorial na primeira visita
- [ ] **Dicas contextuais**: tooltips explicando cada campo
- [ ] **Animações suaves**: transições entre seções
- [ ] **Acessibilidade**: WCAG 2.1 AA compliance
- [ ] **Multi-idioma**: português, inglês, espanhol
- [ ] **Temas personalizáveis**: cores e estilos

### 🔒 Técnicos
- [ ] **Testes automatizados**: Jest, Cypress
- [ ] **CI/CD**: Deploy automático
- [ ] **Monitoramento**: Analytics, Sentry
- [ ] **SEO otimizado**: meta tags, schema.org
- [ ] **Performance**: lazy loading, code splitting
- [ ] **Backend opcional**: API REST ou GraphQL

## 🧰 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Gradientes, Flexbox, Grid
- **JavaScript (ES6+)**: Vanilla JS puro
- **Web APIs**: 
  - LocalStorage
  - URLSearchParams
  - Clipboard API
  - Blob API
  - History API

## 📊 Fórmulas Utilizadas

### Mifflin-St Jeor (sem % gordura)
```
Homens: TMB = (10 × peso) + (6.25 × altura) - (5 × idade) + 5
Mulheres: TMB = (10 × peso) + (6.25 × altura) - (5 × idade) - 161
```

### Katch-McArdle (com % gordura)
```
TMB = 370 + (21.6 × massa magra em kg)
Massa magra = peso × (1 - % gordura/100)
```

### TDEE
```
TDEE = TMB × multiplicador de atividade + ajustes de treino
```

### Multiplicadores de Atividade
- Sedentário: 1.2
- Levemente ativo: 1.375
- Moderadamente ativo: 1.55
- Muito ativo: 1.725
- Extremamente ativo: 1.9

### Ajustes de Treino
- Musculação: +30 kcal por sessão
- Cardio: +70 kcal por sessão

## 📝 Notas Importantes

⚠️ **Esta calculadora é uma ferramenta educacional e de planejamento**. Consulte sempre um nutricionista ou médico antes de fazer mudanças significativas na dieta.

💡 **Os valores são estimativas**. O metabolismo varia entre indivíduos. Ajuste as calorias baseado nos resultados reais ao longo das semanas.

🎯 **Seja consistente**. Mudanças na composição corporal levam tempo. Dê pelo menos 2-4 semanas antes de fazer ajustes.

## 📄 Licença

Este projeto é de código aberto e pode ser usado livremente para fins educacionais e pessoais.

---

**Desenvolvido com ❤️ para auxiliar no seu objetivo fitness**
